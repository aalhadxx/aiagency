import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content/blog');

export type Author = {
    name: string;
    avatar?: string;
    role?: string;
    bio?: string;
};

export type PostMeta = {
    title: string;
    excerpt: string;
    date: string;
    author: string | Author;
    tags: string[];
    category?: string;
    coverImage?: string;
    featured?: boolean;
};

export type Post = {
    slug: string;
    meta: PostMeta;
    content: string;
};

function parseAuthor(author: unknown): string {
    if (typeof author === 'string') return author;
    if (author && typeof author === 'object' && 'name' in author) {
        return (author as Author).name;
    }
    return 'Unknown';
}

function getAuthorObject(author: unknown): Author {
    if (typeof author === 'string') {
        return { name: author };
    }
    if (author && typeof author === 'object') {
        const a = author as Record<string, unknown>;
        return {
            name: (a.name as string) || 'Unknown',
            avatar: a.avatar as string | undefined,
            role: a.role as string | undefined,
            bio: a.bio as string | undefined,
        };
    }
    return { name: 'Unknown' };
}

function loadAllPosts(): Post[] {
    if (!fs.existsSync(contentDirectory)) {
        return [];
    }

    const files = fs.readdirSync(contentDirectory);

    const posts = files
        .filter((f) => f.endsWith('.mdx'))
        .map((fileName) => {
            const slug = fileName.replace(/\.mdx$/, '');
            const filePath = path.join(contentDirectory, fileName);
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            const { data, content } = matter(fileContent);

            const meta = data as Record<string, unknown>;
            const postMeta: PostMeta = {
                title: (meta.title as string) || 'Untitled',
                excerpt: (meta.excerpt as string) || '',
                date: (meta.date as string) || '',
                author: meta.author as string | Author,
                tags: Array.isArray(meta.tags) ? (meta.tags as string[]) : [],
                category: meta.category as string | undefined,
                coverImage: meta.coverImage as string | undefined,
                featured: meta.featured as boolean | undefined,
            };

            return {
                slug,
                meta: postMeta,
                content,
            };
        });

    return posts.sort((a, b) => (a.meta.date > b.meta.date ? -1 : 1));
}

export function getPosts(): Post[] {
    return loadAllPosts();
}

export function getPostBySlug(slug: string): Post | null {
    try {
        const filePath = path.join(contentDirectory, `${slug}.mdx`);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const { data, content } = matter(fileContent);

        const meta = data as Record<string, unknown>;
        const postMeta: PostMeta = {
            title: (meta.title as string) || 'Untitled',
            excerpt: (meta.excerpt as string) || '',
            date: (meta.date as string) || '',
            author: meta.author as string | Author,
            tags: Array.isArray(meta.tags) ? (meta.tags as string[]) : [],
            category: meta.category as string | undefined,
            coverImage: meta.coverImage as string | undefined,
            featured: meta.featured as boolean | undefined,
        };

        return {
            slug,
            meta: postMeta,
            content,
        };
    } catch {
        return null;
    }
}

export function getFeaturedPost(): Post | null {
    const posts = loadAllPosts();
    return posts.find((p) => p.meta.featured) ?? posts[0] ?? null;
}

export function getRelatedPosts(currentSlug: string, limit = 3): Post[] {
    const current = getPostBySlug(currentSlug);
    if (!current) return [];

    const allPosts = loadAllPosts();
    const currentTags = new Set(current.meta.tags || []);
    const currentCategory = current.meta.category;

    const scored = allPosts
        .filter((p) => p.slug !== currentSlug)
        .map((post) => {
            let score = 0;
            for (const tag of post.meta.tags || []) {
                if (currentTags.has(tag)) score += 2;
            }
            if (post.meta.category && post.meta.category === currentCategory) {
                score += 3;
            }
            return { post, score };
        })
        .filter(({ score }) => score > 0)
        .sort((a, b) => b.score - a.score);

    if (scored.length >= limit) {
        return scored.slice(0, limit).map(({ post }) => post);
    }

    const related = scored.map(({ post }) => post);
    const remaining = allPosts
        .filter((p) => p.slug !== currentSlug && !related.includes(p))
        .slice(0, limit - related.length);
    return [...related, ...remaining];
}

export function searchPosts(query: string): Post[] {
    if (!query.trim()) return loadAllPosts();

    const q = query.toLowerCase().trim();
    const posts = loadAllPosts();

    return posts.filter((post) => {
        const title = (post.meta.title || '').toLowerCase();
        const excerpt = (post.meta.excerpt || '').toLowerCase();
        const content = post.content.toLowerCase();
        const tags = (post.meta.tags || []).join(' ').toLowerCase();
        const category = (post.meta.category || '').toLowerCase();
        const authorName = parseAuthor(post.meta.author).toLowerCase();

        return (
            title.includes(q) ||
            excerpt.includes(q) ||
            content.includes(q) ||
            tags.includes(q) ||
            category.includes(q) ||
            authorName.includes(q)
        );
    });
}

export function getCategories(): string[] {
    const posts = loadAllPosts();
    const cats = new Set<string>();
    for (const p of posts) {
        if (p.meta.category) cats.add(p.meta.category);
    }
    return Array.from(cats).sort();
}

export function getPostsByCategory(category: string): Post[] {
    return loadAllPosts().filter((p) => p.meta.category === category);
}

export function getPostsByTag(tag: string): Post[] {
    return loadAllPosts().filter((p) => (p.meta.tags || []).includes(tag));
}

export function calculateReadingTime(content: string): number {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

export { parseAuthor, getAuthorObject };
