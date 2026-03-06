'use client';

import { useState } from 'react';
import { Twitter, Linkedin, Link2, Check } from 'lucide-react';

type BlogShareButtonsProps = {
    title: string;
    url: string;
};

export function BlogShareButtons({ title, url }: BlogShareButtonsProps) {
    const [copied, setCopied] = useState(false);

    const shareUrl = typeof window !== 'undefined' ? window.location.href : url;
    const encodedTitle = encodeURIComponent(title);
    const encodedUrl = encodeURIComponent(shareUrl);

    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // fallback
        }
    };

    return (
        <div className="flex items-center gap-2">
            <span className="text-sm text-oc-cream-muted mr-2">Share:</span>
            <a
                href={twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-oc-cream-muted hover:bg-oc-cyan/20 hover:text-oc-cyan hover:border-oc-cyan/30 transition-all duration-300"
                aria-label="Share on Twitter"
            >
                <Twitter className="w-5 h-5" />
            </a>
            <a
                href={linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-oc-cream-muted hover:bg-oc-cyan/20 hover:text-oc-cyan hover:border-oc-cyan/30 transition-all duration-300"
                aria-label="Share on LinkedIn"
            >
                <Linkedin className="w-5 h-5" />
            </a>
            <button
                onClick={copyToClipboard}
                className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-oc-cream-muted hover:bg-oc-cyan/20 hover:text-oc-cyan hover:border-oc-cyan/30 transition-all duration-300"
                aria-label="Copy link"
            >
                {copied ? (
                    <Check className="w-5 h-5 text-oc-cyan" />
                ) : (
                    <Link2 className="w-5 h-5" />
                )}
            </button>
        </div>
    );
}
