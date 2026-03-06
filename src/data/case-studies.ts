export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string[];
  metric?: string; // e.g. "3x ROI", "40% reduction"
}

export const caseStudies: CaseStudy[] = [
  {
    id: "1",
    title: "From Exposed to SOC 2 in 14 Days",
    client: "FinTech Solutions",
    industry: "Financial Services",
    challenge:
      "FinTech Solutions had 8 OpenClaw instances exposed to the internet with default credentials. A security scan flagged critical RCE vulnerabilities. They needed immediate remediation and compliance readiness for enterprise customers.",
    solution:
      "OpenClaw Agency performed an emergency audit, isolated all instances behind a private network, migrated credentials to HashiCorp Vault, and implemented audit logging. We delivered SOC 2 Type II documentation and hardening guides.",
    results: [
      "Zero critical vulnerabilities in 72-hour re-scan",
      "SOC 2 Type II certification achieved in 90 days",
      "7-day deployment timeline for new secure instances",
    ],
    metric: "14 days",
  },
  {
    id: "2",
    title: "40% Support Automation with Zero Incidents",
    client: "ScaleOps",
    industry: "SaaS / B2B",
    challenge:
      "ScaleOps support team was overwhelmed with repetitive tickets. They wanted to deploy AI agents but were concerned about security, data leakage, and malicious plugin risks after the OpenClaw ban headlines.",
    solution:
      "We built 3 custom autonomous agents with domain sandboxing, human-in-the-loop for sensitive actions, and a curated skill set. All agents run in isolated containers with strict egress controls and audit trails.",
    results: [
      "40% of tier-1 tickets resolved by agents",
      "Zero security incidents in 6 months",
      "3x ROI within 90 days",
    ],
    metric: "40%",
  },
  {
    id: "3",
    title: "12 Production Agents, Enterprise-Grade Security",
    client: "DataFlow Inc",
    industry: "Data & Analytics",
    challenge:
      "DataFlow needed to scale AI automation across multiple teams—data pipelines, reporting, and customer analytics. Their existing OpenClaw setup had no central governance, inconsistent security, and no audit trail.",
    solution:
      "OpenClaw Agency designed a centralized deployment with role-based access, credential vaults per environment, and a unified audit dashboard. We migrated 12 agents to the new infrastructure with zero downtime.",
    results: [
      "12 agents in production with full audit compliance",
      "Single pane of glass for monitoring and governance",
      "Managed service for ongoing updates and incident response",
    ],
    metric: "12 agents",
  },
  {
    id: "4",
    title: "Zero Trust Architecture for Regulated Industry",
    client: "SecureBank",
    industry: "Financial Services",
    challenge:
      "SecureBank needed to deploy AI agents for customer onboarding while meeting strict regulatory requirements. Their compliance team had rejected previous OpenClaw deployments due to security concerns.",
    solution:
      "We implemented a zero-trust architecture with mTLS, hardware security modules for credential storage, and full audit logging with 7-year retention. Every agent action is traceable and policy-enforced.",
    results: [
      "Passed internal security review in 3 weeks",
      "Zero compliance findings in first audit",
      "Reduced onboarding time by 60%",
    ],
    metric: "60%",
  },
];
