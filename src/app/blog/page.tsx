import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import {
    getPosts,
    getFeaturedPost,
    searchPosts,
    getPostsByTag,
    getPostsByCategory,
    getCategories,
    calculateReadingTime,
    parseAuthor,
    type Post,
} from '@/lib/blog';
import { BlogSearchFilter } from '@/components/blog/BlogSearchFilter';
import { BlogNewsletterSignup } from '@/components/blog/BlogNewsletterSignup';
import { Suspense } from 'react';
import { ScrollReveal } from '@/components/scroll-reveal';
import { createPageMetadata } from '@/lib/metadata';
import { SEO } from '@/components/SEO';
import { getBreadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = createPageMetadata({
    title: 'AI & OpenClaw Security Blog | Enterprise AI Insights',
    description: 'Deep dives into AI security, OpenClaw hardening, autonomous agents, and enterprise automation. Expert insights from the AI Agency team.',
    path: '/blog',
});

type PageProps = {
    searchParams: Promise<{ q?: string; tag?: string; category?: string }>;
};

export default async function BlogPage({ searchParams }: PageProps) {
    const params = await searchParams;
    const { q, tag, category } = params;

    let posts: Post[];
    if (q) {
        posts = searchPosts(q);
    } else if (tag) {
        posts = getPostsByTag(tag);
    } else if (category) {
        posts = getPostsByCategory(category);
    } else {
        posts = getPosts();
    }

    const featuredPost = !q && !tag && !category ? getFeaturedPost() : null;
    const categories = getCategories();

    const displayPosts = featuredPost
        ? posts.filter((p) => p.slug !== featuredPost.slug)
        : posts;

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

                {/* Newsletter above fold */}
                <ScrollReveal delay={0.1}>
                    <div className="mb-16">
                        <BlogNewsletterSignup />
                    </div>
                </ScrollReveal>

                {/* Search & filters */}
                <ScrollReveal delay={0.15}>
                    <div className="mb-12">
                        <Suspense fallback={<div className="h-24 rounded-xl bg-white/5 animate-pulse" />}>
                            <BlogSearchFilter
                                categories={categories}
                                initialQuery={q ?? ''}
                            />
                        </Suspense>
                    </div>
                </ScrollReveal>

                {/* Featured post hero */}
                {featuredPost && (
                    <ScrollReveal delay={0.2}>
                        <Link
                            href={`/blog/${featuredPost.slug}`}
                            className="group block mb-16"
                        >
                            <article className="relative overflow-hidden rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 overflow-hidden transition-all duration-500 hover:border-oc-cyan/30 hover:shadow-[0_0_40px_-10px_rgba(0,255,204,0.2)]">
                                <div className="grid md:grid-cols-2 gap-0">
                                    <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[320px]">
                                        {featuredPost.meta.coverImage ? (
                                            <Image
                                                src={featuredPost.meta.coverImage}
                                                alt={featuredPost.meta.title}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                                sizes="(max-width: 768px) 100vw, 50vw"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 bg-gradient-to-br from-oc-cyan/20 via-oc-bg to-oc-amber/10" />
                                        )}
                                        <div className="absolute top-4 left-4">
                                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-oc-cyan/20 text-oc-cyan border border-oc-cyan/30">
                                                Featured
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-8 md:p-12 flex flex-col justify-center">
                                        {featuredPost.meta.category && (
                                            <span className="text-sm font-medium text-oc-cyan mb-2">
                                                {featuredPost.meta.category}
                                            </span>
                                        )}
                                        <h2 className="text-2xl md:text-3xl font-display font-bold text-oc-cream mb-4 group-hover:text-oc-cyan transition-colors">
                                            {featuredPost.meta.title}
                                        </h2>
                                        <p className="text-oc-cream-muted mb-6 line-clamp-3">
                                            {featuredPost.meta.excerpt}
                                        </p>
                                        <div className="flex flex-wrap items-center gap-4 text-sm text-oc-cream-muted">
                                            <time>{featuredPost.meta.date}</time>
                                            <span>•</span>
                                            <span>{parseAuthor(featuredPost.meta.author)}</span>
                                            <span>•</span>
                                            <span>
                                                {calculateReadingTime(featuredPost.content)} min read
                                            </span>
                                        </div>
                                        <div className="flex flex-wrap gap-2 mt-4">
                                            {featuredPost.meta.tags?.slice(0, 4).map((t) => (
                                                <Link
                                                    key={t}
                                                    href={`/blog?tag=${encodeURIComponent(t)}`}
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="text-xs px-2.5 py-1 rounded-lg bg-white/5 text-oc-cream-muted hover:bg-oc-cyan/20 hover:text-oc-cyan transition-colors"
                                                >
                                                    {t}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </article>
                        </Link>
                    </ScrollReveal>
                )}

                {/* Post grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {displayPosts.length === 0 ? (
                        <div className="col-span-full py-20 text-center">
                            <p className="text-oc-cream-muted text-lg">
                                No posts found. Try adjusting your filters.
                            </p>
                        </div>
                    ) : (
                        displayPosts.map((post, i) => (
                            <PostCard key={post.slug} post={post} index={i} />
                        ))
                    )}
                </div>
            </div>
        </main>
    );
}

function PostCard({ post, index }: { post: Post; index: number }) {
    const readingTime = calculateReadingTime(post.content);

    return (
        <ScrollReveal delay={0.05 * index}>
            <Link href={`/blog/${post.slug}`} className="group block h-full">
                <article className="h-full flex flex-col rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 overflow-hidden transition-all duration-500 hover:border-oc-cyan/20 hover:shadow-[0_0_30px_-10px_rgba(0,255,204,0.15)]">
                    <div className="relative aspect-[16/10] overflow-hidden">
                        {post.meta.coverImage ? (
                            <Image
                                src={post.meta.coverImage}
                                alt={post.meta.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, 33vw"
                            />
                        ) : (
                            <div className="absolute inset-0 bg-gradient-to-br from-oc-cyan/15 via-oc-bg to-oc-amber/5" />
                        )}
                        {post.meta.category && (
                            <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-xs font-medium bg-black/40 backdrop-blur-sm text-oc-cream">
                                {post.meta.category}
                            </span>
                        )}
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                        <div className="flex items-center gap-2 text-sm text-oc-cream-muted mb-3">
                            <time>{post.meta.date}</time>
                            <span>•</span>
                            <span>{parseAuthor(post.meta.author)}</span>
                            <span>•</span>
                            <span>{readingTime} min read</span>
                        </div>
                        <h2 className="text-lg font-display font-semibold text-oc-cream mb-2 group-hover:text-oc-cyan transition-colors line-clamp-2">
                            {post.meta.title}
                        </h2>
                        <p className="text-oc-cream-muted text-sm line-clamp-3 flex-1">
                            {post.meta.excerpt}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2">
                            {post.meta.tags?.slice(0, 3).map((t) => (
                                <Link
                                    key={t}
                                    href={`/blog?tag=${encodeURIComponent(t)}`}
                                    onClick={(e) => e.stopPropagation()}
                                    className="text-xs px-2 py-1 rounded-lg bg-white/5 text-oc-cream-muted hover:bg-oc-cyan/20 hover:text-oc-cyan transition-colors"
                                >
                                    {t}
                                </Link>
                            ))}
                        </div>
                    </div>
                </article>
            </Link>
        </ScrollReveal>
    );
}
