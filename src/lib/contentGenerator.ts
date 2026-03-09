import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENAI_API_KEY || '');

export type ContentRequest = {
    topic: string;
    keywords: string[];
    targetAudience: string;
    contentType: 'tutorial' | 'analysis' | 'case-study' | 'comparison' | 'listicle';
};

export type GeneratedContent = {
    title: string;
    excerpt: string;
    content: string;
    keywords: string[];
    tags: string[];
    schema: string;
};

const CONTENT_PROMPTS = {
    tutorial: `Write a comprehensive tutorial blog post about {topic} for {targetAudience}.

Requirements:
- 1500-2500 words
- Start with a compelling hook about the problem
- Include technical depth with code examples where relevant
- Add a "Security Considerations" section
- Include a "Real-World Implementation" section with practical examples
- End with actionable steps
- Use conversational yet professional tone
- Optimize for keywords: {keywords}
- Add FAQ section at the end (3-5 questions)
- Include statistics and data where possible

Structure:
# [Title]
[Hook paragraph]
## The Problem
## How [Solution] Works
## Real-World Implementation
## Security Considerations
## Getting Started
## Frequently Asked Questions
## Conclusion`,

    analysis: `Write an in-depth trend analysis blog post about {topic} for {targetAudience}.

Requirements:
- 1500-2500 words
- Start with why this trend matters NOW in 2026
- Include market data and statistics
- Analyze why enterprises are adopting/avoiding this
- Cover security and compliance implications
- Include expert predictions
- Use conversational yet authoritative tone
- Optimize for keywords: {keywords}
- Add FAQ section at the end

Structure:
# [Title]
[Why this matters now]
## What Is [Topic]
## Current Market Landscape
## Why Enterprises Are [Adopting/Scared]
## Security and Compliance
## What This Means for Your Business
## Frequently Asked Questions
## Conclusion`,

    'case-study': `Write a detailed case study blog post about implementing {topic} for {targetAudience}.

Requirements:
- 1200-1800 words
- Follow Challenge → Solution → Results format
- Include specific metrics and outcomes
- Technical implementation details
- Security measures taken
- Lessons learned
- Optimize for keywords: {keywords}

Structure:
# [Title]
## The Challenge
## Our Approach
## Technical Implementation
## Security Measures
## Results and ROI
## Key Takeaways
## How We Can Help You`,

    comparison: `Write a comprehensive comparison blog post about {topic} for {targetAudience}.

Requirements:
- 1500-2000 words
- Compare 2-3 different approaches/tools/methods
- Include pros and cons for each
- Use cases for each option
- Technical differences
- Pricing/cost comparison
- Security implications
- Optimize for keywords: {keywords}
- Add decision matrix or table

Structure:
# [Title]
## Overview
## Option 1: [Name]
### Pros and Cons
### Best Use Cases
## Option 2: [Name]
### Pros and Cons
### Best Use Cases
## Security Comparison
## Which Should You Choose?
## Frequently Asked Questions`,

    listicle: `Write an engaging listicle blog post about {topic} for {targetAudience}.

Requirements:
- 1200-1800 words
- 5-10 items in the list
- Each item should be actionable and specific
- Include examples for each point
- Technical depth appropriate for audience
- Security considerations where relevant
- Optimize for keywords: {keywords}

Structure:
# [Title]
[Introduction explaining why this matters]
## 1. [First Item]
[Detailed explanation with examples]
## 2. [Second Item]
[Detailed explanation with examples]
[Continue for all items]
## Conclusion
## Frequently Asked Questions`
};

export async function generateContent(request: ContentRequest): Promise<GeneratedContent> {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const prompt = CONTENT_PROMPTS[request.contentType]
        .replace('{topic}', request.topic)
        .replace('{targetAudience}', request.targetAudience)
        .replace('{keywords}', request.keywords.join(', '));

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const content = response.text();

    // Extract title from content (first # heading)
    const titleMatch = content.match(/^#\s+(.+)$/m);
    const title = titleMatch ? titleMatch[1] : request.topic;

    // Generate excerpt from first paragraph
    const paragraphMatch = content.match(/^(?!#)(.+)$/m);
    const excerpt = paragraphMatch 
        ? paragraphMatch[1].substring(0, 160).trim() + '...'
        : `Comprehensive guide to ${request.topic} for ${request.targetAudience}`;

    // Generate tags from keywords and topic
    const tags = [
        ...request.keywords.slice(0, 3),
        'AI Automation',
        'Enterprise AI'
    ].filter((tag, index, self) => self.indexOf(tag) === index);

    return {
        title,
        excerpt,
        content,
        keywords: request.keywords,
        tags,
        schema: request.contentType === 'tutorial' ? 'HowTo' : 'Article'
    };
}

export async function generateSEOMetadata(content: string, primaryKeyword: string) {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `Given this blog post content, generate SEO metadata:

Content: ${content.substring(0, 1000)}...

Generate:
1. SEO-optimized title (50-60 characters, include "${primaryKeyword}")
2. Meta description (150-160 characters, compelling and keyword-rich)
3. URL slug (lowercase, hyphens, include primary keyword)

Format as JSON:
{
  "title": "...",
  "description": "...",
  "slug": "..."
}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
    }

    // Fallback
    return {
        title: primaryKeyword,
        description: content.substring(0, 160),
        slug: primaryKeyword.toLowerCase().replace(/\s+/g, '-')
    };
}
