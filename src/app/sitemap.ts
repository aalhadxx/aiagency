import { MetadataRoute } from 'next'
import { getPosts } from '@/lib/blog'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : 'http://localhost:3000';

    const posts = getPosts();
    const blogUrls = posts.map((post) => {
        const date = post.meta.date ? new Date(post.meta.date) : new Date();
        const lastModified = isNaN(date.getTime()) ? new Date() : date;
        return {
            url: `${baseUrl}/blog/${post.slug}`,
            lastModified,
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        };
    });

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${baseUrl}/manifesto`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.8,
        },
        ...blogUrls,
    ]
}
