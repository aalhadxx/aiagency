/**
 * Directus CMS Client
 * Handles content creation, updates, and fetching from Directus
 */

export interface DirectusPost {
  id?: string;
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
  featured_image?: string;
  featured: boolean;
  source_url?: string;
  viral_hook?: string;
  trending_source?: string;
  date_created?: string;
  date_updated?: string;
}

export interface DirectusQuery {
  filter?: Record<string, any>;
  sort?: string[];
  limit?: number;
  offset?: number;
  fields?: string[];
}

const DIRECTUS_URL = process.env.DIRECTUS_URL || 'http://localhost:8055';
const DIRECTUS_TOKEN = process.env.DIRECTUS_TOKEN || '';

export async function createPost(post: Omit<DirectusPost, 'id'>): Promise<DirectusPost> {
  const response = await fetch(`${DIRECTUS_URL}/items/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${DIRECTUS_TOKEN}`,
    },
    body: JSON.stringify(post),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to create post: ${error}`);
  }

  const data = await response.json();
  return data.data;
}

export async function updatePost(id: string, updates: Partial<DirectusPost>): Promise<DirectusPost> {
  const response = await fetch(`${DIRECTUS_URL}/items/posts/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${DIRECTUS_TOKEN}`,
    },
    body: JSON.stringify(updates),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to update post: ${error}`);
  }

  const data = await response.json();
  return data.data;
}

export async function getPostBySlug(slug: string): Promise<DirectusPost | null> {
  const response = await fetch(
    `${DIRECTUS_URL}/items/posts?filter[slug][_eq]=${slug}&limit=1`,
    {
      headers: {
        'Authorization': `Bearer ${DIRECTUS_TOKEN}`,
      },
    }
  );

  if (!response.ok) {
    return null;
  }

  const data = await response.json();
  return data.data?.[0] || null;
}

export async function getPosts(query: DirectusQuery = {}): Promise<DirectusPost[]> {
  const params = new URLSearchParams();
  
  if (query.filter) {
    params.append('filter', JSON.stringify(query.filter));
  }
  if (query.sort) {
    query.sort.forEach(s => params.append('sort', s));
  }
  if (query.limit) {
    params.append('limit', query.limit.toString());
  }
  if (query.offset) {
    params.append('offset', query.offset.toString());
  }
  if (query.fields) {
    params.append('fields', query.fields.join(','));
  }

  const response = await fetch(`${DIRECTUS_URL}/items/posts?${params}`, {
    headers: {
      'Authorization': `Bearer ${DIRECTUS_TOKEN}`,
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to fetch posts: ${error}`);
  }

  const data = await response.json();
  return data.data || [];
}

export async function getPublishedPosts(limit = 10, offset = 0): Promise<DirectusPost[]> {
  return getPosts({
    filter: {
      status: {
        _eq: 'published',
      },
    },
    sort: ['-published_at'],
    limit,
    offset,
  });
}

export async function deletePost(id: string): Promise<void> {
  const response = await fetch(`${DIRECTUS_URL}/items/posts/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${DIRECTUS_TOKEN}`,
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to delete post: ${error}`);
  }
}

export async function postExists(slug: string): Promise<boolean> {
  const post = await getPostBySlug(slug);
  return !!post;
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}
