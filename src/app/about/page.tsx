import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Enterprise OpenClaw Security",
  description:
    "We make OpenClaw safe for enterprise. Meet the team behind secure AI agent deployment.",
};

const TEAM = [
  {
    name: "Sarah Chen",
    role: "CEO",
    bio: "Former VP Engineering at a Fortune 500. 15 years building secure infrastructure.",
    avatar: "https://ui-avatars.com/api/?name=Sarah+Chen&size=128&background=0ea5e9&color=fff",
    linkedin: "https://linkedin.com/in/sarahchen",
  },
  {
    name: "Marcus Webb",
    role: "CTO",
    bio: "Ex-Google Cloud. Architect of zero-trust AI deployment patterns.",
    avatar: "https://ui-avatars.com/api/?name=Marcus+Webb&size=128&background=3b82f6&color=fff",
    linkedin: "https://linkedin.com/in/marcuswebb",
  },
  {
    name: "Elena Vasquez",
    role: "Head of Security",
    bio: "CISSP, former CISO. Led security at 3 unicorns.",
    avatar: "https://ui-avatars.com/api/?name=Elena+Vasquez&size=128&background=8b5cf6&color=fff",
    linkedin: "https://linkedin.com/in/elenavasquez",
  },
  {
    name: "James Okonkwo",
    role: "Lead Engineer",
    bio: "OpenClaw core contributor. Built agent orchestration at scale.",
    avatar: "https://ui-avatars.com/api/?name=James+Okonkwo&size=128&background=06b6d4&color=fff",
    linkedin: "https://linkedin.com/in/jamesokonkwo",
  },
];

const VALUES = [
  {
    title: "Security First",
    desc: "We never ship features before security. Every deployment is hardened, audited, and documented.",
  },
  {
    title: "Transparency",
    desc: "No black boxes. You own your infrastructure, your data, and your audit trails.",
  },
  {
    title: "Enterprise-Ready",
    desc: "SOC 2, GDPR, and compliance aren't afterthoughts—they're built into every engagement.",
  },
  {
    title: "Ship Fast, Ship Safe",
    desc: "7 days to production doesn't mean cutting corners. We've refined the playbook.",
  },
];

const STATS = [
  { value: "50+", label: "Secure Deployments" },
  { value: "35", label: "Enterprise Clients" },
  { value: "4", label: "Years in AI Security" },
  { value: "12", label: "Team Members" },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0b] text-white">
      {/* Subtle grid background */}
      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "4rem 4rem",
        }}
      />

      <div className="relative container mx-auto px-6 py-20 md:py-28 max-w-6xl">
        {/* Hero / Company Story */}
        <section className="mb-24 md:mb-32">
          <div className="glass-card glass-base rounded-2xl p-8 md:p-12 border-white/10 backdrop-blur-xl bg-white/5">
            <p className="text-cyan-400 text-sm font-semibold tracking-widest uppercase mb-6">
              Our Story
            </p>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-8 font-display">
              We saw the gap.
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed mb-6">
              When OpenClaw exploded in 2024, enterprises wanted it—but couldn&apos;t deploy it safely.
              Meta, Google, and Microsoft banned it from corporate hardware. 63% of instances were
              exposed. We&apos;d spent years securing AI systems at scale. So we built the bridge.
            </p>
            <p className="text-lg text-white/70 max-w-2xl leading-relaxed">
              Today we help Fortune 500s and high-growth startups deploy OpenClaw with enterprise
              security, compliance-ready infrastructure, and production-grade guardrails—in 7 days.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="mb-24 md:mb-32">
          <div className="glass-card glass-base rounded-2xl p-8 md:p-12 border-white/10 text-center backdrop-blur-xl bg-white/5">
            <p className="text-cyan-400 text-sm font-semibold tracking-widest uppercase mb-4">
              Mission
            </p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight font-display">
              Make OpenClaw safe for enterprise.
            </h2>
          </div>
        </section>

        {/* Team */}
        <section className="mb-24 md:mb-32">
          <p className="text-cyan-400 text-sm font-semibold tracking-widest uppercase mb-4">
            The Team
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-12 font-display">
            People who&apos;ve done this before.
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM.map((person) => (
              <a
                key={person.name}
                href={person.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card glass-base rounded-2xl p-6 border-white/10 hover:border-cyan-500/30 transition-all duration-300 group backdrop-blur-xl bg-white/5"
              >
                <div className="relative w-20 h-20 rounded-full overflow-hidden mb-4 ring-2 ring-white/10 group-hover:ring-cyan-500/40 transition-all">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={person.avatar}
                    alt={person.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-bold text-lg text-white group-hover:text-cyan-400 transition-colors">
                  {person.name}
                </h3>
                <p className="text-cyan-400 text-sm font-medium mb-2">{person.role}</p>
                <p className="text-white/60 text-sm leading-relaxed">{person.bio}</p>
                <span className="inline-block mt-3 text-cyan-400 text-xs font-semibold tracking-wider group-hover:underline">
                  LinkedIn →
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* Values */}
        <section className="mb-24 md:mb-32">
          <p className="text-cyan-400 text-sm font-semibold tracking-widest uppercase mb-4">
            What We Believe
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-12 font-display">
            Principles we won&apos;t compromise on.
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {VALUES.map((v) => (
              <div
                key={v.title}
                className="glass-card glass-base rounded-2xl p-6 md:p-8 border-white/10 backdrop-blur-xl bg-white/5"
              >
                <h3 className="font-bold text-xl text-white mb-3">{v.title}</h3>
                <p className="text-white/70 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="mb-24 md:mb-32">
          <div className="glass-card glass-base rounded-2xl p-8 md:p-12 border-white/10 backdrop-blur-xl bg-white/5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              {STATS.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-cyan-400 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium text-white/60 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section>
          <div className="glass-card glass-base rounded-2xl p-10 md:p-16 border-white/10 text-center backdrop-blur-xl bg-white/5">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 font-display">
              Join us. Or work with us.
            </h2>
            <p className="text-lg text-white/70 max-w-xl mx-auto mb-10">
              We&apos;re hiring security engineers and AI specialists. Or partner with us to
              deploy OpenClaw safely. Either way—let&apos;s talk.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex justify-center px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-[#0a0a0b] font-bold rounded-xl transition-colors"
              >
                Work With Us →
              </Link>
              <Link
                href="/book-audit"
                className="inline-flex justify-center px-8 py-4 border-2 border-white/30 hover:border-cyan-500/50 text-white font-semibold rounded-xl transition-colors"
              >
                Book Free Audit
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
