'use client';

import { useEffect, useState } from 'react';
import type { TocItem } from '@/lib/blog-utils';

type BlogTableOfContentsProps = {
    items: TocItem[];
};

export function BlogTableOfContents({ items }: BlogTableOfContentsProps) {
    const [activeId, setActiveId] = useState<string | null>(null);

    useEffect(() => {
        if (items.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                        break;
                    }
                }
            },
            { rootMargin: '-80px 0px -80% 0px', threshold: 0 }
        );

        items.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [items]);

    if (items.length === 0) return null;

    return (
        <nav className="sticky top-28">
            <h3 className="text-sm font-semibold text-oc-cream mb-4">On this page</h3>
            <ul className="space-y-2">
                {items.map((item) => (
                    <li
                        key={item.id}
                        style={{ paddingLeft: item.level === 3 ? '1rem' : 0 }}
                    >
                        <a
                            href={`#${item.id}`}
                            className={`block text-sm py-1 transition-colors duration-200 ${
                                activeId === item.id
                                    ? 'text-oc-cyan font-medium'
                                    : 'text-oc-cream-muted hover:text-oc-cream'
                            }`}
                        >
                            {item.text}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
