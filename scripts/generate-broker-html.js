import { createClient } from '@supabase/supabase-js';
import ejs from 'ejs';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_ANON_KEY environment variables');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function generateSlug(name, company) {
  const nameSlug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  const companySlug = company ? company.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') : '';
  return companySlug ? `${nameSlug}-${companySlug}` : nameSlug;
}

async function generateBrokerHTML(broker, template) {
  console.log(`Generating HTML for ${broker.full_name}...`);

  // Get properties count
  const { count: propertiesCount } = await supabase
    .from('properties')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', broker.id)
    .gt('publish', 0);

  const brokerData = {
    ...broker,
    properties_count: propertiesCount || 0
  };

  // Render HTML
  const html = await ejs.render(template, { broker: brokerData });

  // Generate filename and directory structure
  const slug = generateSlug(broker.full_name, broker.company_name);
  const citySlug = broker.city ? broker.city.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') : 'other';
  const filename = `${slug}.html`;
  
  // Create city directory if it doesn't exist
  const cityDir = path.join(process.cwd(), 'public', citySlug);
  await fs.mkdir(cityDir, { recursive: true });
  
  const filePath = path.join(cityDir, filename);

  // Save HTML file
  await fs.writeFile(filePath, html, 'utf8');

  // Update broker profile with static URL
  const staticUrl = `/${citySlug}/${filename}`;
  await supabase
    .from('profiles')
    .update({ static_html_url: staticUrl })
    .eq('id', broker.id);

  console.log(`✓ Generated ${filename}`);
  
  return filename;
}

async function main() {
  try {
    console.log('Starting HTML generation from queue...');

    // Fetch pending queue items for brokers
    const { data: queueItems, error: queueError } = await supabase
      .from('html_generation_queue')
      .select('id, entity_id, entity_type, status')
      .eq('entity_type', 'broker')
      .eq('status', 'pending')
      .order('priority', { ascending: false })
      .order('created_at', { ascending: true });

    if (queueError) {
      console.error('Error fetching queue:', queueError);
      throw queueError;
    }

    console.log('Queue query result:', JSON.stringify(queueItems, null, 2));

    if (!queueItems || queueItems.length === 0) {
      console.log('No pending brokers in queue.');
      return;
    }

    console.log(`Found ${queueItems.length} brokers in queue to process`);

    // Fetch broker profiles for queued items
    const brokerIds = queueItems.map(item => item.entity_id);
    console.log('Looking for broker IDs:', brokerIds);
    
    const { data: brokers, error } = await supabase
      .from('profiles')
      .select('id, full_name, company_name, city, bio, avatar_url, rating, areas, member_since, vanity_url')
      .in('id', brokerIds)
      .eq('role', 'user')
      .not('full_name', 'is', null)
      .not('vanity_url', 'is', null);

    if (error) {
      console.error('Error fetching brokers:', error);
      throw error;
    }

    console.log(`Found ${brokers?.length || 0} brokers matching queue items`);
    console.log('Broker data:', JSON.stringify(brokers, null, 2));

    if (!brokers || brokers.length === 0) {
      console.log('No brokers found to generate HTML for.');
      return;
    }

    console.log(`Found ${brokers.length} brokers to process`);

    // Read EJS template
    const templatePath = path.join(path.dirname(__dirname), 'templates', 'broker-profile.ejs');
    const template = await fs.readFile(templatePath, 'utf8');

    // Generate HTML for each broker
    const results = [];
    for (const broker of brokers) {
      const queueItem = queueItems.find(item => item.entity_id === broker.id);
      
      try {
        // Update queue status to processing
        await supabase
          .from('html_generation_queue')
          .update({ status: 'processing', started_at: new Date().toISOString() })
          .eq('id', queueItem.id);

        const filename = await generateBrokerHTML(broker, template);
        
        // Mark as completed in queue
        await supabase
          .from('html_generation_queue')
          .update({ 
            status: 'completed', 
            completed_at: new Date().toISOString() 
          })
          .eq('id', queueItem.id);

        results.push({ broker: broker.full_name, success: true, filename });
      } catch (error) {
        console.error(`Error generating HTML for ${broker.full_name}:`, error.message);
        
        // Mark as failed in queue
        await supabase
          .from('html_generation_queue')
          .update({ 
            status: 'failed', 
            error_message: error.message,
            completed_at: new Date().toISOString()
          })
          .eq('id', queueItem.id);

        results.push({ broker: broker.full_name, success: false, error: error.message });
      }
    }

    // Summary
    const successful = results.filter(r => r.success).length;
    const failed = results.filter(r => !r.success).length;
    
    console.log('\n=== Generation Summary ===');
    console.log(`Total: ${results.length}`);
    console.log(`Successful: ${successful}`);
    console.log(`Failed: ${failed}`);
    
    if (failed > 0) {
      console.log('\nFailed brokers:');
      results.filter(r => !r.success).forEach(r => {
        console.log(`- ${r.broker}: ${r.error}`);
      });
      process.exit(1);
    }

  } catch (error) {
    console.error('Fatal error:', error);
    process.exit(1);
  }
}

main();
