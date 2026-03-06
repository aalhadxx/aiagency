import { NextRequest, NextResponse } from 'next/server';
import { RateLimiterMemory } from 'rate-limiter-flexible';
import { generateContent, generateSEOMetadata, type ContentRequest } from '@/lib/contentGenerator';
import { createMarkdownFile, generateSlug, fileExists } from '@/lib/markdownWriter';

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

        // Generate slug and check if file exists
        let slug = generateSlug(seoMetadata.slug || generatedContent.title);
        let counter = 1;
        while (await fileExists(slug)) {
            slug = `${generateSlug(seoMetadata.slug || generatedContent.title)}-${counter}`;
            counter++;
        }

        // Create markdown file
        const currentDate = new Date().toISOString().split('T')[0];
        const { filePath, url } = await createMarkdownFile(
            slug,
            {
                title: generatedContent.title,
                excerpt: generatedContent.excerpt,
                date: currentDate,
                author: author || 'AI Agency Team',
                tags: generatedContent.tags,
                keywords: generatedContent.keywords,
                schema: generatedContent.schema,
                featured: false,
            },
            generatedContent.content
        );

        console.log(`✓ Markdown file created: ${filePath}`);

        // TODO: Trigger social media posts (Phase 3)
        // TODO: Add to newsletter queue (Phase 3)

        return NextResponse.json({
            success: true,
            slug,
            filePath,
            url,
            title: generatedContent.title,
            excerpt: generatedContent.excerpt,
            socialPosts: {
                linkedin: 'pending',
                twitter: 'pending',
            },
            message: 'Content generated successfully. Rebuild required to see live.'
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
