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

    const { broker_id, process_queue } = await req.json();

    if (broker_id) {
      // Generate HTML for specific broker
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

  // Fetch broker data with properties count
  const { data: broker, error: brokerError } = await supabaseClient
    .from('profiles')
    .select(`
      id,
      full_name,
      company_name,
      city,
      bio,
      avatar_url,
      rating,
      areas,
      member_since,
      vanity_url
    `)
    .eq('id', brokerId)
    .single();

  if (brokerError) throw brokerError;
  if (!broker) throw new Error('Broker not found');

  // Get properties count
  const { count: propertiesCount } = await supabaseClient
    .from('properties')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', brokerId)
    .gt('publish', 0);

  const brokerData: BrokerData = {
    ...broker,
    properties_count: propertiesCount || 0
  };

  // Read template
  const templatePath = './templates/broker-profile.ejs';
  let template: string;
  
  try {
    template = await Deno.readTextFile(templatePath);
  } catch (error) {
    console.error('Error reading template:', error);
    throw new Error('Template file not found');
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
