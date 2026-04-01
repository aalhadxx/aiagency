'use client';

import { useState, useRef } from 'react';
import { Check, Copy } from 'lucide-react';

export function CopyCodeBlock(props: React.HTMLAttributes<HTMLPreElement>) {
    const [copied, setCopied] = useState(false);
    const preRef = useRef<HTMLPreElement>(null);

    const handleCopy = async () => {
        const text = preRef.current?.innerText ?? '';
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // clipboard not available
        }
    };

    return (
        <div className="relative group">
            <pre ref={preRef} {...props} />
            <button
                onClick={handleCopy}
                className="absolute top-3 right-3 p-1.5 rounded-lg bg-white/10 border border-white/15 text-oc-cream-muted opacity-0 group-hover:opacity-100 hover:bg-oc-cyan/20 hover:text-oc-cyan hover:border-oc-cyan/30 transition-all duration-200"
                aria-label="Copy code"
            >
                {copied ? (
                    <Check className="w-4 h-4 text-oc-cyan" />
                ) : (
                    <Copy className="w-4 h-4" />
                )}
            </button>
        </div>
    );
}
