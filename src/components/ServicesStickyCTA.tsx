'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export function ServicesStickyCTA() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY > 400);
        };
        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (!visible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-oc-bg/95 backdrop-blur-xl border-t border-white/10 shadow-[0_-4px_30px_rgba(0,0,0,0.2)]">
            <div className="container mx-auto max-w-4xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-oc-cream font-medium">
                    Ready to get started? Free 30-min consultation.
                </p>
                <div className="flex gap-3">
                    <Link
                        href="/book-audit"
                        className="px-6 py-2.5 bg-oc-cyan hover:bg-oc-cyan-dim text-oc-bg font-semibold rounded-lg text-sm transition-colors"
                    >
                        Book Free Audit
                    </Link>
                    <Link
                        href="/contact"
                        className="px-6 py-2.5 border border-oc-border hover:border-oc-cyan/50 text-oc-cream font-medium rounded-lg text-sm transition-colors"
                    >
                        Contact Sales
                    </Link>
                </div>
            </div>
        </div>
    );
}
