# Blog System Usage Guide

Your AI agency blog now uses **Directus CMS** for content management. This guide explains how to use the automated content generation system.

---

## Architecture

```
┌─────────────────┐     ┌──────────────┐     ┌─────────────┐
│  Content APIs   │────▶│  Directus    │────▶│  Next.js    │
│  (AI Generated) │     │  CMS         │     │  Frontend   │
└─────────────────┘     └──────────────┘     └─────────────┘
```

**Key Files:**
- `src/lib/directus.ts` - Directus API client
- `src/lib/directus-blog.ts` - Blog utilities using Directus
- `src/app/api/content/generate/route.ts` - Content generation API
- `src/app/api/viral/route.ts` - Viral content from trending topics

---

## Setup Instructions

### 1. Start Directus (Local Development)

```bash
# Using Docker
docker-compose -f docker-compose.directus.yml up -d

# Directus will be available at http://localhost:8055
# Default login: admin@example.com / admin
```

### 2. Configure Directus

1. Open http://localhost:8055/admin
2. Create a **Posts** collection with these fields:

| Field | Type | Notes |
|-------|------|-------|
| title | String | Required |
| slug | String | Unique, URL-friendly |
| content | Text (Markdown) | Full post content |
| excerpt | Text | Short summary |
| status | String | draft / published / archived |
| published_at | DateTime | When to show on site |
| author | String | Who wrote it |
| tags | JSON | Array of strings |
| keywords | JSON | SEO keywords |
| meta_title | String | SEO title |
| meta_description | String | SEO description |
| featured_image | Image | Optional cover |
| featured | Boolean | Show on homepage |
| source_url | String | Original URL (for viral content) |
| viral_hook | String | Hook used for viral content |
| trending_source | String | Where trending topic came from |

3. Create an **API token**:
   - Go to Settings → Access Control
   - Create a new token with full read/write access
   - Save the token for `.env.local`

### 3. Configure Environment Variables

Create `.env.local`:

```env
# Directus Configuration
DIRECTUS_URL=http://localhost:8055
DIRECTUS_TOKEN=your-api-token-here

# Content API Authentication
CONTENT_API_KEY=your-secret-key-for-content-generation

# Site URL (for webhooks)
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Vercel Revalidation (for auto-rebuilds)
VERCEL_REVALIDATE_TOKEN=random-secret-string

# AI Generation (Google Gemini)
GOOGLE_GENAI_API_KEY=your-google-api-key
```

### 4. Deploy Directus (Production)

**Option A: Railway (Easiest)**
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway init
railway add directus
railway up
```

**Option B: Self-hosted VPS**
- Use the provided `docker-compose.directus.yml`
- Deploy to Hetzner/DigitalOcean ($5-10/month)
- Update `DIRECTUS_URL` in environment variables

---

## Usage

### Generate Content from Trending Topics

```bash
curl -X POST https://yourdomain.com/api/viral \
  -H "x-api-key: YOUR_CONTENT_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "topic": "OpenClaw Security Best Practices",
    "keywords": ["OpenClaw", "AI security", "enterprise"],
    "targetAudience": "CTOs and security teams",
    "contentType": "tutorial",
    "author": "AI Agency Team"
  }'
```

### Get Trending Content Ideas

```bash
curl "https://yourdomain.com/api/viral?mode=ideas&limit=5" \
  -H "x-api-key: YOUR_CONTENT_API_KEY"
```

### Generate Custom Content

```bash
curl -X POST https://yourdomain.com/api/content/generate \
  -H "x-api-key: YOUR_CONTENT_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "topic": "How to Implement AI Customer Service",
    "keywords": ["AI customer service", "Klarna", "ROI"],
    "targetAudience": "customer support managers",
    "contentType": "case-study"
  }'
```

### Auto-generate Multiple Posts (Script)

Create `scripts/generate-batch.ts`:

```typescript
import { getViralContentIdeas } from '@/lib/viralContentEngine';

async function generateBatch() {
  const ideas = await getViralContentIdeas(5);
  
  for (const idea of ideas) {
    await fetch('http://localhost:3000/api/viral', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.CONTENT_API_KEY!,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        topic: idea.topic,
        keywords: idea.keywords,
        targetAudience: idea.targetAudience,
        contentType: idea.contentType,
        trendingSource: idea.trendingSource,
        viralHook: idea.viralHook,
      }),
    });
    
    // Wait 2 seconds between requests (rate limiting)
    await new Promise(r => setTimeout(r, 2000));
  }
}

generateBatch();
```

Run:
```bash
npx tsx scripts/generate-batch.ts
```

---

## API Reference

### Content Types

| Type | Use Case | Word Count |
|------|----------|------------|
| `tutorial` | How-to guides | 1500-2500 |
| `analysis` | Trend analysis | 1500-2500 |
| `case-study` | ROI examples | 1200-1800 |
| `comparison` | Tool comparisons | 1500-2000 |
| `listicle` | Top X lists | 1200-1800 |

### Trending Sources

| Source | Endpoint | Description |
|--------|----------|-------------|
| `hacker_news` | Built-in | Top tech stories |
| `github` | Built-in | Trending repos |
| `dev_to` | Built-in | Popular articles |
| `reddit` | Built-in | r/technology hot |
| `arxiv` | Built-in | Latest AI papers |

---

## Automation Ideas

### 1. Cron Job (Daily Posts)

Use GitHub Actions or a serverless function:

```yaml
# .github/workflows/daily-post.yml
name: Daily Blog Post
on:
  schedule:
    - cron: '0 9 * * *'  # 9 AM daily

jobs:
  generate:
    runs-on: ubuntu-latest
    steps:
      - name: Generate Post
        run: |
          curl -X POST ${{ secrets.SITE_URL }}/api/viral \
            -H "x-api-key: ${{ secrets.CONTENT_API_KEY }}" \
            -d '{"auto": true}'
```

### 2. Webhook Integration

Directus can trigger rebuilds automatically:

1. In Directus, go to Settings → Webhooks
2. Create webhook pointing to `https://yoursite.com/api/revalidate`
3. Trigger on `posts.create` and `posts.update`

### 3. Content Pipeline

```
1. Trending API fetches hot topics
2. AI generates blog post
3. Saved to Directus as "published"
4. Webhook triggers Vercel revalidation
5. New post appears on site instantly
```

---

## Troubleshooting

### Posts not showing on site
- Check post `status` is `published` in Directus
- Verify `DIRECTUS_TOKEN` has read access
- Check browser console for API errors

### Generation fails
- Check `GOOGLE_GENAI_API_KEY` is valid
- Verify `CONTENT_API_KEY` matches request header
- Check rate limits (10/hour for content, 5/hour for viral)

### Auto-rebuild not working
- Verify `VERCEL_REVALIDATE_TOKEN` is set
- Check webhook URL is correct in Directus
- Test webhook manually: `curl "https://yoursite.com/api/revalidate?secret=TOKEN"`

---

## Next Steps

1. **Generate first 5 posts** using the viral API
2. **Set up webhook** for auto-rebuilds
3. **Configure cron job** for daily automation
4. **Monitor performance** and adjust content types based on engagement

---

## Cost Breakdown

| Component | Monthly Cost |
|-----------|--------------|
| Vercel (static) | $0 |
| Directus self-hosted | $5 (VPS) |
| Google Gemini API | ~$5 (1000 posts) |
| **Total** | **~$10/month** |
