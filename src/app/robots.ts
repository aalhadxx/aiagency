import { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
    const baseUrl = SITE_CONFIG.url.replace(/\/$/, '');

    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/private/', '/admin/', '/api/'],
            },
            // Allow AI crawlers for GEO optimization
            {
                userAgent: ['Google-Extended', 'GoogleOther'],
                allow: '/',
            },
            {
                userAgent: 'PerplexityBot',
                allow: '/',
            },
            {
                userAgent: ['Claude-SearchBot', 'ClaudeBot'],
                allow: '/',
            },
            {
                userAgent: ['OAI-SearchBot', 'ChatGPT-User'],
                allow: '/',
            },
            {
                userAgent: 'MistralAI-User',
                allow: '/',
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
    }
}
