'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollReveal } from '@/components/scroll-reveal';
import type { Post } from '@/lib/pocketbase-blog';
import { calculateReadingTime, parseAuthor } from '@/lib/pocketbase-blog';

function formatDate(dateStr: string) {
    try {
        return new Date(dateStr).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    } catch {
        return dateStr;
    }
}

function PostCard({ post, index }: { post: Post; index: number }) {
    const readingTime = calculateReadingTime(post.content, post.meta.readingTime);
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
                            <time>{formatDate(post.meta.date)}</time>
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
                                <span key={t} className="text-xs px-2 py-1 rounded-lg bg-white/5 text-oc-cream-muted">
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>
                </article>
            </Link>
        </ScrollReveal>
    );
}

type Props = {
    allPosts: Post[];
    categories: string[];
};

export function BlogPostsClient({ allPosts, categories }: Props) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const q = searchParams.get('q') ?? '';
    const tag = searchParams.get('tag') ?? '';
    const category = searchParams.get('category') ?? '';

    const [query, setQuery] = useState(q);

    useEffect(() => setQuery(q), [q]);

    const updateParams = useCallback(
        (updates: Record<string, string | null>) => {
            const params = new URLSearchParams(searchParams.toString());
            for (const [key, value] of Object.entries(updates)) {
                if (!value) params.delete(key);
                else params.set(key, value);
            }
            const qs = params.toString();
            router.push(qs ? `/blog?${qs}` : '/blog', { scroll: false });
        },
        [router, searchParams]
    );

    const filteredPosts = useMemo(() => {
        let posts = allPosts;
        if (q) {
            const lower = q.toLowerCase();
            posts = posts.filter(
                (p) =>
                    p.meta.title.toLowerCase().includes(lower) ||
                    p.meta.excerpt.toLowerCase().includes(lower) ||
                    p.meta.tags?.some((t) => t.toLowerCase().includes(lower))
            );
        }
        if (tag) {
            posts = posts.filter((p) =>
                p.meta.tags?.some((t) => t.toLowerCase() === tag.toLowerCase())
            );
        }
        if (category) {
            posts = posts.filter(
                (p) => p.meta.category?.toLowerCase() === category.toLowerCase()
            );
        }
        return posts;
    }, [allPosts, q, tag, category]);

    const hasFilters = q || tag || category;
    const featuredPost = !hasFilters ? allPosts[0] ?? null : null;
    const displayPosts = featuredPost
        ? filteredPosts.filter((p) => p.slug !== featuredPost.slug)
        : filteredPosts;

    return (
        <>
            {/* Search & filters */}
            <div className="mb-12">
                <div className="space-y-4">
                    <form
                        onSubmit={(e) => { e.preventDefault(); updateParams({ q: query || null }); }}
                        className="relative"
                    >
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-oc-cream-muted/60" />
                        <input
                            type="search"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search posts..."
                            className="w-full pl-12 pr-24 py-3.5 rounded-xl bg-white/5 border border-white/10 text-oc-cream placeholder:text-oc-cream-muted/50 focus:outline-none focus:border-oc-cyan/50 focus:ring-2 focus:ring-oc-cyan/20 transition-all duration-300"
                        />
                        <button
                            type="submit"
                            className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 rounded-lg bg-oc-cyan/20 text-oc-cyan hover:bg-oc-cyan/30 transition-colors text-sm font-medium"
                        >
                            Search
                        </button>
                    </form>

                    <div className="flex flex-wrap items-center gap-2">
                        {categories.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                <span className="text-sm text-oc-cream-muted self-center">Category:</span>
                                <button
                                    onClick={() => updateParams({ category: null })}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${!category ? 'bg-oc-cyan/20 text-oc-cyan border border-oc-cyan/40' : 'bg-white/5 text-oc-cream-muted hover:bg-white/10 border border-white/10'}`}
                                >
                                    All
                                </button>
                                {categories.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => updateParams({ category: category === cat ? null : cat, tag: null })}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${category === cat ? 'bg-oc-cyan/20 text-oc-cyan border border-oc-cyan/40' : 'bg-white/5 text-oc-cream-muted hover:bg-white/10 border border-white/10'}`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        )}
                        <AnimatePresence>
                            {hasFilters && (
                                <motion.button
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    onClick={() => { setQuery(''); router.push('/blog', { scroll: false }); }}
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-oc-coral hover:bg-oc-coral/10 transition-colors"
                                >
                                    <X className="w-4 h-4" /> Clear filters
                                </motion.button>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* Featured post */}
            {featuredPost && (
                <ScrollReveal delay={0.2}>
                    <Link href={`/blog/${featuredPost.slug}`} className="group block mb-16">
                        <article className="relative overflow-hidden rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 transition-all duration-500 hover:border-oc-cyan/30 hover:shadow-[0_0_40px_-10px_rgba(0,255,204,0.2)]">
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
                                        <span className="text-sm font-medium text-oc-cyan mb-2">{featuredPost.meta.category}</span>
                                    )}
                                    <h2 className="text-2xl md:text-3xl font-display font-bold text-oc-cream mb-4 group-hover:text-oc-cyan transition-colors">
                                        {featuredPost.meta.title}
                                    </h2>
                                    <p className="text-oc-cream-muted mb-6 line-clamp-3">{featuredPost.meta.excerpt}</p>
                                    <div className="flex flex-wrap items-center gap-4 text-sm text-oc-cream-muted">
                                        <time>{formatDate(featuredPost.meta.date)}</time>
                                        <span>•</span>
                                        <span>{parseAuthor(featuredPost.meta.author)}</span>
                                        <span>•</span>
                                        <span>{calculateReadingTime(featuredPost.content, featuredPost.meta.readingTime)} min read</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mt-4">
                                        {featuredPost.meta.tags?.slice(0, 4).map((t) => (
                                            <span key={t} className="text-xs px-2.5 py-1 rounded-lg bg-white/5 text-oc-cream-muted">{t}</span>
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
                        <p className="text-oc-cream-muted text-lg">No posts found. Try adjusting your filters.</p>
                    </div>
                ) : (
                    displayPosts.map((post, i) => <PostCard key={post.slug} post={post} index={i} />)
                )}
            </div>
        </>
    );
}
