import type { Metadata } from 'next';
import { AINewsWidget } from '@/components/blog/AINewsWidget';
import { ScrollReveal } from '@/components/scroll-reveal';
import { createPageMetadata } from '@/lib/metadata';
import { SEO } from '@/components/SEO';
import { getBreadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = createPageMetadata({
    title: 'AI & Tech News | Live Feed from 15+ Sources',
    description: 'Real-time AI and tech news aggregated from Hacker News, TechCrunch, ZDNet, Reddit, GitHub, and more.',
    path: '/news',
});

export const dynamic = 'force-dynamic';

export default function NewsPage() {
    return (
        <main className="min-h-screen bg-oc-bg pt-24 pb-32">
            <SEO schema={getBreadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'News', url: '/news' }])} />
            <div className="container mx-auto px-4 max-w-6xl">
                <ScrollReveal>
                    <h1 className="text-4xl md:text-6xl font-display font-bold text-oc-cream mb-4">
                        Tech News Feed
                    </h1>
                    <p className="text-lg text-oc-cream-muted mb-12 max-w-2xl">
                        Live aggregation from 15+ tech sources. External links updated continuously.
                    </p>
                </ScrollReveal>

                <ScrollReveal delay={0.1}>
                    <AINewsWidget />
                </ScrollReveal>
            </div>
        </main>
    );
}
