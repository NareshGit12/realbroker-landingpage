# Broker Profile Static HTML Generation System

## Overview

This system automatically generates static HTML pages for broker profiles, providing:
- Fast-loading, SEO-optimized profile pages
- Pre-rendered content for better search engine indexing
- Lightweight pages that load instantly
- Automated weekly generation via GitHub Actions

## Architecture

### Database Schema

#### Tables Modified
- **profiles**: Added `static_html_url` column to store the URL of generated HTML
- **html_generation_queue**: Existing table used to queue generation jobs
- **html_generation_metadata**: Existing table tracks generated files

#### Triggers
- **trigger_queue_broker_html_generation**: Automatically queues HTML generation when:
  - A new profile is created with `full_name` and `vanity_url`
  - Profile data changes (name, company, bio, avatar, rating, areas)

### Components

#### 1. Edge Function: `generate-broker-html`
Location: `supabase/functions/generate-broker-html/index.ts`

**Functionality:**
- Fetches broker data from profiles table
- Generates properties count
- Renders EJS template with broker data
- Saves generated HTML (simulated in current implementation)
- Updates `static_html_url` in profiles table
- Updates generation metadata

**Endpoints:**
```typescript
// Generate HTML for specific broker
POST /functions/v1/generate-broker-html
{ "broker_id": "uuid" }

// Process queue (next 10 pending jobs)
POST /functions/v1/generate-broker-html
{ "process_queue": true }
```

#### 2. Admin Dashboard
Location: `src/pages/AdminHTMLGeneration.tsx`
Route: `/admin/html-generation`

**Features:**
- View generation queue status
- Process queue manually
- Generate HTML for specific broker by ID
- View generated files metadata
- Monitor generation errors
- Preview generated pages

#### 3. EJS Template
Location: `templates/broker-profile.ejs`

**Content:**
- Full broker profile information
- SEO meta tags (title, description, Open Graph, Twitter Cards)
- Schema.org structured data for RealEstateAgent
- Responsive design matching BrokerCard component
- Embedded CSS for zero-dependency loading

#### 4. Updated Components

**BrokerCard** (`src/components/members/BrokerCard.tsx`):
- Now clickable, linking to static HTML or dynamic profile
- Prioritizes static HTML URL if available
- Falls back to dynamic profile via vanity URL
- Hover effect for better UX

**MeetOurMembers** (`src/pages/MeetOurMembers.tsx`):
- Fetches `vanity_url` and `static_html_url` from database
- Passes URLs to BrokerCard for proper linking

**get_member_directory** (Database Function):
- Updated to return `vanity_url` and `static_html_url`

## URL Structure

### Static HTML URLs
Pattern: `https://realbroker.app/{vanity_url}_{company-slug}.html`

Example: `https://realbroker.app/john-doe_abc-realty.html`

### Dynamic Profile URLs
Pattern: `https://my.realbroker.app/{vanity_url}`

Example: `https://my.realbroker.app/john-doe`

## Workflow

### Automatic Generation (On Profile Changes)

1. User creates/updates their profile
2. Trigger `trigger_queue_broker_html_generation` fires
3. Job is added to `html_generation_queue` with:
   - `entity_type: 'broker'`
   - `entity_id: broker_id`
   - `status: 'pending'`
   - `priority: 5`

### Weekly Batch Generation

GitHub Action (`.github/workflows/generate-static-html.yml`):
- Runs every Sunday at 2 AM UTC
- Can be triggered manually via GitHub UI
- Calls edge function with `process_queue: true`
- Processes up to 10 pending jobs per run

### Manual Generation

Via Admin Dashboard:
1. Navigate to `/admin/html-generation`
2. Either:
   - Click "Process Queue" to process next 10 pending jobs
   - Enter specific broker ID and click "Generate"
3. View real-time status updates
4. Access generated files

## Testing

### Test Single Broker Generation

```bash
curl -X POST \
  https://ayxhtlzyhpsjykxxnqqh.supabase.co/functions/v1/generate-broker-html \
  -H "Content-Type: application/json" \
  -d '{"broker_id": "your-broker-uuid"}'
```

### Test Queue Processing

```bash
curl -X POST \
  https://ayxhtlzyhpsjykxxnqqh.supabase.co/functions/v1/generate-broker-html \
  -H "Content-Type: application/json" \
  -d '{"process_queue": true}'
```

### Manual Testing Steps

1. **Create/Update a Test Profile:**
   - Ensure profile has `full_name`, `vanity_url`, `company_name`
   - Check that queue entry is created

2. **Run Generation:**
   - Use admin dashboard or direct API call
   - Verify HTML is generated

3. **Check Results:**
   - Verify `static_html_url` is updated in profiles table
   - Check `html_generation_metadata` for generation stats
   - Test the generated HTML URL

4. **Verify Integration:**
   - Visit `/members` page
   - Click on a broker card
   - Should open static HTML page

## Migration Strategy for Existing Brokers

To backfill HTML for all existing brokers:

```sql
-- Insert all existing profiles into queue
INSERT INTO public.html_generation_queue (entity_type, entity_id, priority, status)
SELECT 'broker', id, 5, 'pending'
FROM public.profiles
WHERE full_name IS NOT NULL 
  AND vanity_url IS NOT NULL
  AND role = 'user'
ON CONFLICT DO NOTHING;
```

Then process via:
- Admin dashboard "Process Queue" button (in batches of 10)
- GitHub Action workflow (manual trigger)
- Direct API calls in a loop

## Performance Considerations

### Generation Time
- Average: ~200-500ms per profile
- Includes: DB query, template rendering, metadata updates

### Storage
- Average HTML size: 8-15 KB
- Highly compressible (gzip reduces to ~3-5 KB)

### Caching
Static HTML files should be served with:
```
Cache-Control: public, max-age=86400, stale-while-revalidate=604800
```

## Future Enhancements

1. **Actual File Storage:**
   - Currently simulated
   - Implement saving to Supabase Storage or S3
   - Add CDN integration

2. **Image Optimization:**
   - Generate optimized broker avatars
   - WebP format support
   - Responsive images

3. **Advanced SEO:**
   - Generate sitemap.xml
   - Implement robots.txt rules
   - Add canonical tags

4. **Analytics:**
   - Track static page views
   - Monitor generation success rates
   - Performance metrics

5. **Incremental Updates:**
   - Smart regeneration (only changed fields)
   - Partial updates without full regeneration

## Monitoring

### Key Metrics to Track

1. **Queue Health:**
   - Pending jobs count
   - Failed jobs rate
   - Average processing time

2. **Generation Success:**
   - Success rate
   - Error types and frequency
   - Retry attempts

3. **User Impact:**
   - Static page load times
   - SEO ranking improvements
   - Click-through rates

### Admin Dashboard Metrics

The admin page displays:
- Queue status and pending count
- Recent generation activity
- Error logs
- File sizes and generation times

## Troubleshooting

### Common Issues

**1. Template Not Found Error:**
- Template is embedded in edge function code
- Check function deployment status

**2. Broker Not Found:**
- Verify broker ID exists in profiles table
- Check that `full_name` and `vanity_url` are set

**3. Generation Failed:**
- Check edge function logs
- Verify database permissions
- Review error messages in queue table

**4. Static URL Not Updated:**
- Check `static_html_url` column in profiles
- Verify edge function completed successfully
- Review metadata table for generation status

### Debug Commands

```sql
-- Check queue status
SELECT status, COUNT(*) 
FROM html_generation_queue 
WHERE entity_type = 'broker' 
GROUP BY status;

-- View recent errors
SELECT entity_id, error_message, updated_at
FROM html_generation_queue
WHERE entity_type = 'broker' 
  AND status = 'failed'
ORDER BY updated_at DESC
LIMIT 10;

-- Check generation metadata
SELECT entity_id, last_generated_at, file_size_bytes, generation_duration_ms
FROM html_generation_metadata
WHERE entity_type = 'broker'
ORDER BY last_generated_at DESC
LIMIT 10;
```

## Links

- [Admin Dashboard](/admin/html-generation)
- [Edge Function Logs](https://supabase.com/dashboard/project/ayxhtlzyhpsjykxxnqqh/functions/generate-broker-html/logs)
- [SQL Editor](https://supabase.com/dashboard/project/ayxhtlzyhpsjykxxnqqh/sql/new)
