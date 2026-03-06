'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type BlogSearchFilterProps = {
    categories: string[];
    initialQuery?: string;
};

export function BlogSearchFilter({ categories, initialQuery = '' }: BlogSearchFilterProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const qFromUrl = searchParams.get('q') ?? initialQuery;
    const [query, setQuery] = useState(qFromUrl);

    useEffect(() => {
        setQuery(qFromUrl);
    }, [qFromUrl]);

    const tag = searchParams.get('tag') ?? '';
    const category = searchParams.get('category') ?? '';

    const updateParams = useCallback(
        (updates: Record<string, string | null>) => {
            const params = new URLSearchParams(searchParams.toString());
            for (const [key, value] of Object.entries(updates)) {
                if (value === null || value === '') {
                    params.delete(key);
                } else {
                    params.set(key, value);
                }
            }
            const qs = params.toString();
            router.push(qs ? `/blog?${qs}` : '/blog', { scroll: false });
        },
        [router, searchParams]
    );

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        updateParams({ q: query || null });
    };

    const clearFilters = () => {
        setQuery('');
        router.push('/blog', { scroll: false });
    };

    const hasFilters = query || tag || category;

    return (
        <div className="space-y-4">
            <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-oc-cream-muted/60" />
                <input
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search posts..."
                    className="w-full pl-12 pr-24 py-3.5 rounded-xl bg-white/5 border border-white/10 text-oc-cream placeholder:text-oc-cream-muted/50 focus:outline-none focus:border-oc-cyan/50 focus:ring-2 focus:ring-oc-cyan/20 transition-all duration-300"
                />
                <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 rounded-lg bg-oc-cyan/20 text-oc-cyan hover:bg-oc-cyan/30 transition-colors text-sm font-medium"
                >
                    Search
                </button>
            </form>

            {(tag || category) && (
                <p className="text-sm text-oc-cream-muted">
                    {tag && <>Filtering by tag: <span className="text-oc-cyan">{tag}</span></>}
                    {tag && category && ' • '}
                    {category && <>Category: <span className="text-oc-cyan">{category}</span></>}
                </p>
            )}

            <div className="flex flex-wrap items-center gap-2">
                {categories.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        <span className="text-sm text-oc-cream-muted self-center">Category:</span>
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => updateParams({ category: null })}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                                    !category
                                        ? 'bg-oc-cyan/20 text-oc-cyan border border-oc-cyan/40'
                                        : 'bg-white/5 text-oc-cream-muted hover:bg-white/10 border border-white/10'
                                }`}
                            >
                                All
                            </button>
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() =>
                                        updateParams({
                                            category: category === cat ? null : cat,
                                            tag: null,
                                        })
                                    }
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                                        category === cat
                                            ? 'bg-oc-cyan/20 text-oc-cyan border border-oc-cyan/40'
                                            : 'bg-white/5 text-oc-cream-muted hover:bg-white/10 border border-white/10'
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
                <AnimatePresence>
                    {hasFilters && (
                        <motion.button
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            onClick={clearFilters}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-oc-coral hover:bg-oc-coral/10 transition-colors"
                        >
                            <X className="w-4 h-4" />
                            Clear filters
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
