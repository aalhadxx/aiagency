import fs from 'fs';
import path from 'path';
import type { GeneratedContent } from './contentGenerator';


export type MarkdownMetadata = {
    title: string;
    excerpt: string;
    date: string;
    author: string;
    tags: string[];
    keywords: string[];
    schema: string;
    featured?: boolean;
};

export async function createMarkdownFile(
    slug: string,
    metadata: MarkdownMetadata,
    content: string
): Promise<{ filePath: string; url: string }> {
    const contentDir = path.join(process.cwd(), 'content', 'blog');
    
    // Ensure directory exists
    if (!fs.existsSync(contentDir)) {
        fs.mkdirSync(contentDir, { recursive: true });
    }

    // Create frontmatter
    const frontmatter = `---
title: "${metadata.title}"
excerpt: "${metadata.excerpt}"
date: "${metadata.date}"
author: "${metadata.author}"
tags: ${JSON.stringify(metadata.tags)}
keywords: ${JSON.stringify(metadata.keywords)}
schema: "${metadata.schema}"
featured: ${metadata.featured || false}
---

`;

    const fullContent = frontmatter + content;
    const filePath = path.join(contentDir, `${slug}.mdx`);
    
    // Write file
    fs.writeFileSync(filePath, fullContent, 'utf-8');
    console.log(`✓ Blog post created: ${filePath}`);

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const url = `${baseUrl}/blog/${slug}`;

    return { filePath, url };
}

export function generateSlug(title: string): string {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
}

export async function fileExists(slug: string): Promise<boolean> {
    const contentDir = path.join(process.cwd(), 'content', 'blog');
    const filePath = path.join(contentDir, `${slug}.mdx`);
    return fs.existsSync(filePath);
}
