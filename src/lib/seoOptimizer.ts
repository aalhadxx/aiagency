export type SEOData = {
    title: string;
    description: string;
    keywords: string[];
    slug: string;
    schema: string;
};

export function optimizeContent(content: string, keywords: string[]): string {
    // Add internal links to other relevant posts
    let optimized = content;

    // Add keyword variations naturally (this is a simple implementation)
    // In production, you'd want more sophisticated NLP here

    return optimized;
}

export function generateStructuredData(
    type: 'Article' | 'HowTo' | 'FAQPage',
    data: {
        title: string;
        description: string;
        author: string;
        datePublished: string;
        content?: string;
        faqs?: Array<{ question: string; answer: string }>;
    }
) {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com';

    if (type === 'Article') {
        return {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: data.title,
            description: data.description,
            author: {
                '@type': 'Person',
                name: data.author,
            },
            datePublished: data.datePublished,
            publisher: {
                '@type': 'Organization',
                name: 'Your AI Agency',
                logo: {
                    '@type': 'ImageObject',
                    url: `${baseUrl}/logo.png`,
                },
            },
        };
    }

    if (type === 'HowTo') {
        return {
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: data.title,
            description: data.description,
            datePublished: data.datePublished,
        };
    }

    if (type === 'FAQPage' && data.faqs) {
        return {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: data.faqs.map(faq => ({
                '@type': 'Question',
                name: faq.question,
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: faq.answer,
                },
            })),
        };
    }

    return null;
}

export function extractFAQs(content: string): Array<{ question: string; answer: string }> {
    const faqs: Array<{ question: string; answer: string }> = [];
    
    // Look for FAQ section
    const faqSection = content.match(/##\s+Frequently Asked Questions[\s\S]*$/i);
    if (!faqSection) return faqs;

    // Extract Q&A pairs (simple pattern matching)
    const qaPairs = faqSection[0].match(/###\s+(.+?)\n\n([\s\S]+?)(?=\n###|\n##|$)/g);
    
    if (qaPairs) {
        qaPairs.forEach(pair => {
            const match = pair.match(/###\s+(.+?)\n\n([\s\S]+?)$/);
            if (match) {
                faqs.push({
                    question: match[1].trim(),
                    answer: match[2].trim(),
                });
            }
        });
    }

    return faqs;
}

export function calculateReadingTime(content: string): number {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
}
