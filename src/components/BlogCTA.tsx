'use client';

import Link from 'next/link';
import { useState } from 'react';

type CTAType = 'audit' | 'consultation' | 'newsletter' | 'resource';

type BlogCTAProps = {
    type: CTAType;
    title?: string;
    description?: string;
    buttonText?: string;
    className?: string;
};

const CTA_CONFIGS: Record<CTAType, { title: string; description: string; buttonText: string; href: string }> = {
    audit: {
        title: 'Get a Free Security Audit',
        description: 'Let us assess your AI infrastructure and identify vulnerabilities. 30-minute consultation with our security experts.',
        buttonText: 'Book Free Audit',
        href: '/book-audit',
    },
    consultation: {
        title: 'Ready to Deploy Secure AI Agents?',
        description: 'Schedule a strategy call to discuss your requirements and get a custom implementation plan.',
        buttonText: 'Schedule Strategy Call',
        href: '/contact',
    },
    newsletter: {
        title: 'Stay Updated on AI Security',
        description: 'Get weekly insights on AI automation, security best practices, and implementation guides.',
        buttonText: 'Subscribe Now',
        href: '#newsletter',
    },
    resource: {
        title: 'Download Free Security Checklist',
        description: 'Get our comprehensive OpenClaw Security Checklist - essential for any enterprise deployment.',
        buttonText: 'Download Free Checklist',
        href: '/resources/openclaw-security-checklist',
    },
};

export function BlogCTA({ type, title, description, buttonText, className = '' }: BlogCTAProps) {
    const config = CTA_CONFIGS[type];
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleNewsletterSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('/api/newsletter/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                setSubscribed(true);
                setEmail('');
            } else {
                setError(data.error || 'Subscription failed');
            }
        } catch (err) {
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (type === 'newsletter') {
        return (
            <div className={`my-12 p-8 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 ${className}`}>
                <div className="max-w-2xl mx-auto">
                    <h3 className="text-2xl font-bold text-oc-cream mb-3">
                        {title || config.title}
                    </h3>
                    <p className="text-oc-cream-muted mb-6">
                        {description || config.description}
                    </p>
                    {!subscribed ? (
                        <>
                            <form onSubmit={handleNewsletterSubmit} className="flex gap-3">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="your@email.com"
                                    required
                                    disabled={loading}
                                    className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-oc-cream placeholder:text-oc-cream-muted/50 focus:outline-none focus:border-oc-cyan/50 disabled:opacity-50"
                                />
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-6 py-3 bg-oc-cyan text-oc-bg font-semibold rounded-xl hover:bg-oc-cyan-dim transition-colors disabled:opacity-50"
                                >
                                    {loading ? 'Subscribing...' : (buttonText || config.buttonText)}
                                </button>
                            </form>
                            {error && (
                                <p className="mt-3 text-oc-coral text-sm">
                                    {error}
                                </p>
                            )}
                        </>
                    ) : (
                        <div className="p-4 rounded-xl bg-oc-cyan/10 border border-oc-cyan/20 text-oc-cyan">
                            ✓ Thanks for subscribing! Check your email to confirm.
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className={`my-12 p-8 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 ${className}`}>
            <div className="max-w-2xl mx-auto text-center">
                <h3 className="text-2xl font-bold text-oc-cream mb-3">
                    {title || config.title}
                </h3>
                <p className="text-oc-cream-muted mb-6">
                    {description || config.description}
                </p>
                <Link
                    href={config.href}
                    className="inline-block px-8 py-4 bg-oc-cyan text-oc-bg font-bold rounded-xl hover:bg-oc-cyan-dim transition-colors"
                >
                    {buttonText || config.buttonText} →
                </Link>
            </div>
        </div>
    );
}

// Quick inline CTA for mid-article
export function InlineCTA({ text, href }: { text: string; href: string }) {
    return (
        <div className="my-6 p-4 bg-blue-50 dark:bg-blue-950 border-l-4 border-blue-600 rounded">
            <p className="text-slate-700 dark:text-slate-300">
                💡 <strong>Pro tip:</strong> {text}{' '}
                <Link href={href} className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                    Learn more →
                </Link>
            </p>
        </div>
    );
}
