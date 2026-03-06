'use client';

import { useState } from 'react';
import { trackConversion } from '@/lib/analytics';

const STATS = [
    { value: '50+', label: 'Deployments' },
    { value: 'SOC 2', label: 'Compliant' },
    { value: '99.9%', label: 'Uptime' },
    { value: '24h', label: 'Response' },
];

const TESTIMONIALS = [
    {
        quote: "The security audit revealed 3 critical vulnerabilities we didn't know existed. They fixed everything in 48 hours. Worth every penny.",
        author: "Director of Engineering",
        company: "SaaS Company",
    },
    {
        quote: "Best AI implementation partner we've worked with. Clear communication, on-time delivery, and rock-solid security.",
        author: "CTO",
        company: "FinTech Startup",
    },
];

const CLIENT_LOGOS = ['Acme', 'TechCorp', 'DataFlow', 'SecureAI', 'CloudNine'];

const WHAT_TO_EXPECT = [
    { step: 1, title: 'Book', desc: 'Fill out the form. We\'ll confirm within 1 hour.' },
    { step: 2, title: 'Prep', desc: 'We\'ll send a short prep checklist (5 min).' },
    { step: 3, title: 'Call', desc: '30-min video call to assess your setup.' },
    { step: 4, title: 'Report', desc: 'Get a prioritized action plan within 48 hours.' },
];

export default function BookAuditPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        currentSetup: '',
        timeline: '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [submitError, setSubmitError] = useState('');

    const validate = () => {
        const next: Record<string, string> = {};
        if (!formData.name.trim()) next.name = 'Name is required';
        if (!formData.email.trim()) next.email = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) next.email = 'Enter a valid email';
        if (!formData.company.trim()) next.company = 'Company is required';
        if (!formData.currentSetup) next.currentSetup = 'Please select your current setup';
        if (!formData.timeline) next.timeline = 'Please select a timeline';
        setErrors(next);
        return Object.keys(next).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);
        setSubmitError('');

        try {
            const res = await fetch('/api/audit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await res.json();

            if (!res.ok) {
                setSubmitError(data.error || 'Something went wrong. Please try again.');
                return;
            }

            trackConversion.auditBooked(formData.company, formData.timeline);
            setSubmitted(true);
        } catch {
            setSubmitError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-6">
                <div className="glass-card glass-base backdrop-blur-xl bg-white/5 border border-white/10 max-w-md w-full p-8 text-center glass-fade-in">
                    <div className="text-5xl mb-6">🎉</div>
                    <h1 className="text-2xl font-bold text-white mb-4">Audit Booked!</h1>
                    <p className="text-slate-300 mb-8">
                        Check your email for calendar invite and preparation checklist. We'll see you soon!
                    </p>
                    <a
                        href="/"
                        className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-colors"
                    >
                        Back to Home
                    </a>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-16 md:py-24">
            <div className="container mx-auto px-4 max-w-5xl">
                {/* Stats bar */}
                <div className="glass-card glass-base backdrop-blur-xl bg-white/5 border border-white/10 flex flex-wrap justify-center gap-8 md:gap-12 py-6 px-6 mb-12">
                    {STATS.map((stat) => (
                        <div key={stat.label} className="text-center">
                            <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                            <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">{stat.label}</div>
                        </div>
                    ))}
                </div>

                <div className="text-center mb-12">
                    <div className="inline-block px-4 py-2 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold mb-4">
                        💯 100% Free, No Commitment
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Free OpenClaw Security Audit
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                        30-minute consultation where we'll assess your AI infrastructure and identify vulnerabilities before they become incidents.
                    </p>
                </div>

                {/* What to expect */}
                <div className="glass-card glass-base backdrop-blur-xl bg-white/5 border border-white/10 p-6 md:p-8 mb-12">
                    <h2 className="text-xl font-bold text-white mb-6">What to Expect</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {WHAT_TO_EXPECT.map((item) => (
                            <div key={item.step} className="relative">
                                <div className="text-2xl font-bold text-blue-500/80 mb-2">{item.step}</div>
                                <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                                <p className="text-sm text-slate-400">{item.desc}</p>
                                {item.step < 4 && (
                                    <div className="hidden lg:block absolute top-4 -right-3 w-6 h-0.5 bg-slate-600" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Form */}
                    <div className="glass-card glass-base backdrop-blur-xl bg-white/5 border border-white/10 p-6 md:p-8">
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1.5">
                                    Name *
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 rounded-lg bg-white/5 border text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 ${
                                        errors.name ? 'border-red-500' : 'border-white/10'
                                    }`}
                                    placeholder="Your name"
                                />
                                {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1.5">
                                    Email *
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 rounded-lg bg-white/5 border text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 ${
                                        errors.email ? 'border-red-500' : 'border-white/10'
                                    }`}
                                    placeholder="you@company.com"
                                />
                                {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
                            </div>

                            <div>
                                <label htmlFor="company" className="block text-sm font-medium text-slate-300 mb-1.5">
                                    Company *
                                </label>
                                <input
                                    type="text"
                                    id="company"
                                    name="company"
                                    required
                                    value={formData.company}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 rounded-lg bg-white/5 border text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 ${
                                        errors.company ? 'border-red-500' : 'border-white/10'
                                    }`}
                                    placeholder="Your company"
                                />
                                {errors.company && <p className="mt-1 text-sm text-red-400">{errors.company}</p>}
                            </div>

                            <div>
                                <label htmlFor="currentSetup" className="block text-sm font-medium text-slate-300 mb-1.5">
                                    Current Setup *
                                </label>
                                <select
                                    id="currentSetup"
                                    name="currentSetup"
                                    required
                                    value={formData.currentSetup}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 rounded-lg bg-white/5 border text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 ${
                                        errors.currentSetup ? 'border-red-500' : 'border-white/10'
                                    }`}
                                >
                                    <option value="">Select...</option>
                                    <option value="running">Already running OpenClaw</option>
                                    <option value="planning">Planning to deploy</option>
                                    <option value="evaluating">Evaluating options</option>
                                    <option value="other">Other AI automation</option>
                                </select>
                                {errors.currentSetup && <p className="mt-1 text-sm text-red-400">{errors.currentSetup}</p>}
                            </div>

                            <div>
                                <label htmlFor="timeline" className="block text-sm font-medium text-slate-300 mb-1.5">
                                    Timeline *
                                </label>
                                <select
                                    id="timeline"
                                    name="timeline"
                                    required
                                    value={formData.timeline}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 rounded-lg bg-white/5 border text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 ${
                                        errors.timeline ? 'border-red-500' : 'border-white/10'
                                    }`}
                                >
                                    <option value="">Select...</option>
                                    <option value="urgent">Urgent (ASAP)</option>
                                    <option value="soon">Within 2 weeks</option>
                                    <option value="month">Within a month</option>
                                    <option value="exploring">Just exploring</option>
                                </select>
                                {errors.timeline && <p className="mt-1 text-sm text-red-400">{errors.timeline}</p>}
                            </div>

                            {submitError && (
                                <p className="text-sm text-red-400 bg-red-500/10 rounded-lg px-4 py-2">{submitError}</p>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full px-8 py-4 bg-blue-600 hover:bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-colors"
                            >
                                {loading ? 'Submitting...' : 'Book My Free Audit →'}
                            </button>

                            <p className="text-xs text-slate-500 text-center">
                                We'll only use your info to respond. No spam, ever.
                            </p>
                        </form>
                    </div>

                    {/* Trust signals */}
                    <div className="space-y-6">
                        {TESTIMONIALS.map((t, i) => (
                            <div key={i} className="glass-card glass-base backdrop-blur-xl bg-white/5 border border-white/10 p-6">
                                <p className="text-slate-300 italic mb-3">"{t.quote}"</p>
                                <div className="font-medium text-white">— {t.author}, {t.company}</div>
                            </div>
                        ))}

                        <div className="glass-card glass-base backdrop-blur-xl bg-white/5 border border-white/10 p-6">
                            <h3 className="text-sm font-semibold text-white mb-3">What We'll Review</h3>
                            <ul className="space-y-2 text-slate-400 text-sm">
                                <li>✓ Network exposure and firewall config</li>
                                <li>✓ Credential storage and secrets</li>
                                <li>✓ Plugin security and malicious code</li>
                                <li>✓ Tool permissions and sandboxing</li>
                                <li>✓ Logging and audit trails</li>
                                <li>✓ Compliance gaps (SOC 2, GDPR)</li>
                            </ul>
                        </div>

                        <div className="glass-card glass-base backdrop-blur-xl bg-white/5 border border-white/10 p-6 bg-green-500/10 border-green-500/20">
                            <h3 className="font-bold text-green-400 mb-2">🎁 Bonus: Free Security Checklist</h3>
                            <p className="text-slate-300 text-sm">
                                Everyone who books gets our 47-point OpenClaw Security Checklist (normally $299)
                            </p>
                        </div>

                        <div className="glass-card glass-base backdrop-blur-xl bg-white/5 border border-white/10 p-6">
                            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
                                Trusted by
                            </h3>
                            <div className="flex flex-wrap gap-4 items-center">
                                {CLIENT_LOGOS.map((logo) => (
                                    <span
                                        key={logo}
                                        className="text-slate-500 text-sm font-medium px-3 py-1.5 rounded bg-white/5"
                                    >
                                        {logo}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
