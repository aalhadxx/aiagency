/**
 * Directus Blog Utilities
 * Fetches posts from Directus CMS instead of local MDX files
 */

import { getPublishedPosts, getPostBySlug, type DirectusPost } from './directus';

export interface Post {
  slug: string;
  meta: {
    title: string;
    excerpt: string;
    date: string;
    author: string;
    tags: string[];
    keywords: string[];
    category?: string;
    coverImage?: string;
    featured?: boolean;
  };
  content: string;
}

function transformDirectusPost(post: DirectusPost): Post {
  return {
    slug: post.slug,
    meta: {
      title: post.title,
      excerpt: post.excerpt,
      date: post.published_at || post.date_created || new Date().toISOString(),
      author: post.author,
      tags: post.tags || [],
      keywords: post.keywords || [],
      category: post.tags?.[0], // Use first tag as category
      coverImage: post.featured_image,
      featured: post.featured,
    },
    content: post.content,
  };
}

export async function getPosts(): Promise<Post[]> {
  const posts = await getPublishedPosts(100);
  return posts.map(transformDirectusPost);
}

export async function getPostBySlugAsync(slug: string): Promise<Post | null> {
  const post = await getPostBySlug(slug);
  if (!post) return null;
  return transformDirectusPost(post);
}

export async function getFeaturedPost(): Promise<Post | null> {
  const posts = await getPublishedPosts(1);
  if (posts.length === 0) return null;
  return transformDirectusPost(posts[0]);
}

export async function getPostsByTag(tag: string): Promise<Post[]> {
  const posts = await getPublishedPosts(100);
  return posts
    .filter(p => p.tags?.includes(tag))
    .map(transformDirectusPost);
}

export async function getPostsByCategory(category: string): Promise<Post[]> {
  // In Directus, we use tags as categories
  return getPostsByTag(category);
}

export async function getCategories(): Promise<string[]> {
  const posts = await getPublishedPosts(100);
  const allTags = posts.flatMap(p => p.tags || []);
  return [...new Set(allTags)];
}

export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

export function parseAuthor(author: string): string {
  return author || 'AI Agency Team';
}

export async function searchPosts(query: string): Promise<Post[]> {
  const posts = await getPublishedPosts(100);
  const lowerQuery = query.toLowerCase();
  return posts
    .filter(p => 
      p.title.toLowerCase().includes(lowerQuery) ||
      p.excerpt.toLowerCase().includes(lowerQuery) ||
      p.content.toLowerCase().includes(lowerQuery) ||
      p.tags?.some(t => t.toLowerCase().includes(lowerQuery))
    )
    .map(transformDirectusPost);
}

export async function getRelatedPosts(slug: string, limit = 3): Promise<Post[]> {
  const allPosts = await getPublishedPosts(100);
  const currentPost = allPosts.find(p => p.slug === slug);
  
  if (!currentPost) return [];
  
  // Find posts with matching tags, excluding current post
  const related = allPosts
    .filter(p => p.slug !== slug)
    .map(p => ({
      post: p,
      score: p.tags?.filter(tag => currentPost.tags?.includes(tag)).length || 0,
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ post }) => transformDirectusPost(post));
  
  return related;
}
