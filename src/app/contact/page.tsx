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

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        service: '',
        message: '',
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
        if (!formData.service) next.service = 'Please select a service';
        if (!formData.message.trim()) next.message = 'Message is required';
        setErrors(next);
        return Object.keys(next).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await res.json();

            if (!res.ok) {
                setSubmitError(data.error || 'Something went wrong. Please try again.');
                return;
            }

            trackConversion.contactFormSubmitted(formData.service);
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
                    <div className="text-5xl mb-6">✓</div>
                    <h1 className="text-2xl font-bold text-white mb-4">Thanks for reaching out!</h1>
                    <p className="text-slate-300 mb-8">
                        We'll get back to you within 24 hours. Check your email for confirmation.
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
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Stats bar */}
                <div className="glass-card glass-base backdrop-blur-xl bg-white/5 border border-white/10 flex flex-wrap justify-center gap-8 md:gap-12 py-6 px-6 mb-12">
                    {STATS.map((stat) => (
                        <div key={stat.label} className="text-center">
                            <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                            <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">{stat.label}</div>
                        </div>
                    ))}
                </div>

                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Let's Talk Strategy</h1>
                <p className="text-xl text-slate-400 mb-12">
                    Tell us about your requirements and we'll design a custom implementation plan.
                </p>

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
                                    Company <span className="text-slate-500">(optional)</span>
                                </label>
                                <input
                                    type="text"
                                    id="company"
                                    name="company"
                                    value={formData.company}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                    placeholder="Your company"
                                />
                            </div>

                            <div>
                                <label htmlFor="service" className="block text-sm font-medium text-slate-300 mb-1.5">
                                    Service *
                                </label>
                                <select
                                    id="service"
                                    name="service"
                                    required
                                    value={formData.service}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 rounded-lg bg-white/5 border text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 ${
                                        errors.service ? 'border-red-500' : 'border-white/10'
                                    }`}
                                >
                                    <option value="">Select a service...</option>
                                    <option value="deployment">Secure OpenClaw Deployment</option>
                                    <option value="agents">Custom Autonomous Agents</option>
                                    <option value="audit">Security Audit & Remediation</option>
                                    <option value="managed">Managed Service</option>
                                    <option value="consultation">General Consultation</option>
                                </select>
                                {errors.service && <p className="mt-1 text-sm text-red-400">{errors.service}</p>}
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-1.5">
                                    Message *
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    rows={3}
                                    value={formData.message}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 rounded-lg bg-white/5 border text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none ${
                                        errors.message ? 'border-red-500' : 'border-white/10'
                                    }`}
                                    placeholder="What are you trying to achieve?"
                                />
                                {errors.message && <p className="mt-1 text-sm text-red-400">{errors.message}</p>}
                            </div>

                            {submitError && (
                                <p className="text-sm text-red-400 bg-red-500/10 rounded-lg px-4 py-2">{submitError}</p>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full px-8 py-4 bg-blue-600 hover:bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-colors"
                            >
                                {loading ? 'Sending...' : 'Send Message →'}
                            </button>

                            <p className="text-xs text-slate-500 text-center">
                                We'll only use your info to respond. No spam, ever.
                            </p>
                        </form>
                    </div>

                    {/* Trust signals */}
                    <div className="space-y-6">
                        <div className="glass-card glass-base backdrop-blur-xl bg-white/5 border border-white/10 p-6">
                            <h3 className="text-lg font-bold text-white mb-4">Prefer email?</h3>
                            <p className="text-slate-300">
                                📧 <a href="mailto:contact@aiagency.com" className="text-blue-400 hover:underline">contact@aiagency.com</a>
                            </p>
                            <p className="text-slate-500 text-sm mt-2">Mon–Fri 9am–6pm EST</p>
                        </div>

                        {TESTIMONIALS.map((t, i) => (
                            <div key={i} className="glass-card glass-base backdrop-blur-xl bg-white/5 border border-white/10 p-6">
                                <p className="text-slate-300 italic mb-3">"{t.quote}"</p>
                                <div className="font-medium text-white">— {t.author}, {t.company}</div>
                            </div>
                        ))}

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
