import Link from 'next/link';
import { Metadata } from 'next';
import { ServicesStickyCTA } from '@/components/ServicesStickyCTA';
import { ROICalculator } from '@/components/ROICalculator';
import { clients } from '@/data/clients';
import { caseStudies } from '@/data/case-studies';
import { testimonials } from '@/data/testimonials';
import { createPageMetadata } from '@/lib/metadata';
import { SEO } from '@/components/SEO';
import { getBreadcrumbSchema, getServiceSchema, getFAQSchema } from '@/lib/schema';

export const metadata: Metadata = createPageMetadata({
    title: 'Enterprise OpenClaw Services | Secure AI Agent Deployment',
    description: 'Professional OpenClaw implementation, security hardening, custom agent development, and managed services. Secure deployment from $5K, custom agents from $3K, audits from $2K.',
    path: '/services',
});

const SERVICES_FAQ = [
    { question: 'How do I know which service I need?', answer: "Book a free 30-minute audit. We'll assess your setup and recommend the right service—whether you're planning to deploy, already running OpenClaw, or need custom agents." },
    { question: "What's included in the free audit?", answer: "A 30-minute call where we review your current setup, identify critical vulnerabilities, and provide a prioritized action plan. You also get our 47-point Security Checklist." },
    { question: 'Can I combine multiple services?', answer: "Yes. Many clients start with a Security Audit, then move to Secure Deployment or Custom Agents, and add Managed Service for ongoing support. We'll design a package that fits your needs." },
    { question: "What if I'm not sure about the investment?", answer: "Start with the free audit. There's no commitment. We'll show you exactly what you need and what it costs. Clients typically see 3x ROI within 90 days—we can help you model the numbers." },
];

const CTA_ROW = (
    <div className="flex flex-col sm:flex-row gap-3 mt-6">
        <Link href="/book-audit" className="inline-flex justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-sm transition-colors">
            Book Free Audit →
        </Link>
        <Link href="/contact" className="inline-flex justify-center px-6 py-3 border-2 border-slate-300 dark:border-slate-600 hover:border-blue-500 text-slate-700 dark:text-slate-300 font-semibold rounded-lg text-sm transition-colors">
            Get Quote →
        </Link>
    </div>
);

export default function ServicesPage() {
    const serviceSchemas = [
        getServiceSchema({ name: 'Secure OpenClaw Deployment', description: 'Security hardening, network isolation, credential vaults, audit logging, and SOC 2-ready setup. 7-day implementation.', url: '/services', priceRange: '$5,000 - $15,000' }),
        getServiceSchema({ name: 'Custom Autonomous Agents', description: 'Multi-agent orchestration, custom skills, safety guardrails, human-in-the-loop approvals, and domain sandboxing.', url: '/services', priceRange: '$3,000 - $10,000 per agent' }),
        getServiceSchema({ name: 'Security Audit & Remediation', description: 'Vulnerability assessment, fix exposed instances, implement policy-based safety controls, and malicious plugin removal.', url: '/book-audit', priceRange: '$2,000 - $5,000' }),
        getServiceSchema({ name: 'Managed OpenClaw Service', description: 'Ongoing monitoring, updates, incident response, skill marketplace vetting, and performance optimization.', url: '/services', priceRange: '$500 - $2,000/month' }),
    ];
    const faqSchema = getFAQSchema(SERVICES_FAQ);
    const breadcrumbSchema = getBreadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }]);

    return (
        <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
            <SEO schemas={[breadcrumbSchema, ...serviceSchemas, faqSchema].filter(Boolean)} />
            <ServicesStickyCTA />
            <div className="container mx-auto px-4 py-24">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-5xl font-bold text-slate-900 dark:text-white mb-6">
                        Enterprise OpenClaw Services
                    </h1>
                    <p className="text-xl text-slate-600 dark:text-slate-300 mb-8">
                        Production-grade AI automation that enterprises can trust. All services include security hardening, compliance documentation, and ongoing support.
                    </p>

                    {/* Client Logos */}
                    <div className="mb-12 p-6 rounded-2xl bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl border border-white/20 dark:border-slate-600/30 shadow-lg">
                        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4 text-center">
                            Trusted by leading enterprises
                        </p>
                        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
                            {clients.slice(0, 8).map((client) => (
                                <div
                                    key={client.id}
                                    className="px-4 py-2 rounded-lg bg-white/50 dark:bg-slate-700/50 border border-slate-200/50 dark:border-slate-600/50 text-slate-600 dark:text-slate-400 font-medium text-sm hover:text-slate-900 dark:hover:text-white transition-colors"
                                >
                                    {client.name}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Trust Bar */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 mb-8 rounded-2xl bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl border border-white/20 dark:border-slate-600/30 shadow-lg">
                        <div className="text-center">
                            <div className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">50+</div>
                            <div className="text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">Secure Deployments</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400">3x ROI</div>
                            <div className="text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">Avg in 90 Days</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400">7 Days</div>
                            <div className="text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">To Production</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400">SOC 2</div>
                            <div className="text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">Compliant</div>
                        </div>
                    </div>

                    {/* Case Study Cards */}
                    <div className="mb-16">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Case Studies</h2>
                        <div className="grid md:grid-cols-3 gap-4">
                            {caseStudies.map((study) => (
                                <div
                                    key={study.id}
                                    className="p-5 rounded-2xl bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl border border-white/20 dark:border-slate-600/30 shadow-lg hover:border-blue-400/30 dark:hover:border-blue-500/30 transition-colors"
                                >
                                    <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">{study.client}</div>
                                    <h3 className="font-bold text-slate-900 dark:text-white mb-2">{study.title}</h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-3">{study.challenge}</p>
                                    <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{study.metric}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ROI Calculator */}
                    <div className="mb-16">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Calculate Your ROI</h2>
                        <div className="max-w-md">
                            <ROICalculator />
                        </div>
                    </div>

                    {/* Process Section */}
                    <div className="mb-16 p-8 rounded-2xl bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl border border-white/20 dark:border-slate-600/30 shadow-lg">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">How It Works</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            <div className="text-center">
                                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-blue-500/20 dark:bg-blue-500/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">1</div>
                                <h3 className="font-bold text-slate-900 dark:text-white mb-1">Book</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400">Free 30-min audit</p>
                            </div>
                            <div className="text-center">
                                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-blue-500/20 dark:bg-blue-500/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">2</div>
                                <h3 className="font-bold text-slate-900 dark:text-white mb-1">Call</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400">Discovery & assessment</p>
                            </div>
                            <div className="text-center">
                                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-blue-500/20 dark:bg-blue-500/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">3</div>
                                <h3 className="font-bold text-slate-900 dark:text-white mb-1">Proposal</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400">Custom scope & quote</p>
                            </div>
                            <div className="text-center">
                                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-blue-500/20 dark:bg-blue-500/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">4</div>
                                <h3 className="font-bold text-slate-900 dark:text-white mb-1">Start</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400">Deploy in 7 days</p>
                            </div>
                        </div>
                    </div>

                    {/* Comparison Table */}
                    <div className="mb-16 overflow-x-auto rounded-2xl bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl border border-white/20 dark:border-slate-600/30 shadow-lg">
                        <div className="px-6 pt-6 pb-4">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Compare Services</h2>
                        </div>
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-white/30 dark:bg-slate-700/30">
                                    <th className="text-left p-4 font-semibold text-slate-900 dark:text-white">Service</th>
                                    <th className="text-left p-4 font-semibold text-slate-900 dark:text-white">Best For</th>
                                    <th className="text-left p-4 font-semibold text-slate-900 dark:text-white">Starting From</th>
                                    <th className="text-left p-4 font-semibold text-slate-900 dark:text-white">Timeline</th>
                                </tr>
                            </thead>
                            <tbody className="text-slate-600 dark:text-slate-300">
                                <tr className="border-t border-slate-200 dark:border-slate-700">
                                    <td className="p-4 font-medium">Secure Deployment</td>
                                    <td className="p-4">Teams planning to deploy OpenClaw</td>
                                    <td className="p-4">$5,000</td>
                                    <td className="p-4">7 days</td>
                                </tr>
                                <tr className="border-t border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50">
                                    <td className="p-4 font-medium">Custom Agents</td>
                                    <td className="p-4">Teams needing custom workflows</td>
                                    <td className="p-4">$3,000/agent</td>
                                    <td className="p-4">2–4 weeks</td>
                                </tr>
                                <tr className="border-t border-slate-200 dark:border-slate-700">
                                    <td className="p-4 font-medium">Security Audit</td>
                                    <td className="p-4">Teams already running OpenClaw</td>
                                    <td className="p-4">$2,000</td>
                                    <td className="p-4">3–5 days</td>
                                </tr>
                                <tr className="border-t border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50">
                                    <td className="p-4 font-medium">Managed Service</td>
                                    <td className="p-4">Teams wanting ongoing support</td>
                                    <td className="p-4">$500/mo</td>
                                    <td className="p-4">Ongoing</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Service 1 */}
                    <div className="mb-16 p-8 bg-slate-50 dark:bg-slate-800 rounded-xl border-2 border-slate-200 dark:border-slate-700">
                        <div className="flex items-start gap-4 mb-4">
                            <div className="text-4xl">🔒</div>
                            <div>
                                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                                    Secure OpenClaw Deployment
                                </h2>
                                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                                    $5,000 – $15,000
                                </div>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Price depends on environment complexity and compliance scope</p>
                            </div>
                        </div>
                        <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">
                            Turn OpenClaw from banned software into enterprise-ready infrastructure. We implement military-grade security hardening and compliance controls.
                        </p>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">What's Included:</h3>
                        <ul className="space-y-2 text-slate-600 dark:text-slate-300 mb-6">
                            <li>✓ Network isolation and firewall configuration</li>
                            <li>✓ Credential vault integration (AWS Secrets Manager / HashiCorp Vault)</li>
                            <li>✓ Comprehensive audit logging (90-365 day retention)</li>
                            <li>✓ SOC 2-ready compliance documentation</li>
                            <li>✓ TLS 1.3 encryption and origin validation</li>
                            <li>✓ Tool permission sandboxing and domain allowlists</li>
                            <li>✓ 7-day implementation timeline</li>
                            <li>✓ 30-day post-deployment support</li>
                        </ul>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Deliverables:</h3>
                        <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                            <li>• Hardened OpenClaw installation</li>
                            <li>• Security architecture documentation</li>
                            <li>• Compliance checklist and audit evidence</li>
                            <li>• Runbook for operations team</li>
                        </ul>
                        {CTA_ROW}
                    </div>

                    {/* Service 2 */}
                    <div className="mb-16 p-8 rounded-2xl bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl border border-white/20 dark:border-slate-600/30 shadow-lg">
                        <div className="flex items-start gap-4 mb-4">
                            <div className="text-4xl">🤖</div>
                            <div>
                                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                                    Custom Autonomous Agents
                                </h2>
                                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                                    $3,000 – $10,000 per agent
                                </div>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Price depends on integrations, skills, and orchestration complexity</p>
                            </div>
                        </div>
                        <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">
                            Build intelligent agents that understand your business logic, execute complex workflows, and make decisions within safe boundaries.
                        </p>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Capabilities:</h3>
                        <ul className="space-y-2 text-slate-600 dark:text-slate-300 mb-6">
                            <li>✓ Custom skill development ($500–$2,000 per skill)</li>
                            <li>✓ Multi-agent orchestration ($5,000+)</li>
                            <li>✓ Human-in-the-loop approval workflows</li>
                            <li>✓ Safety guardrails and policy enforcement</li>
                            <li>✓ CRM/ERP/internal system integrations</li>
                            <li>✓ Browser automation with anti-detection</li>
                            <li>✓ API orchestration and data pipelines</li>
                        </ul>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Example Use Cases:</h3>
                        <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                            <li>• Lead qualification and enrichment agents</li>
                            <li>• Customer support with knowledge base RAG</li>
                            <li>• Document processing and data extraction</li>
                            <li>• Competitive intelligence gathering</li>
                            <li>• QA testing and monitoring</li>
                        </ul>
                        {CTA_ROW}
                    </div>

                    {/* Service 3 */}
                    <div className="mb-16 p-8 rounded-2xl bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl border border-white/20 dark:border-slate-600/30 shadow-lg">
                        <div className="flex items-start gap-4 mb-4">
                            <div className="text-4xl">🛡️</div>
                            <div>
                                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                                    Security Audit & Remediation
                                </h2>
                                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                                    $2,000 – $5,000
                                </div>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Price depends on scope of remediation and number of agents</p>
                            </div>
                        </div>
                        <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">
                            Already running OpenClaw? We'll find every vulnerability and fix them before bad actors do.
                        </p>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Assessment Includes:</h3>
                        <ul className="space-y-2 text-slate-600 dark:text-slate-300 mb-6">
                            <li>✓ Network exposure analysis</li>
                            <li>✓ Credential and secrets scanning</li>
                            <li>✓ Plugin marketplace vetting (remove malicious code)</li>
                            <li>✓ WebSocket security audit</li>
                            <li>✓ Tool permission review</li>
                            <li>✓ Logging and monitoring gaps</li>
                            <li>✓ Compliance readiness check</li>
                        </ul>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Remediation:</h3>
                        <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                            <li>• Fix all critical and high-severity issues</li>
                            <li>• Implement recommended security controls</li>
                            <li>• Provide prioritized remediation roadmap</li>
                            <li>• 90-day re-assessment included</li>
                        </ul>
                        {CTA_ROW}
                    </div>

                    {/* Service 4 */}
                    <div className="mb-16 p-8 rounded-2xl bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl border border-white/20 dark:border-slate-600/30 shadow-lg">
                        <div className="flex items-start gap-4 mb-4">
                            <div className="text-4xl">⚙️</div>
                            <div>
                                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                                    Managed OpenClaw Service
                                </h2>
                                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                                    $500 – $2,000/month
                                </div>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Choose tier based on number of agents and support level</p>
                            </div>
                        </div>
                        <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">
                            Focus on your business while we keep your AI infrastructure secure, updated, and optimized.
                        </p>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Monthly Services:</h3>
                        <ul className="space-y-2 text-slate-600 dark:text-slate-300 mb-6">
                            <li>✓ 24/7 monitoring and alerting</li>
                            <li>✓ Security patch management</li>
                            <li>✓ Incident response (4-hour SLA)</li>
                            <li>✓ Plugin vetting and safe updates</li>
                            <li>✓ Performance optimization</li>
                            <li>✓ Cost optimization (LLM usage analysis)</li>
                            <li>✓ Monthly security reports</li>
                            <li>✓ Quarterly strategy reviews</li>
                        </ul>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Tiers:</h3>
                        <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                            <li>• <strong>Essential ($500/mo):</strong> 1 agent, monitoring, updates</li>
                            <li>• <strong>Professional ($1,000/mo):</strong> 3 agents, priority support</li>
                            <li>• <strong>Enterprise ($2,000/mo):</strong> 10+ agents, dedicated engineer, SLA</li>
                        </ul>
                        {CTA_ROW}
                    </div>

                    {/* FAQ */}
                    <div className="mb-16">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Frequently Asked Questions</h2>
                        <div className="space-y-4">
                            <details className="group p-4 rounded-xl bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl border border-white/20 dark:border-slate-600/30 shadow-lg">
                                <summary className="font-semibold text-slate-900 dark:text-white cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                                    How do I know which service I need?
                                </summary>
                                <p className="mt-3 text-slate-600 dark:text-slate-300">
                                    Book a free 30-minute audit. We'll assess your setup and recommend the right service—whether you're planning to deploy, already running OpenClaw, or need custom agents.
                                </p>
                            </details>
                            <details className="group p-4 rounded-xl bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl border border-white/20 dark:border-slate-600/30 shadow-lg">
                                <summary className="font-semibold text-slate-900 dark:text-white cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                                    What's included in the free audit?
                                </summary>
                                <p className="mt-3 text-slate-600 dark:text-slate-300">
                                    A 30-minute call where we review your current setup, identify critical vulnerabilities, and provide a prioritized action plan. You also get our 47-point Security Checklist.
                                </p>
                            </details>
                            <details className="group p-4 rounded-xl bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl border border-white/20 dark:border-slate-600/30 shadow-lg">
                                <summary className="font-semibold text-slate-900 dark:text-white cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                                    Can I combine multiple services?
                                </summary>
                                <p className="mt-3 text-slate-600 dark:text-slate-300">
                                    Yes. Many clients start with a Security Audit, then move to Secure Deployment or Custom Agents, and add Managed Service for ongoing support. We'll design a package that fits your needs.
                                </p>
                            </details>
                            <details className="group p-4 rounded-xl bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl border border-white/20 dark:border-slate-600/30 shadow-lg">
                                <summary className="font-semibold text-slate-900 dark:text-white cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                                    What if I'm not sure about the investment?
                                </summary>
                                <p className="mt-3 text-slate-600 dark:text-slate-300">
                                    Start with the free audit. There's no commitment. We'll show you exactly what you need and what it costs. Clients typically see 3x ROI within 90 days—we can help you model the numbers.
                                </p>
                            </details>
                        </div>
                    </div>

                    {/* Testimonials */}
                    <div className="mb-16">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">What Clients Say</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {testimonials.slice(0, 4).map((t) => (
                                <div
                                    key={t.id}
                                    className="p-6 rounded-2xl bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl border border-white/20 dark:border-slate-600/30 shadow-lg"
                                >
                                    <p className="text-slate-700 dark:text-slate-300 italic mb-4">"{t.quote}"</p>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-blue-500/20 dark:bg-blue-500/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-sm">
                                            {t.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div>
                                            <div className="font-semibold text-slate-900 dark:text-white">{t.name}</div>
                                            <div className="text-sm text-slate-600 dark:text-slate-400">{t.role}, {t.company}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="text-center p-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white border border-white/20 shadow-xl backdrop-blur-sm">
                        <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
                        <p className="text-xl mb-8 opacity-90">
                            Book a free 30-minute consultation—we'll assess your needs and recommend the right service. No commitment.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link 
                                href="/book-audit"
                                className="px-8 py-4 bg-white hover:bg-slate-100 text-blue-600 font-bold rounded-lg transition-all"
                            >
                                Book Free Consultation →
                            </Link>
                            <Link 
                                href="/contact"
                                className="px-8 py-4 bg-transparent hover:bg-white/10 border-2 border-white text-white font-bold rounded-lg transition-all"
                            >
                                Get a Custom Quote
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
