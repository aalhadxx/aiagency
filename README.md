# AI Agency - Max Reach Content System

Enterprise-grade OpenClaw deployment and AI automation agency website with automated content generation and multi-channel distribution.

## 🚀 Features

### Core Content System
- ✅ **AI-Powered Content Generation** - Generate SEO+GEO optimized blog posts via API
- ✅ **Automated Markdown Creation** - Posts automatically saved to `content/blog/`
- ✅ **Git Auto-Commit** - Changes automatically committed to repository
- ✅ **Multi-Channel Distribution** - LinkedIn, Twitter, Newsletter ready
- ✅ **Lead Generation** - Strategic CTAs throughout content
- ✅ **Analytics Tracking** - Vercel Analytics integration

### Website Features
- ✅ **Homepage** - OpenClaw security positioning with services
- ✅ **Services Page** - Detailed service offerings with pricing
- ✅ **Blog** - SEO/GEO optimized with structured data
- ✅ **Contact Forms** - Lead capture and qualification
- ✅ **Newsletter** - Resend integration for email marketing
- ✅ **Booking Pages** - Free audit and consultation booking

## 📋 Setup Instructions

### 1. Install Dependencies

\`\`\`bash
npm install
\`\`\`

### 2. Configure Environment Variables

Update `.env.local` with your keys:

\`\`\`env
# AI Content Generation (Required)
GOOGLE_GENAI_API_KEY=your_google_api_key

# Content API Security (Required)
CONTENT_API_KEY=generate_secure_random_key_here

# Site URL (Required)
NEXT_PUBLIC_SITE_URL=https://yourdomain.com

# Email Marketing (Optional)
RESEND_API_KEY=your_resend_key
RESEND_AUDIENCE_ID=your_audience_id

# Social Media (Optional - for Phase 3)
LINKEDIN_ACCESS_TOKEN=your_linkedin_token
LINKEDIN_USER_ID=your_user_id
TWITTER_API_KEY=your_twitter_key
TWITTER_API_SECRET=your_twitter_secret
TWITTER_ACCESS_TOKEN=your_twitter_token
TWITTER_ACCESS_SECRET=your_twitter_secret
\`\`\`

### 3. Generate Initial Content

Start the dev server:

\`\`\`bash
npm run dev
\`\`\`

Then generate the first 10 OpenClaw blog posts:

\`\`\`bash
npm run generate-posts
\`\`\`

This will create 10 blog posts about:
1. Secure OpenClaw deployment
2. Why it was banned by big tech
3. Security audit checklist
4. Comparison with alternatives
5. Case studies
6. Safety guardrails guide
7. Critical vulnerabilities
8. Cost analysis
9. Production-ready agents
10. Plugin security

### 4. Deploy

Deploy to Vercel (or your preferred host):

\`\`\`bash
vercel deploy
\`\`\`

## 🎯 Usage

### Generate Content via API

\`\`\`bash
curl -X POST https://yourdomain.com/api/content/generate \\
  -H "X-API-KEY: your_content_api_key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "topic": "OpenClaw Security Best Practices",
    "keywords": ["OpenClaw security", "AI safety", "enterprise deployment"],
    "targetAudience": "CTOs and security teams",
    "contentType": "tutorial",
    "author": "Your Name"
  }'
\`\`\`

Content types: `tutorial`, `analysis`, `case-study`, `comparison`, `listicle`

### API Response

\`\`\`json
{
  "success": true,
  "slug": "openclaw-security-best-practices",
  "filePath": "content/blog/openclaw-security-best-practices.mdx",
  "url": "https://yourdomain.com/blog/openclaw-security-best-practices",
  "title": "OpenClaw Security Best Practices...",
  "excerpt": "...",
  "socialPosts": {
    "linkedin": "pending",
    "twitter": "pending"
  }
}
\`\`\`

## 📊 Architecture

\`\`\`
External System → API Endpoint → AI Generator → Markdown File → Git Commit
                                                     ↓
                                                 Next.js Site
                                                     ↓
                                    ┌────────────────┼────────────────┐
                                    ↓                ↓                ↓
                                LinkedIn         Twitter        Newsletter
\`\`\`

## 🔧 Key Files

### Content Generation
- `src/app/api/content/generate/route.ts` - Content generation API endpoint
- `src/lib/contentGenerator.ts` - AI content generation with Gemini
- `src/lib/seoOptimizer.ts` - SEO/GEO optimization and structured data
- `src/lib/markdownWriter.ts` - Markdown file creation and git commits

### Components
- `src/components/BlogCTA.tsx` - Reusable lead generation CTAs
- `src/components/StructuredData.tsx` - Schema.org structured data
- `src/lib/analytics.ts` - Analytics tracking

### Pages
- `src/app/page.tsx` - Homepage with OpenClaw positioning
- `src/app/services/page.tsx` - Services and pricing
- `src/app/contact/page.tsx` - Contact form
- `src/app/book-audit/page.tsx` - Free audit booking
- `src/app/blog/page.tsx` - Blog listing
- `src/app/blog/[slug]/page.tsx` - Individual blog posts

### Social Media (Placeholder)
- `src/lib/social/linkedin.ts` - LinkedIn posting (needs credentials)
- `src/lib/social/twitter.ts` - Twitter threading (needs credentials)

## 🎨 Customization

### Update Branding

1. **Homepage Hero**: Edit `src/app/page.tsx` - Update company name, positioning
2. **Services**: Edit `src/app/services/page.tsx` - Update pricing, deliverables
3. **Contact Info**: Edit `src/app/contact/page.tsx` - Add your email/phone
4. **About/Author**: Update author name in generated content

### Add New Services

1. Add service card to `src/app/page.tsx` (services section)
2. Add detailed page to `src/app/services/page.tsx`
3. Update form options in `src/app/contact/page.tsx`

### Customize Content Generation

Edit prompts in `src/lib/contentGenerator.ts`:
- Adjust content structure
- Change tone/style
- Add industry-specific sections
- Modify FAQ generation

## 📈 Next Steps

### Phase 1: Content System ✅
- [x] API endpoint
- [x] AI generation
- [x] SEO/GEO optimization
- [x] Markdown + Git workflow

### Phase 2: Website ✅
- [x] Homepage redesign
- [x] Services page
- [x] Contact/booking pages
- [x] Blog with CTAs
- [x] Newsletter signup

### Phase 3: Distribution (TODO - Needs Credentials)
- [ ] LinkedIn auto-posting (needs OAuth setup)
- [ ] Twitter auto-posting (needs API keys)
- [ ] Newsletter automation (Resend configured)
- [ ] Social media scheduler

### Phase 4: Optimization
- [ ] A/B test CTAs
- [ ] Heatmap tracking
- [ ] Lead scoring
- [ ] Email sequences
- [ ] Retargeting pixels

### Phase 5: Scale
- [ ] Generate 3-5 posts/week
- [ ] Build backlink strategy
- [ ] Guest posting automation
- [ ] Podcast/video content
- [ ] Community building

## 💡 Content Strategy

### SEO Optimization
- 1500-2500 word posts
- Primary keyword in title, H1, first paragraph
- Secondary keywords throughout
- Internal linking to other posts
- Image alt text optimization

### GEO Optimization (AI Citations)
- FAQ sections (AI loves Q&A)
- Conversational language
- Statistics with sources
- "What is X?" definitions
- Schema.org structured data
- AI crawler permissions in robots.txt

### Lead Generation
- Newsletter signup after intro
- Mid-article CTAs for resources
- End-of-article consultation booking
- Exit intent popups (future)
- Content upgrades (checklists, templates)

## 🔒 Security

- API key authentication for content generation
- Rate limiting (10 requests/hour/IP)
- Input validation and sanitization
- Git credentials not exposed
- Environment variables for secrets

## 📞 Support

For questions or issues:
- Email: contact@yourdomain.com
- Issues: Open a GitHub issue
- Docs: This README

## 📄 License

Private - All Rights Reserved

---

Built with Next.js, Google Gemini AI, Resend, Vercel Analytics
