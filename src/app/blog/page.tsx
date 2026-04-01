import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getPosts, getCategories } from '@/lib/pocketbase-blog';
import { BlogNewsletterSignup } from '@/components/blog/BlogNewsletterSignup';
import { BlogPostsClient } from '@/components/blog/BlogPostsClient';
import { ScrollReveal } from '@/components/scroll-reveal';
import { createPageMetadata } from '@/lib/metadata';
import { SEO } from '@/components/SEO';
import { getBreadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = createPageMetadata({
    title: 'AI & OpenClaw Security Blog | Enterprise AI Insights',
    description: 'Deep dives into AI security, OpenClaw hardening, autonomous agents, and enterprise automation. Expert insights from the AI Agency team.',
    path: '/blog',
});

export const revalidate = 3600;

export default async function BlogPage() {
    const [allPosts, categories] = await Promise.all([getPosts(), getCategories()]);

    return (
        <main className="min-h-screen bg-oc-bg pt-24 pb-32">
            <SEO schema={getBreadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Blog', url: '/blog' }])} />
            <div className="container mx-auto px-4 max-w-6xl">
                <ScrollReveal>
                    <h1 className="text-4xl md:text-6xl font-display font-bold text-oc-cream mb-4">
                        Our Blog
                    </h1>
                    <p className="text-lg text-oc-cream-muted mb-12 max-w-2xl">
                        Insights on AI automation, security, and enterprise deployment.
                    </p>
                </ScrollReveal>

                <ScrollReveal delay={0.1}>
                    <div className="mb-16">
                        <BlogNewsletterSignup />
                    </div>
                </ScrollReveal>

                <Suspense fallback={<div className="h-24 rounded-xl bg-white/5 animate-pulse" />}>
                    <BlogPostsClient allPosts={allPosts} categories={categories} />
                </Suspense>
            </div>
        </main>
    );
}
