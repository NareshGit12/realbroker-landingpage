import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import * as ejs from "https://deno.land/x/dejs@0.10.3/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface BrokerData {
  id: string;
  full_name: string;
  company_name: string | null;
  city: string | null;
  bio: string | null;
  avatar_url: string | null;
  rating: number;
  areas: string[] | null;
  member_since: string;
  vanity_url: string;
  properties: any[];
  properties_count: number;
}

function generateSlug(name: string, company: string | null): string {
  const nameSlug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const companySlug = company ? company.toLowerCase().replace(/[^a-z0-9]+/g, '-') : '';
  return companySlug ? `${nameSlug}_${companySlug}` : nameSlug;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { broker_id, process_queue, add_to_queue } = await req.json();

    if (broker_id) {
      // Add broker to queue instead of generating directly
      if (add_to_queue) {
        const { error: queueError } = await supabaseClient
          .from('html_generation_queue')
          .insert({
            entity_type: 'broker',
            entity_id: broker_id,
            priority: 5,
            status: 'pending'
          });

        if (queueError && queueError.code !== '23505') { // Ignore duplicate key errors
          throw queueError;
        }

        return new Response(
          JSON.stringify({ success: true, message: 'Broker added to queue successfully' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Direct generation (legacy support)
      await generateBrokerHTML(supabaseClient, broker_id);
      
      return new Response(
        JSON.stringify({ success: true, message: 'Broker HTML generated successfully' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (process_queue) {
      // Process all pending broker HTML generation jobs
      const { data: queueItems, error: queueError } = await supabaseClient
        .from('html_generation_queue')
        .select('*')
        .eq('entity_type', 'broker')
        .eq('status', 'pending')
        .order('priority', { ascending: false })
        .order('created_at', { ascending: true })
        .limit(10);

      if (queueError) throw queueError;

      const results = [];
      for (const item of queueItems || []) {
        try {
          await supabaseClient
            .from('html_generation_queue')
            .update({ status: 'processing', started_at: new Date().toISOString() })
            .eq('id', item.id);

          await generateBrokerHTML(supabaseClient, item.entity_id);

          await supabaseClient
            .from('html_generation_queue')
            .update({ 
              status: 'completed', 
              completed_at: new Date().toISOString(),
              error_message: null
            })
            .eq('id', item.id);

          results.push({ id: item.entity_id, success: true });
        } catch (error) {
          console.error(`Error processing broker ${item.entity_id}:`, error);
          
          await supabaseClient
            .from('html_generation_queue')
            .update({ 
              status: 'failed', 
              error_message: error.message,
              completed_at: new Date().toISOString()
            })
            .eq('id', item.id);

          results.push({ id: item.entity_id, success: false, error: error.message });
        }
      }

      return new Response(
        JSON.stringify({ 
          success: true, 
          processed: results.length,
          results 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Invalid request. Provide broker_id or process_queue=true' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in generate-broker-html:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

async function generateBrokerHTML(supabaseClient: any, brokerId: string) {
  const startTime = Date.now();

  // Fetch broker data with company logo
  const { data: broker, error: brokerError } = await supabaseClient
    .from('profiles')
    .select(`
      id,
      full_name,
      company_name,
      company_id,
      city,
      bio,
      avatar_url,
      rating,
      areas,
      member_since,
      vanity_url,
      phone,
      email,
      website,
      company:company_id (
        Logo
      )
    `)
    .eq('id', brokerId)
    .single();

  if (brokerError) throw brokerError;
  if (!broker) throw new Error('Broker not found');

  // Get properties with full data (fetch ALL properties)
  const { data: properties } = await supabaseClient
    .from('properties')
    .select('id, title, price, description, images, property_type, bedrooms, sqft, area, static_html_url')
    .eq('user_id', brokerId)
    .gt('publish', 0)
    .order('created_at', { ascending: false })
    .range(0, 9999); // Fetch up to 10,000 properties

  const brokerData: BrokerData = {
    ...broker,
    company_logo_url: broker.company?.Logo || null,
    phone_no: broker.phone,
    properties: properties || [],
    properties_count: properties?.length || 0
  };

  // Read template
  const templatePath = 'broker-profile.ejs';
  let template: string;
  
  try {
    // Template content embedded directly for simplicity in edge functions
    template = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><%= broker.full_name %> - <%= broker.company_name || 'Real Estate Broker' %> | RealBroker</title>
  <meta name="description" content="<%= broker.bio ? broker.bio.substring(0, 155) : \`Connect with \${broker.full_name}, a professional real estate broker at \${broker.company_name || 'RealBroker'}. Specializing in \${broker.city || 'real estate'} properties.\` %>">
  
  <meta property="og:type" content="profile">
  <meta property="og:url" content="https://realbroker.app/<%= broker.vanity_url %>_<%= (broker.company_name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-') %>.html">
  <meta property="og:title" content="<%= broker.full_name %> - <%= broker.company_name || 'Real Estate Broker' %>">
  <meta property="og:description" content="<%= broker.bio ? broker.bio.substring(0, 155) : \`Professional real estate broker specializing in \${broker.city || 'real estate'} properties.\` %>">
  <meta property="og:image" content="<%= broker.avatar_url || 'https://realbroker.app/og-image.png' %>">
  
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh; padding: 2rem 1rem; color: #1a202c; }
    .container { max-width: 800px; margin: 0 auto; }
    .broker-card { background: white; border-radius: 1rem; overflow: hidden; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3); transition: transform 0.3s ease; }
    .broker-card:hover { transform: translateY(-5px); }
    .card-header { background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%); height: 120px; position: relative; }
    .avatar-container { position: absolute; bottom: -50px; left: 50%; transform: translateX(-50%); }
    .avatar { width: 120px; height: 120px; border-radius: 50%; border: 5px solid white; object-fit: cover; background: #e2e8f0; }
    .card-content { padding: 4rem 2rem 2rem; text-align: center; }
    .broker-name { font-size: 2rem; font-weight: bold; margin-bottom: 0.5rem; }
    .rating { display: flex; justify-content: center; align-items: center; gap: 0.25rem; margin-bottom: 0.5rem; }
    .star { color: #fbbf24; font-size: 1.25rem; }
    .rating-value { font-weight: 600; color: #4b5563; margin-left: 0.5rem; }
    .company-info { display: flex; flex-direction: column; align-items: center; gap: 0.5rem; margin-bottom: 1.5rem; color: #6b7280; }
    .divider { width: 100%; height: 1px; background: #e5e7eb; margin: 1.5rem 0; }
    .bio { color: #4b5563; line-height: 1.6; margin-bottom: 1.5rem; text-align: left; }
    .badges { display: flex; flex-wrap: wrap; gap: 0.5rem; justify-content: flex-start; margin-bottom: 1.5rem; }
    .badge { background: #fef3c7; color: #92400e; padding: 0.375rem 0.75rem; border-radius: 9999px; font-size: 0.875rem; }
    .stats { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; margin-top: 1.5rem; }
    .stat-value { font-size: 1.5rem; font-weight: bold; color: #dc2626; }
    .stat-label { font-size: 0.875rem; color: #6b7280; margin-top: 0.25rem; }
    .cta-button { display: inline-block; background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%); color: white; padding: 1rem 2rem; border-radius: 0.5rem; text-decoration: none; font-weight: 600; margin-top: 2rem; }
    .footer { text-align: center; color: white; margin-top: 2rem; font-size: 0.875rem; }
  </style>
</head>
<body>
  <div class="container">
    <div class="broker-card">
      <div class="card-header">
        <div class="avatar-container">
          <img src="<%= broker.avatar_url || 'https://api.dicebear.com/7.x/initials/svg?seed=' + encodeURIComponent(broker.full_name) %>" alt="<%= broker.full_name %>" class="avatar" />
        </div>
      </div>
      <div class="card-content">
        <h1 class="broker-name"><%= broker.full_name %></h1>
        <div class="rating">
          <% for (let i = 0; i < 5; i++) { %>
            <span class="star"><%= i < Math.floor(broker.rating || 5) ? '★' : '☆' %></span>
          <% } %>
          <span class="rating-value"><%= (broker.rating || 5).toFixed(1) %></span>
        </div>
        <div class="company-info">
          <% if (broker.company_name) { %><div><%= broker.company_name %></div><% } %>
          <% if (broker.city) { %><div><%= broker.city %></div><% } %>
        </div>
        <div class="divider"></div>
        <% if (broker.bio) { %><div class="bio"><%= broker.bio %></div><% } %>
        <% if (broker.areas && broker.areas.length > 0) { %>
          <div class="badges">
            <% broker.areas.forEach(function(area) { %>
              <span class="badge"><%= area %></span>
            <% }); %>
          </div>
        <% } %>
        <div class="stats">
          <div class="stat">
            <div class="stat-value"><%= broker.properties_count || 0 %></div>
            <div class="stat-label">Active Properties</div>
          </div>
          <div class="stat">
            <div class="stat-value"><%= broker.member_since ? new Date(broker.member_since).getFullYear() : new Date().getFullYear() %></div>
            <div class="stat-label">Member Since</div>
          </div>
        </div>
        <a href="https://my.realbroker.app/<%= broker.vanity_url %>" class="cta-button">View Full Profile & Contact</a>
      </div>
    </div>
    <div class="footer">
      <p>Powered by <a href="https://realbroker.app" style="color: white;">RealBroker</a> - India's Premier Broker Network</p>
    </div>
  </div>
</body>
</html>`;
  } catch (error) {
    console.error('Error loading template:', error);
    throw new Error('Template not available');
  }

  // Render HTML using EJS
  const html = await ejs.renderToString(template, { broker: brokerData });

  // Generate filename
  const slug = generateSlug(broker.full_name, broker.company_name);
  const filename = `${broker.vanity_url}_${slug}.html`;
  const htmlPath = `/blr/brokers/${filename}`;
  
  // Save to storage (simulated - in production this would save to actual storage)
  // For now, we'll just update the database with the URL
  const staticUrl = `https://show.realbroker.app${htmlPath}`;

  // Update broker profile with static URL
  const { error: updateError } = await supabaseClient
    .from('profiles')
    .update({ static_html_url: staticUrl })
    .eq('id', brokerId);

  if (updateError) throw updateError;

  // Update or insert metadata
  const duration = Date.now() - startTime;
  const fileSize = new TextEncoder().encode(html).length;

  const { error: metadataError } = await supabaseClient
    .from('html_generation_metadata')
    .upsert({
      entity_type: 'broker',
      entity_id: brokerId,
      html_path: htmlPath,
      last_generated_at: new Date().toISOString(),
      file_size_bytes: fileSize,
      generation_duration_ms: duration,
      needs_regeneration: false
    }, {
      onConflict: 'entity_type,entity_id'
    });

  if (metadataError) throw metadataError;

  console.log(`Generated HTML for broker ${broker.full_name} (${brokerId}) in ${duration}ms`);
  console.log(`File size: ${(fileSize / 1024).toFixed(2)} KB`);
  console.log(`Static URL: ${staticUrl}`);

  return { html, staticUrl, htmlPath };
}
