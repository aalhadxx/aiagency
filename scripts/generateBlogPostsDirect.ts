import { GoogleGenerativeAI } from '@google/generative-ai';
import * as fs from 'fs/promises';
import * as path from 'path';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENAI_API_KEY || '');

const BLOG_TOPICS = [
    // Small business AI (high traffic potential)
    { topic: "AI Customer Service for Small Businesses: 24/7 Support Under $200/Month", keywords: ["AI customer service", "small business automation", "chatbot"], audience: "small business owners" },
    { topic: "How AI Email Automation Can Save Your Business 15 Hours Per Week", keywords: ["email automation", "AI productivity", "small business"], audience: "entrepreneurs" },
    { topic: "The Complete Guide to AI Content Creation for Businesses Under 50 Employees", keywords: ["AI content creation", "marketing automation"], audience: "marketing managers" },
    { topic: "AI Voice Agents That Get 391% ROI: Case Studies from Real Businesses", keywords: ["AI voice agents", "voice AI ROI"], audience: "business owners" },
    { topic: "How Klarna Saved $40M With Customer Service AI (And What You Can Learn)", keywords: ["Klarna AI", "customer service automation"], audience: "CTOs" },
    
    // OpenClaw (niche content)
    { topic: "How to Deploy OpenClaw Securely in Enterprise Environments 2026", keywords: ["OpenClaw security", "enterprise deployment"], audience: "CTOs" },
    { topic: "Why Meta, Google, and Microsoft Banned OpenClaw (And How to Fix It)", keywords: ["OpenClaw banned", "AI security"], audience: "security teams" },
    { topic: "OpenClaw Security Audit Checklist: 47 Critical Points", keywords: ["OpenClaw audit", "security checklist"], audience: "security professionals" },
    
    // GEO & SEO
    { topic: "GEO vs SEO 2026: How to Get Your Business Cited by ChatGPT and Google AI", keywords: ["GEO optimization", "AI search"], audience: "marketers" },
    { topic: "How to Optimize Your Website for AI Search Engines (ChatGPT, Perplexity, Claude)", keywords: ["AI SEO", "generative engine optimization"], audience: "SEO professionals" },
    
    // Technical AI
    { topic: "RAG Implementation Guide: Build Your Own AI Knowledge Base in 7 Days", keywords: ["RAG implementation", "vector database"], audience: "AI engineers" },
    { topic: "Local LLM Deployment: Save 52-75% vs Cloud AI with On-Premise Hosting", keywords: ["local LLM", "self-hosted AI"], audience: "CTOs" },
    { topic: "HIPAA-Compliant AI: How Healthcare Companies Deploy Private LLMs", keywords: ["HIPAA AI", "healthcare AI"], audience: "healthcare IT" },
    
    // Industry-specific
    { topic: "Legal AI Systems That Deliver 284% ROI: Document Automation Case Studies", keywords: ["legal AI", "document automation"], audience: "law firms" },
    { topic: "Healthcare AI Implementation: 451% ROI and HIPAA Compliance in 2026", keywords: ["healthcare AI", "medical AI"], audience: "healthcare executives" },
    { topic: "AI for Real Estate: Automated Lead Qualification and Follow-Up Systems", keywords: ["real estate AI", "lead automation"], audience: "real estate agencies" },
    
    // Comparisons (high search volume)
    { topic: "ChatGPT vs Claude vs Gemini for Business: Which AI in 2026?", keywords: ["AI comparison", "ChatGPT vs Claude"], audience: "business decision makers" },
    { topic: "OpenAI API vs Anthropic vs Google AI: Cost, Performance, and ROI Analysis", keywords: ["AI API comparison", "LLM costs"], audience: "developers" },
    { topic: "On-Premise AI vs Cloud AI: Total Cost of Ownership Analysis 2026", keywords: ["AI TCO", "cloud vs on-premise"], audience: "CFOs" },
    
    // Trending
    { topic: "Cursor AI at $2B ARR: What Makes AI Code Editors So Valuable?", keywords: ["Cursor AI", "AI code editor"], audience: "developers" },
];

function generateSlug(title: string): string {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .substring(0, 100);
}

async function generatePost(topic: string, keywords: string[], audience: string, index: number, total: number) {
    console.log(`\n📝 [${index}/${total}] Generating: ${topic}`);
    
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    
    const prompt = `Write a comprehensive, SEO-optimized blog post about: ${topic}

Target audience: ${audience}
Keywords to optimize for: ${keywords.join(', ')}

Requirements:
- 1800-2500 words
- Professional yet conversational tone
- Start with a compelling hook about the problem
- Include specific statistics, numbers, and ROI data where possible (use realistic 2026 data)
- Add an FAQ section at the end with 5 questions
- Structure with clear H2 and H3 headings
- Include actionable takeaways
- Focus on practical implementation over theory
- Optimize for AI search engines (ChatGPT, Perplexity) - use Q&A format where helpful
- Make it highly quotable for AI citations

Write the complete article in markdown format. Start directly with the # heading (title).`;

    try {
        const result = await model.generateContent(prompt);
        const content = result.response.text();
        
        // Extract title from first line
        const lines = content.split('\n');
        const titleLine = lines.find(l => l.startsWith('# '));
        const title = titleLine ? titleLine.replace('# ', '').trim() : topic;
        
        // Generate excerpt from first paragraph
        const firstPara = lines.find(l => l.trim() && !l.startsWith('#'));
        const excerpt = firstPara ? firstPara.substring(0, 160) + '...' : 'AI implementation guide and best practices';
        
        // Generate slug
        const slug = generateSlug(title);
        
        // Create frontmatter
        const date = new Date().toISOString().split('T')[0];
        const tags = keywords.slice(0, 5);
        
        const frontmatter = `---
title: '${title.replace(/'/g, "''")}'
excerpt: '${excerpt.replace(/'/g, "''")}'
date: '${date}'
author:
  name: 'AI Agency Team'
  role: 'AI Implementation Specialists'
  bio: 'Helping businesses implement AI solutions that deliver measurable ROI'
category: 'AI'
coverImage: ''
featured: ${index <= 3}
tags: ${JSON.stringify(tags)}
---

`;

        const fullContent = frontmatter + content;
        
        // Save to file
        const contentDir = path.join(process.cwd(), 'content', 'blog');
        await fs.mkdir(contentDir, { recursive: true });
        
        const filePath = path.join(contentDir, `${slug}.mdx`);
        await fs.writeFile(filePath, fullContent, 'utf-8');
        
        console.log(`✓ Success: ${title}`);
        console.log(`  File: content/blog/${slug}.mdx`);
        
        return { success: true, slug, title };
    } catch (error: any) {
        console.error(`✗ Error: ${error.message}`);
        return { success: false, error: error.message };
    }
}

async function main() {
    console.log('🚀 Starting direct blog post generation...');
    console.log(`📊 Generating ${BLOG_TOPICS.length} posts\n`);
    
    let successful = 0;
    let failed = 0;
    
    for (let i = 0; i < BLOG_TOPICS.length; i++) {
        const topic = BLOG_TOPICS[i];
        const result = await generatePost(
            topic.topic,
            topic.keywords,
            topic.audience,
            i + 1,
            BLOG_TOPICS.length
        );
        
        if (result.success) {
            successful++;
        } else {
            failed++;
        }
        
        // Wait 2 seconds between posts to respect rate limits
        if (i < BLOG_TOPICS.length - 1) {
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
    }
    
    console.log(`\n\n🎉 Generation complete!`);
    console.log(`✓ Successful: ${successful}`);
    console.log(`✗ Failed: ${failed}`);
}

main().catch(console.error);
