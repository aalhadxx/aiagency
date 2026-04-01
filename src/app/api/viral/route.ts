import { NextRequest, NextResponse } from 'next/server';
import { fetchAllTrending, getViralContentIdeas } from '@/lib/viralContentEngine';
import { generateContent } from '@/lib/contentGenerator';
import { createPost, generateSlug, getPostBySlug } from '@/lib/pocketbase';

// Rate limiter - 5 requests per hour per IP
const requestCache = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000; // 1 hour
  const maxRequests = 5;

  const record = requestCache.get(ip);
  if (!record || now > record.resetTime) {
    requestCache.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (record.count >= maxRequests) {
    return false;
  }

  record.count++;
  return true;
}

// ============================================================
// GET /api/viral/trending - Get trending topics
// ============================================================
export async function GET(request: NextRequest) {
  try {
    // Check API key
    const apiKey = request.headers.get('x-api-key');
    if (!apiKey || apiKey !== process.env.CONTENT_API_KEY) {
      return NextResponse.json(
        { error: 'Unauthorized - Invalid API key' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const sources = searchParams.get('sources')?.split(',') as any;
    const mode = searchParams.get('mode') || 'ideas'; // 'ideas' or 'raw'

    if (mode === 'ideas') {
      // Return processed viral content ideas
      const ideas = await getViralContentIdeas(limit, sources);
      return NextResponse.json({
        success: true,
        count: ideas.length,
        ideas,
      });
    } else {
      // Return raw trending items
      const trending = await fetchAllTrending(sources, limit);
      return NextResponse.json({
        success: true,
        count: trending.length,
        trending,
      });
    }

  } catch (error: any) {
    console.error('Viral content fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch trending content', details: error.message },
      { status: 500 }
    );
  }
}

// ============================================================
// POST /api/viral/generate - Generate blog post from trending topic
// ============================================================
export async function POST(request: NextRequest) {
  try {
    // Check API key
    const apiKey = request.headers.get('x-api-key');
    if (!apiKey || apiKey !== process.env.CONTENT_API_KEY) {
      return NextResponse.json(
        { error: 'Unauthorized - Invalid API key' },
        { status: 401 }
      );
    }

    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded - Max 5 requests per hour' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { 
      topic, 
      keywords, 
      targetAudience, 
      contentType = 'analysis',
      author = 'AI Agency Team',
      trendingSource = 'hacker_news',
      originalUrl,
      viralHook 
    } = body;

    // Validate required fields
    if (!topic || !keywords) {
      return NextResponse.json(
        { 
          error: 'Missing required fields',
          required: ['topic', 'keywords']
        },
        { status: 400 }
      );
    }

    console.log(`🚀 Generating viral blog post: ${topic}`);
    console.log(`   Source: ${trendingSource}${originalUrl ? ` | ${originalUrl}` : ''}`);
    if (viralHook) console.log(`   Hook: ${viralHook}`);

    // Generate content with AI
    const generatedContent = await generateContent({
      topic: viralHook ? `${viralHook}: ${topic}` : topic,
      keywords: Array.isArray(keywords) ? keywords : [keywords],
      targetAudience: targetAudience || 'tech professionals',
      contentType,
    });
    console.log(`✓ Content generated: ${generatedContent.title}`);

    // Generate unique slug
    let slug = generateSlug(generatedContent.title);
    let counter = 1;
    while (await getPostBySlug(slug)) {
      slug = `${generateSlug(generatedContent.title)}-${counter}`;
      counter++;
    }

    // Create post in PocketBase
    const post = await createPost({
      title: generatedContent.title,
      slug,
      content: generatedContent.content,
      excerpt: generatedContent.excerpt,
      status: 'published',
      published_at: new Date().toISOString(),
      author,
      tags: generatedContent.tags,
      keywords: generatedContent.keywords,
      meta_title: generatedContent.title,
      meta_description: generatedContent.excerpt.slice(0, 160),
      featured: false,
      source_url: originalUrl,
      viral_hook: viralHook,
      trending_source: trendingSource,
    });

    console.log(`✓ Blog post published to Directus: ${post.id}`);

    // Trigger Vercel revalidation if configured
    if (process.env.VERCEL_REVALIDATE_TOKEN) {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/revalidate?slug=${slug}&secret=${process.env.VERCEL_REVALIDATE_TOKEN}`);
      } catch (e) {
        console.warn('Revalidation failed:', e);
      }
    }

    return NextResponse.json({
      success: true,
      id: post.id,
      slug,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${slug}`,
      title: generatedContent.title,
      excerpt: generatedContent.excerpt,
      trendingSource,
      originalUrl,
      viralHook,
      message: 'Blog post published successfully to Directus.',
    });

  } catch (error: any) {
    console.error('Viral content generation error:', error);
    return NextResponse.json(
      { 
        error: 'Viral content generation failed',
        details: error.message 
      },
      { status: 500 }
    );
  }
}
