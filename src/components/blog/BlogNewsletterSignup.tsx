'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Check } from 'lucide-react';

export function BlogNewsletterSignup() {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('/api/newsletter/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                setSubscribed(true);
                setEmail('');
            } else {
                setError(data.error || 'Subscription failed');
            }
        } catch {
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative overflow-hidden rounded-2xl p-8 md:p-10 backdrop-blur-xl bg-white/5 border border-white/10"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-oc-cyan/10 via-transparent to-oc-amber/5" />
            <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-xl bg-oc-cyan/20">
                        <Mail className="w-6 h-6 text-oc-cyan" />
                    </div>
                    <h3 className="text-xl font-display font-semibold text-oc-cream">
                        Stay Updated on AI & Security
                    </h3>
                </div>
                <p className="text-oc-cream-muted mb-6 max-w-xl">
                    Get weekly insights on AI automation, security best practices, and implementation
                    guides. No spam, unsubscribe anytime.
                </p>
                {!subscribed ? (
                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your@email.com"
                            required
                            disabled={loading}
                            className="flex-1 px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-oc-cream placeholder:text-oc-cream-muted/50 focus:outline-none focus:border-oc-cyan/50 transition-colors disabled:opacity-50"
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-8 py-3.5 rounded-xl bg-oc-cyan text-oc-bg font-semibold hover:bg-oc-cyan-dim transition-colors disabled:opacity-50"
                        >
                            {loading ? 'Subscribing...' : 'Subscribe'}
                        </button>
                    </form>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center gap-3 p-4 rounded-xl bg-oc-cyan/10 border border-oc-cyan/20"
                    >
                        <Check className="w-6 h-6 text-oc-cyan flex-shrink-0" />
                        <p className="text-oc-cream">
                            Thanks for subscribing! Check your email to confirm.
                        </p>
                    </motion.div>
                )}
                {error && (
                    <p className="mt-3 text-sm text-oc-coral">{error}</p>
                )}
            </div>
        </motion.div>
    );
}
