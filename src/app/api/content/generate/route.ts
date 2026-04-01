import { NextRequest, NextResponse } from 'next/server';
import { RateLimiterMemory } from 'rate-limiter-flexible';
import { generateContent, generateSEOMetadata, type ContentRequest } from '@/lib/contentGenerator';
import { createPost, getPostBySlug, generateSlug } from '@/lib/pocketbase';

// Rate limiter: 10 requests per hour per IP
const rateLimiter = new RateLimiterMemory({
    points: 10,
    duration: 3600,
});

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
        try {
            await rateLimiter.consume(ip);
        } catch (error) {
            return NextResponse.json(
                { error: 'Rate limit exceeded - Max 10 requests per hour' },
                { status: 429 }
            );
        }

        // Parse request body
        const body = await request.json();
        const { topic, keywords, targetAudience, contentType, author } = body;

        // Validate required fields
        if (!topic || !keywords || !targetAudience || !contentType) {
            return NextResponse.json(
                { 
                    error: 'Missing required fields',
                    required: ['topic', 'keywords', 'targetAudience', 'contentType']
                },
                { status: 400 }
            );
        }

        // Validate content type
        const validTypes = ['tutorial', 'analysis', 'case-study', 'comparison', 'listicle'];
        if (!validTypes.includes(contentType)) {
            return NextResponse.json(
                { 
                    error: 'Invalid content type',
                    validTypes
                },
                { status: 400 }
            );
        }

        console.log(`🚀 Generating content: ${topic}`);

        // Generate content with AI
        const contentRequest: ContentRequest = {
            topic,
            keywords: Array.isArray(keywords) ? keywords : [keywords],
            targetAudience,
            contentType,
        };

        const generatedContent = await generateContent(contentRequest);
        console.log(`✓ Content generated: ${generatedContent.title}`);

        // Generate SEO metadata
        const seoMetadata = await generateSEOMetadata(
            generatedContent.content,
            keywords[0]
        );
        console.log(`✓ SEO metadata generated`);

        // Generate slug and check if exists
        let slug = generateSlug(seoMetadata.slug || generatedContent.title);
        let counter = 1;
        while (await getPostBySlug(slug)) {
            slug = `${generateSlug(seoMetadata.slug || generatedContent.title)}-${counter}`;
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
            author: author || 'AI Agency Team',
            tags: generatedContent.tags,
            keywords: generatedContent.keywords,
            meta_title: seoMetadata.title || generatedContent.title,
            meta_description: seoMetadata.description || generatedContent.excerpt.slice(0, 160),
            featured: false,
        });

        console.log(`✓ Post published to PocketBase: ${post.id}`);

        // Trigger revalidation if configured
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
            message: 'Content published successfully to PocketBase.'
        });

    } catch (error: any) {
        console.error('Content generation error:', error);
        return NextResponse.json(
            { 
                error: 'Content generation failed',
                details: error.message 
            },
            { status: 500 }
        );
    }
}

export async function GET(request: NextRequest) {
    return NextResponse.json({
        message: 'Content Generation API',
        endpoint: 'POST /api/content/generate',
        authentication: 'Header: x-api-key',
        rateLimit: '10 requests per hour',
        requiredFields: ['topic', 'keywords', 'targetAudience', 'contentType'],
        contentTypes: ['tutorial', 'analysis', 'case-study', 'comparison', 'listicle'],
        example: {
            topic: 'OpenClaw Security Best Practices for Enterprise',
            keywords: ['OpenClaw security', 'AI agent safety', 'enterprise deployment'],
            targetAudience: 'CTOs and security teams',
            contentType: 'tutorial',
            author: 'Your Name'
        }
    });
}
