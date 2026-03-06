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
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border-t border-white/20 dark:border-slate-500/30 shadow-[0_-4px_30px_rgba(0,0,0,0.1)] dark:shadow-[0_-4px_30px_rgba(0,0,0,0.3)]">
            <div className="container mx-auto max-w-4xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-slate-700 dark:text-slate-300 font-medium">
                    Ready to get started? Free 30-min consultation.
                </p>
                <div className="flex gap-3">
                    <Link
                        href="/book-audit"
                        className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-sm transition-colors"
                    >
                        Book Free Audit
                    </Link>
                    <Link
                        href="/contact"
                        className="px-6 py-2.5 border-2 border-slate-300 dark:border-slate-600 hover:border-blue-500 text-slate-700 dark:text-slate-300 font-semibold rounded-lg text-sm transition-colors"
                    >
                        Contact Sales
                    </Link>
                </div>
            </div>
        </div>
    );
}
