export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    quote:
      "OpenClaw Agency transformed our AI deployment. We went from exposed instances to SOC 2-ready infrastructure in under two weeks. Their security audit caught vulnerabilities we didn't know existed.",
    name: "Sarah Chen",
    role: "VP of Engineering",
    company: "FinTech Solutions",
    avatar: "/avatars/sarah-chen.jpg",
    rating: 5,
  },
  {
    id: "2",
    quote:
      "The custom agent they built handles 40% of our support tickets with zero security incidents. ROI paid for itself in 60 days. Best investment we've made in automation.",
    name: "Marcus Webb",
    role: "CTO",
    company: "ScaleOps",
    avatar: "/avatars/marcus-webb.jpg",
    rating: 5,
  },
  {
    id: "3",
    quote:
      "We were hesitant about OpenClaw after the headlines. OpenClaw Agency showed us exactly how to deploy safely—credential vaults, network isolation, the works. Now we run 12 agents in production.",
    name: "Elena Rodriguez",
    role: "Head of AI",
    company: "DataFlow Inc",
    avatar: "/avatars/elena-rodriguez.jpg",
    rating: 5,
  },
  {
    id: "4",
    quote:
      "Their managed service is worth every penny. We get proactive monitoring, instant incident response, and peace of mind. No more 3am security alerts.",
    name: "David Park",
    role: "Director of Infrastructure",
    company: "CloudNine",
    avatar: "/avatars/david-park.jpg",
    rating: 5,
  },
  {
    id: "5",
    quote:
      "The free audit alone was invaluable. They found 3 critical vulnerabilities in our setup and gave us a clear remediation path. We signed for the full deployment package the same week.",
    name: "Jennifer Walsh",
    role: "CISO",
    company: "SecureBank",
    avatar: "/avatars/jennifer-walsh.jpg",
    rating: 5,
  },
  {
    id: "6",
    quote:
      "Enterprise-grade AI without the enterprise headaches. OpenClaw Agency made autonomous agents feel as safe as any other SaaS we run. Highly recommend.",
    name: "James Okonkwo",
    role: "VP of Product",
    company: "InnovateLabs",
    avatar: "/avatars/james-okonkwo.jpg",
    rating: 5,
  },
];
