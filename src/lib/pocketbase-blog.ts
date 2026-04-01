/**
 * PocketBase Blog Utilities
 * Drop-in replacement for directus-blog.ts
 */

import {
  getPublishedPosts,
  getPostBySlug,
  searchPosts as pbSearchPosts,
  getPostsByTag as pbGetPostsByTag,
  getPostsByCategory as pbGetPostsByCategory,
  getHeroImageUrl,
  type PocketBasePost,
} from './pocketbase';

export interface Post {
  slug: string;
  meta: {
    title: string;
    metaTitle?: string;
    metaDescription?: string;
    excerpt: string;
    date: string;
    author: string;
    tags: string[];
    keywords: string[];
    category?: string;
    coverImage?: string;
    featured?: boolean;
    readingTime?: number;
    wordCount?: number;
    sourceUrl?: string;
    trendingSource?: string;
  };
  content: string;
}

function transformPocketBasePost(post: PocketBasePost): Post {
  return {
    slug: post.slug,
    meta: {
      title: post.title,
      metaTitle: post.meta_title,
      metaDescription: post.meta_description,
      excerpt: post.excerpt,
      date: post.published_at || post.created,
      author: post.author,
      tags: post.tags || [],
      keywords: post.keywords || [],
      category: post.category || post.tags?.[0],
      coverImage: getHeroImageUrl(post),
      featured: post.featured,
      readingTime: post.reading_time,
      wordCount: post.word_count,
      sourceUrl: post.source_url,
      trendingSource: post.trending_source,
    },
    content: post.content,
  };
}

export async function getPosts(): Promise<Post[]> {
  try {
    const posts = await getPublishedPosts(100);
    return posts.map(transformPocketBasePost);
  } catch (error) {
    console.error('Failed to fetch posts from PocketBase:', error);
    return [];
  }
}

export async function getPostBySlugAsync(slug: string): Promise<Post | null> {
  try {
    const post = await getPostBySlug(slug);
    if (!post) return null;
    return transformPocketBasePost(post);
  } catch (error) {
    console.error(`Failed to fetch post ${slug}:`, error);
    return null;
  }
}

export async function getFeaturedPost(): Promise<Post | null> {
  try {
    const posts = await getPublishedPosts(1);
    if (posts.length === 0) return null;
    return transformPocketBasePost(posts[0]);
  } catch (error) {
    console.error('Failed to fetch featured post:', error);
    return null;
  }
}

export async function getPostsByTag(tag: string): Promise<Post[]> {
  try {
    const posts = await pbGetPostsByTag(tag, 100);
    return posts.map(transformPocketBasePost);
  } catch (error) {
    console.error(`Failed to fetch posts by tag ${tag}:`, error);
    return [];
  }
}

export async function getPostsByCategory(category: string): Promise<Post[]> {
  try {
    const posts = await pbGetPostsByCategory(category, 100);
    return posts.map(transformPocketBasePost);
  } catch (error) {
    console.error(`Failed to fetch posts by category ${category}:`, error);
    return [];
  }
}

export async function getCategories(): Promise<string[]> {
  try {
    const posts = await getPublishedPosts(100);
    const cats = posts.map(p => p.category).filter(Boolean) as string[];
    return [...new Set(cats)];
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    return [];
  }
}

export function calculateReadingTime(content: string, precomputed?: number): number {
  if (precomputed && precomputed > 0) return precomputed;
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

export function parseAuthor(author: string): string {
  return author || 'AI Agency Team';
}

export async function searchPosts(query: string): Promise<Post[]> {
  const posts = await pbSearchPosts(query, 100);
  return posts.map(transformPocketBasePost);
}

export async function getRelatedPosts(slug: string, limit = 3): Promise<Post[]> {
  const allPosts = await getPublishedPosts(100);
  const currentPost = allPosts.find(p => p.slug === slug);

  if (!currentPost) return [];

  const related = allPosts
    .filter(p => p.slug !== slug)
    .map(p => ({
      post: p,
      score: p.tags?.filter(tag => currentPost.tags?.includes(tag)).length || 0,
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ post }) => transformPocketBasePost(post));

  return related;
}
