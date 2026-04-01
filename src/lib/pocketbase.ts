/**
 * PocketBase API Client
 * Lightweight replacement for Directus - single binary, SQLite, zero config
 */

import PocketBase from 'pocketbase';

const PB_URL = process.env.POCKETBASE_URL || 'http://localhost:8090';
const PB_PUBLIC_URL = process.env.NEXT_PUBLIC_POCKETBASE_URL || PB_URL;
const PB_ADMIN_EMAIL = process.env.POCKETBASE_ADMIN_EMAIL || '';
const PB_ADMIN_PASSWORD = process.env.POCKETBASE_ADMIN_PASSWORD || '';

export function getPocketBase(): PocketBase {
  return new PocketBase(PB_URL);
}

export async function authenticateAdmin(): Promise<void> {
  const client = getPocketBase();
  if (!PB_ADMIN_EMAIL || !PB_ADMIN_PASSWORD) {
    throw new Error('PocketBase admin credentials not configured');
  }
  await client.collection('users').authWithPassword(PB_ADMIN_EMAIL, PB_ADMIN_PASSWORD);
}

export interface PocketBasePost {
  id: string;
  collectionId: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  status: 'draft' | 'published' | 'archived';
  published_at?: string;
  author: string;
  tags: string[];
  keywords: string[];
  meta_title?: string;
  meta_description?: string;
  hero_image?: string;
  reading_time?: number;
  word_count?: number;
  category?: string;
  featured: boolean;
  source_url?: string;
  viral_hook?: string;
  trending_source?: string;
  created: string;
  updated: string;
}

export interface CreatePostInput {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  status?: 'draft' | 'published' | 'archived';
  published_at?: string;
  author?: string;
  tags?: string[];
  keywords?: string[];
  meta_title?: string;
  meta_description?: string;
  hero_image?: string;
  reading_time?: number;
  word_count?: number;
  category?: string;
  featured?: boolean;
  source_url?: string;
  viral_hook?: string;
  trending_source?: string;
}

// CRUD Operations
export async function createPost(data: CreatePostInput): Promise<PocketBasePost> {
  const pb = getPocketBase();
  
  const postData = {
    ...data,
    status: data.status || 'published',
    author: data.author || 'AI Agency Team',
    tags: data.tags || [],
    keywords: data.keywords || [],
    featured: data.featured || false,
    published_at: data.published_at || new Date().toISOString(),
  };

  const record = await pb.collection('posts').create(postData);
  return record as unknown as PocketBasePost;
}

export async function getPostBySlug(slug: string): Promise<PocketBasePost | null> {
  const pb = getPocketBase();
  
  try {
    const record = await pb.collection('posts').getFirstListItem(`slug = "${slug}"`);
    return record as unknown as PocketBasePost;
  } catch {
    return null;
  }
}

export async function getPublishedPosts(limit = 100): Promise<PocketBasePost[]> {
  try {
    const pb = getPocketBase();
    console.log('[PocketBase] Fetching from:', PB_URL);
    const records = await pb.collection('posts').getFullList({
      sort: '-published_at',
      limit,
    });
    console.log('[PocketBase] Fetched', records.length, 'posts');
    return records as unknown as PocketBasePost[];
  } catch (error: any) {
    console.error('[PocketBase] getPublishedPosts failed:', {
      url: PB_URL,
      status: error?.status,
      message: error?.message,
      response: error?.response,
    });
    return [];
  }
}

export async function updatePost(id: string, data: Partial<CreatePostInput>): Promise<PocketBasePost> {
  const pb = getPocketBase();
  const record = await pb.collection('posts').update(id, data);
  return record as unknown as PocketBasePost;
}

export async function deletePost(id: string): Promise<void> {
  const pb = getPocketBase();
  await pb.collection('posts').delete(id);
}

export async function getPostsByTag(tag: string, limit = 100): Promise<PocketBasePost[]> {
  try {
    const pb = getPocketBase();
    const records = await pb.collection('posts').getFullList({
      sort: '-published_at',
      filter: `tags ~ "${tag}"`,
      limit,
    });
    return records as unknown as PocketBasePost[];
  } catch (error) {
    console.error('PocketBase getPostsByTag failed:', error);
    return [];
  }
}

export async function getPostsByCategory(category: string, limit = 100): Promise<PocketBasePost[]> {
  try {
    const pb = getPocketBase();
    const records = await pb.collection('posts').getFullList({
      sort: '-published_at',
      filter: `category = "${category}"`,
      limit,
    });
    return records as unknown as PocketBasePost[];
  } catch (error) {
    console.error('PocketBase getPostsByCategory failed:', error);
    return [];
  }
}

export async function searchPosts(query: string, limit = 100): Promise<PocketBasePost[]> {
  try {
    const pb = getPocketBase();
    const records = await pb.collection('posts').getFullList({
      sort: '-published_at',
      filter: `title ~ "${query}" || excerpt ~ "${query}" || content ~ "${query}"`,
      limit,
    });
    return records as unknown as PocketBasePost[];
  } catch (error) {
    console.error('PocketBase searchPosts failed:', error);
    return [];
  }
}

export function getHeroImageUrl(post: PocketBasePost): string | undefined {
  if (!post.hero_image) return undefined;
  const collectionId = post.collectionId || 'pbc_1125843985';
  return `${PB_PUBLIC_URL}/api/files/${collectionId}/${post.id}/${post.hero_image}`;
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}
