// Builds the static, search-engine friendly member pages on realbroker.network:
//   public/<city>/<name>-<company>.html   one profile page per member (templates/broker-profile.ejs)
//   public/<city>/index.html              a plain-HTML directory of every member in that city (templates/members-index.ejs)
//
// Default: regenerates the members waiting in html_generation_queue, plus the directory pages.
// REGENERATE_ALL=1: regenerates every member (use after a template change).
// Run by .github/workflows/generate-static-html.yml (weekly, or by hand with "regenerate all").

import { createClient } from '@supabase/supabase-js';
import ejs from 'ejs';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.dirname(__dirname);
const SITE_URL = 'https://realbroker.network';
const APP_URL = 'https://new.realbroker.app';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY;
const REGENERATE_ALL = /^(1|true|yes)$/i.test(process.env.REGENERATE_ALL || '');

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_ANON_KEY environment variables');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const slugify = (s) => (s || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const generateSlug = (name, company) => [slugify(name), slugify(company)].filter(Boolean).join('-');
const citySlugOf = (city) => slugify(city) || 'other';
const norm = (s) => (s || '').toLowerCase().replace(/\s+/g, ' ').trim();

const BROKER_COLUMNS = `
  id, full_name, company_name, company_id, city, bio, avatar_url, cover_image, rating, areas,
  member_since, vanity_url, role, phone, email, website,
  company:company_id ( Logo )
`;

function pagePath(broker) {
  const citySlug = citySlugOf(broker.city);
  const filename = `${generateSlug(broker.full_name, broker.company_name)}.html`;
  return { citySlug, filename, url: `/${citySlug}/${filename}` };
}

function summary(b) {
  const { url } = pagePath(b);
  return {
    id: b.id,
    name: b.full_name.trim(),
    company: (b.company_name || '').trim() || 'Independent broker',
    areas: (b.areas || []).filter(Boolean),
    avatar: b.avatar_url && b.avatar_url.startsWith('http') ? b.avatar_url : null,
    cover: b.cover_image && b.cover_image.startsWith('http') ? b.cover_image : null,
    url,
  };
}

/** Up to 3 other members who share an area with this broker, for internal links. */
function nearbyFor(broker, everyone) {
  const mine = new Set((broker.areas || []).map(norm));
  if (!mine.size) return [];
  return everyone
    .filter((o) => o.id !== broker.id && (o.areas || []).some((a) => mine.has(norm(a))))
    .slice(0, 3)
    .map((o) => {
      const s = summary(o);
      const shared = (o.areas || []).find((a) => mine.has(norm(a)));
      return { ...s, area: shared };
    });
}

async function generateBrokerHTML(broker, template, everyone) {
  // Public page: hide network-only and closed listings.
  const { data: properties, error } = await supabase
    .from('properties')
    .select('id, title, price, images, property_type, bedrooms, baths, sqft, area, status, visibility, static_html_url, created_at')
    .eq('user_id', broker.id)
    .order('created_at', { ascending: false })
    .range(0, 999);
  if (error) throw error;

  const visible = (properties || []).filter((p) =>
    p.visibility !== 'Network Only' && !['Sold', 'Rented', 'Delisted'].includes(p.status || ''));

  const { citySlug, filename, url } = pagePath(broker);
  const data = {
    ...broker,
    company_logo_url: broker.company?.Logo || null,
    phone_no: broker.phone,
    properties: visible,
    properties_count: visible.length,
    page_url: `${SITE_URL}${url}`,
    city_url: `/${citySlug}/`,
    nearby: nearbyFor(broker, everyone),
    app_url: APP_URL,
    site_url: SITE_URL,
  };

  const html = await ejs.render(template, { broker: data }, { async: true });
  const dir = path.join(ROOT, 'public', citySlug);
  await fs.mkdir(dir, { recursive: true });
  const filePath = path.join(dir, filename);
  await fs.writeFile(filePath, html, 'utf8');

  // Keep the link on the profile in sync (needs the service-role key in CI).
  await supabase.from('profiles').update({ static_html_url: url }).eq('id', broker.id);

  const stats = await fs.stat(filePath);
  return { url, size: stats.size };
}

async function writeDirectories(everyone) {
  const template = await fs.readFile(path.join(ROOT, 'templates', 'members-index.ejs'), 'utf8');
  const byCity = new Map();
  for (const b of everyone) {
    const slug = citySlugOf(b.city);
    if (!byCity.has(slug)) byCity.set(slug, { city: (b.city || 'Other').trim(), members: [] });
    byCity.get(slug).members.push(summary(b));
  }
  for (const [slug, { city, members }] of byCity) {
    members.sort((a, b) => a.name.localeCompare(b.name));
    const html = await ejs.render(template, { city, members, page_url: `${SITE_URL}/${slug}/`, site_url: SITE_URL, app_url: APP_URL }, { async: true });
    await fs.mkdir(path.join(ROOT, 'public', slug), { recursive: true });
    await fs.writeFile(path.join(ROOT, 'public', slug, 'index.html'), html, 'utf8');
    console.log(`✓ Directory /${slug}/ (${members.length} members)`);
  }
}

async function main() {
  // Every member, for "brokers in the same areas" links and the directory pages.
  const { data: all, error: allErr } = await supabase
    .from('profiles')
    .select(BROKER_COLUMNS)
    .or('role.ilike.%user%,role.ilike.%admin%,role.ilike.%ops%')
    .not('full_name', 'is', null)
    .order('member_since', { ascending: true, nullsFirst: false });
  if (allErr) throw allErr;
  // Test accounts ("test" in the name or company) never get a public page.
  const isTest = (b) => /\b(test\d*|do not use|not ?valid|guest)\b/i.test(`${b.full_name || ''} ${b.company_name || ''}`);
  const everyone = (all || []).filter((b) => b.full_name && b.full_name.trim() && !isTest(b));
  console.log(`Members: ${everyone.length}`);

  let targets = [];
  let queueItems = [];
  if (REGENERATE_ALL) {
    targets = everyone;
    console.log('REGENERATE_ALL: regenerating every member page');
  } else {
    const { data, error } = await supabase
      .from('html_generation_queue')
      .select('id, entity_id')
      .eq('entity_type', 'broker')
      .eq('status', 'pending')
      .order('priority', { ascending: false })
      .order('created_at', { ascending: true });
    if (error) throw error;
    queueItems = data || [];
    const ids = new Set(queueItems.map((q) => q.entity_id));
    targets = everyone.filter((b) => ids.has(b.id));
    console.log(`Queue: ${queueItems.length} pending, ${targets.length} matching members`);
  }

  const template = await fs.readFile(path.join(ROOT, 'templates', 'broker-profile.ejs'), 'utf8');
  const results = [];
  for (const broker of targets) {
    const queueItem = queueItems.find((q) => q.entity_id === broker.id);
    const started = Date.now();
    try {
      if (queueItem) await supabase.from('html_generation_queue').update({ status: 'processing', started_at: new Date().toISOString() }).eq('id', queueItem.id);
      const { url, size } = await generateBrokerHTML(broker, template, everyone);
      await supabase.from('html_generation_metadata').upsert({
        entity_type: 'broker',
        entity_id: broker.id,
        html_path: url,
        file_size_bytes: size,
        generation_duration_ms: Date.now() - started,
        last_generated_at: new Date().toISOString(),
        needs_regeneration: false,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'entity_type,entity_id' });
      if (queueItem) await supabase.from('html_generation_queue').update({ status: 'completed', completed_at: new Date().toISOString() }).eq('id', queueItem.id);
      console.log(`✓ ${url}`);
      results.push({ broker: broker.full_name, success: true });
    } catch (e) {
      console.error(`✗ ${broker.full_name}: ${e.message}`);
      if (queueItem) await supabase.from('html_generation_queue').update({ status: 'failed', error_message: e.message, completed_at: new Date().toISOString() }).eq('id', queueItem.id);
      results.push({ broker: broker.full_name, success: false, error: e.message });
    }
  }

  await writeDirectories(everyone);

  // A full run also removes pages that no longer belong to a listed member
  // (renamed members' old URLs, test or retired accounts).
  if (REGENERATE_ALL) {
    const keep = new Set(everyone.map((b) => pagePath(b).url));
    const publicDir = path.join(ROOT, 'public');
    for (const dir of await fs.readdir(publicDir, { withFileTypes: true })) {
      if (!dir.isDirectory() || ['lovable-uploads', 'screens'].includes(dir.name)) continue;
      for (const file of await fs.readdir(path.join(publicDir, dir.name))) {
        if (!file.endsWith('.html') || file === 'index.html') continue;
        if (!keep.has(`/${dir.name}/${file}`)) {
          await fs.unlink(path.join(publicDir, dir.name, file));
          console.log(`- removed stale /${dir.name}/${file}`);
        }
      }
    }
  }

  const failed = results.filter((r) => !r.success);
  console.log(`\nDone: ${results.length - failed.length} generated, ${failed.length} failed`);
  if (failed.length) process.exit(1);
}

main().catch((e) => { console.error('Fatal error:', e); process.exit(1); });
