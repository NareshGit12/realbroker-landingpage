const { createClient } = require('@supabase/supabase-js');
const ejs = require('ejs');
const fs = require('fs').promises;
const path = require('path');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_ANON_KEY environment variables');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function generateSlug(name, company) {
  const nameSlug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const companySlug = company ? company.toLowerCase().replace(/[^a-z0-9]+/g, '-') : '';
  return companySlug ? `${nameSlug}_${companySlug}` : nameSlug;
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

  // Generate filename
  const slug = generateSlug(broker.full_name, broker.company_name);
  const filename = `${broker.vanity_url}_${slug}.html`;
  const filePath = path.join(process.cwd(), 'public', filename);

  // Save HTML file
  await fs.writeFile(filePath, html, 'utf8');

  // Update broker profile with static URL
  const staticUrl = `/${filename}`;
  await supabase
    .from('profiles')
    .update({ static_html_url: staticUrl })
    .eq('id', broker.id);

  console.log(`✓ Generated ${filename}`);
  
  return filename;
}

async function main() {
  try {
    console.log('Starting HTML generation...');

    // Fetch all brokers that need HTML generation
    const { data: brokers, error } = await supabase
      .from('profiles')
      .select('id, full_name, company_name, city, bio, avatar_url, rating, areas, member_since, vanity_url')
      .eq('role', 'user')
      .not('full_name', 'is', null)
      .not('vanity_url', 'is', null);

    if (error) throw error;

    if (!brokers || brokers.length === 0) {
      console.log('No brokers found to generate HTML for.');
      return;
    }

    console.log(`Found ${brokers.length} brokers to process`);

    // Read EJS template
    const templatePath = path.join(process.cwd(), 'templates', 'broker-profile.ejs');
    const template = await fs.readFile(templatePath, 'utf8');

    // Generate HTML for each broker
    const results = [];
    for (const broker of brokers) {
      try {
        const filename = await generateBrokerHTML(broker, template);
        results.push({ broker: broker.full_name, success: true, filename });
      } catch (error) {
        console.error(`Error generating HTML for ${broker.full_name}:`, error.message);
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
