import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import Image from 'next/image';
import rehypeSlug from 'rehype-slug';
import {
    getPostBySlug,
    getPosts,
    getRelatedPosts,
    parseAuthor,
    calculateReadingTime,
} from '@/lib/blog';
import { extractHeadings } from '@/lib/blog-utils';
import { generateStructuredData, extractFAQs } from '@/lib/seoOptimizer';
import { StructuredData } from '@/components/StructuredData';
import { BlogCTA } from '@/components/BlogCTA';
import { BlogAuthorCard } from '@/components/blog/BlogAuthorCard';
import { BlogShareButtons } from '@/components/blog/BlogShareButtons';
import { BlogTableOfContents } from '@/components/blog/BlogTableOfContents';
import { ScrollReveal } from '@/components/scroll-reveal';

export async function generateStaticParams() {
    const posts = getPosts();
    return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        return { title: 'Post Not Found' };
    }

    const authorName = parseAuthor(post.meta.author);

    return {
        title: `${post.meta.title} - AI Agency Blog`,
        description: post.meta.excerpt,
        keywords: post.meta.tags?.join(', '),
        openGraph: {
            title: post.meta.title,
            description: post.meta.excerpt,
            type: 'article',
            publishedTime: post.meta.date,
            authors: [authorName],
            images: post.meta.coverImage ? [post.meta.coverImage] : undefined,
        },
        twitter: {
            card: 'summary_large_image',
            title: post.meta.title,
            description: post.meta.excerpt,
        },
    };
}

function splitContentAfterFirstSection(content: string): [string, string] {
    const parts = content.split(/\n(?=##\s+)/);
    if (parts.length > 1) {
        return [parts[0].trim(), parts.slice(1).join('\n').trim()];
    }
    return [content, ''];
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    const authorName = parseAuthor(post.meta.author);
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com';
    const postUrl = `${baseUrl}/blog/${slug}`;

    const articleSchema = generateStructuredData('Article', {
        title: post.meta.title,
        description: post.meta.excerpt,
        author: authorName,
        datePublished: post.meta.date,
    });

    const faqs = extractFAQs(post.content);
    const faqSchema =
        faqs.length > 0
            ? generateStructuredData('FAQPage', {
                  title: post.meta.title,
                  description: post.meta.excerpt,
                  author: authorName,
                  datePublished: post.meta.date,
                  faqs,
              })
            : null;

    const readingTime = calculateReadingTime(post.content);
    const tocItems = extractHeadings(post.content);
    const [introContent, restContent] = splitContentAfterFirstSection(post.content);
    const relatedPosts = getRelatedPosts(slug, 3);

    const mdxOptions = {
        mdxOptions: {
            rehypePlugins: [rehypeSlug],
        },
    };

    const proseClasses =
        'prose prose-lg max-w-none prose-headings:scroll-mt-28 prose-headings:font-display prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-p:text-oc-cream-muted prose-p:leading-relaxed prose-a:text-oc-cyan prose-a:no-underline hover:prose-a:underline prose-strong:text-oc-cream prose-li:text-oc-cream-muted prose-blockquote:border-oc-cyan/50 prose-blockquote:bg-white/5 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-xl prose-pre:bg-oc-surface prose-pre:border prose-pre:border-white/10 prose-table:text-oc-cream-muted';

    return (
        <>
            {articleSchema && <StructuredData data={articleSchema} />}
            {faqSchema && <StructuredData data={faqSchema} />}

            <article className="min-h-screen bg-oc-bg pt-24 pb-32">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 text-sm text-oc-cream-muted hover:text-oc-cyan transition-colors mb-12"
                        >
                            ← Back to Blog
                        </Link>

                        {/* Cover image */}
                        {post.meta.coverImage && (
                            <ScrollReveal>
                                <div className="relative aspect-[21/9] rounded-2xl overflow-hidden mb-12">
                                    <Image
                                        src={post.meta.coverImage}
                                        alt={post.meta.title}
                                        fill
                                        className="object-cover"
                                        priority
                                        sizes="(max-width: 768px) 100vw, 896px"
                                    />
                                </div>
                            </ScrollReveal>
                        )}

                        <header className="mb-12">
                            <div className="flex flex-wrap gap-2 mb-4">
                                {post.meta.category && (
                                    <span className="px-3 py-1 rounded-lg text-sm font-medium bg-oc-cyan/20 text-oc-cyan border border-oc-cyan/30">
                                        {post.meta.category}
                                    </span>
                                )}
                                {post.meta.tags?.map((tag) => (
                                    <Link
                                        key={tag}
                                        href={`/blog?tag=${encodeURIComponent(tag)}`}
                                        className="px-3 py-1 rounded-lg text-sm font-medium bg-white/5 text-oc-cream-muted hover:bg-oc-cyan/20 hover:text-oc-cyan border border-white/10 transition-colors"
                                    >
                                        {tag}
                                    </Link>
                                ))}
                            </div>
                            <h1 className="text-3xl md:text-5xl font-display font-bold text-oc-cream mb-6 leading-tight">
                                {post.meta.title}
                            </h1>
                            <div className="flex flex-wrap items-center gap-4 text-oc-cream-muted mb-8">
                                <time>{post.meta.date}</time>
                                <span>•</span>
                                <span>by {authorName}</span>
                                <span>•</span>
                                <span>{readingTime} min read</span>
                            </div>

                            {/* Author card */}
                            <div className="mb-8">
                                <BlogAuthorCard author={post.meta.author} />
                            </div>

                            {/* Share buttons */}
                            <BlogShareButtons title={post.meta.title} url={postUrl} />
                        </header>

                        <div className="grid lg:grid-cols-[1fr_240px] gap-12">
                            <div>
                                {/* Intro section */}
                                <div className={proseClasses}>
                                    <MDXRemote source={introContent} options={mdxOptions} />
                                </div>

                                {/* CTA after first section */}
                                <div className="my-12">
                                    <BlogCTA type="newsletter" />
                                </div>

                                {/* Rest of content */}
                                {restContent && (
                                    <div className={proseClasses}>
                                        <MDXRemote source={restContent} options={mdxOptions} />
                                    </div>
                                )}

                                {/* CTAs at end */}
                                <div className="mt-12 space-y-8">
                                    <BlogCTA type="audit" />
                                    <BlogCTA type="consultation" />
                                </div>

                                {/* Related posts */}
                                {relatedPosts.length > 0 && (
                                    <ScrollReveal>
                                        <div className="mt-16 pt-12 border-t border-white/10">
                                            <h3 className="text-xl font-display font-semibold text-oc-cream mb-6">
                                                Related Posts
                                            </h3>
                                            <div className="grid gap-4 sm:grid-cols-3">
                                                {relatedPosts.map((related) => (
                                                    <Link
                                                        key={related.slug}
                                                        href={`/blog/${related.slug}`}
                                                        className="block p-4 rounded-xl backdrop-blur-xl bg-white/5 border border-white/10 hover:border-oc-cyan/20 transition-all duration-300"
                                                    >
                                                        <h4 className="font-display font-medium text-oc-cream line-clamp-2 mb-2">
                                                            {related.meta.title}
                                                        </h4>
                                                        <p className="text-sm text-oc-cream-muted line-clamp-2">
                                                            {related.meta.excerpt}
                                                        </p>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </ScrollReveal>
                                )}

                                {/* Related tags */}
                                <div className="mt-12 pt-8 border-t border-white/10">
                                    <h3 className="text-lg font-display font-semibold text-oc-cream mb-4">
                                        Related Topics
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {post.meta.tags?.map((tag) => (
                                            <Link
                                                key={tag}
                                                href={`/blog?tag=${encodeURIComponent(tag)}`}
                                                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-oc-cyan/20 text-oc-cream-muted hover:text-oc-cyan border border-white/10 transition-colors"
                                            >
                                                #{tag}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Table of contents - sticky sidebar */}
                            {tocItems.length > 0 && (
                                <aside className="hidden lg:block">
                                    <div className="sticky top-28 rounded-2xl p-6 backdrop-blur-xl bg-white/5 border border-white/10">
                                        <BlogTableOfContents items={tocItems} />
                                    </div>
                                </aside>
                            )}
                        </div>
                    </div>
                </div>
            </article>
        </>
    );
}
