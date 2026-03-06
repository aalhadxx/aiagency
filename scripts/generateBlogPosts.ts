const BLOG_POST_TOPICS = [
    {
        topic: "How to Deploy OpenClaw Securely in Enterprise Environments 2026",
        keywords: ["OpenClaw security", "enterprise deployment", "AI agent safety"],
        targetAudience: "CTOs and DevOps engineers",
        contentType: "tutorial" as const,
    },
    {
        topic: "Why Meta, Google, and Microsoft Banned OpenClaw (And How to Fix It)",
        keywords: ["OpenClaw banned", "OpenClaw vulnerabilities", "AI security"],
        targetAudience: "security teams and IT leaders",
        contentType: "analysis" as const,
    },
    {
        topic: "OpenClaw Security Audit Checklist: 47 Critical Points",
        keywords: ["OpenClaw audit", "security checklist", "compliance"],
        targetAudience: "security professionals",
        contentType: "listicle" as const,
    },
    {
        topic: "OpenClaw vs Selenium vs Puppeteer: Which Browser Automation Tool in 2026",
        keywords: ["browser automation", "OpenClaw comparison", "web scraping"],
        targetAudience: "developers and engineers",
        contentType: "comparison" as const,
    },
    {
        topic: "How We Secured 50+ OpenClaw Deployments Without a Single Incident",
        keywords: ["OpenClaw implementation", "security case study", "enterprise AI"],
        targetAudience: "enterprise decision makers",
        contentType: "case-study" as const,
    },
    {
        topic: "The Complete Guide to OpenClaw Safety Guardrails and Policy Enforcement",
        keywords: ["AI safety guardrails", "OpenClaw policy", "autonomous agents"],
        targetAudience: "AI engineers and compliance teams",
        contentType: "tutorial" as const,
    },
    {
        topic: "7 Critical OpenClaw Vulnerabilities You Must Fix Immediately",
        keywords: ["OpenClaw vulnerabilities", "CVE", "security risks"],
        targetAudience: "security engineers",
        contentType: "listicle" as const,
    },
    {
        topic: "OpenClaw Cost Analysis: Hidden Expenses in 2026",
        keywords: ["OpenClaw pricing", "LLM costs", "infrastructure costs"],
        targetAudience: "budget owners and CTOs",
        contentType: "analysis" as const,
    },
    {
        topic: "Building Production-Ready AI Agents with OpenClaw: A Technical Guide",
        keywords: ["AI agents", "OpenClaw development", "autonomous systems"],
        targetAudience: "AI engineers and developers",
        contentType: "tutorial" as const,
    },
    {
        topic: "OpenClaw Plugin Marketplace: How to Identify Malicious Code",
        keywords: ["OpenClaw plugins", "ClawHub security", "malware detection"],
        targetAudience: "developers and security teams",
        contentType: "tutorial" as const,
    },
];

async function generateBlogPosts() {
    const apiKey = process.env.CONTENT_API_KEY;
    const apiUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    console.log('🚀 Starting blog post generation...\n');

    for (const [index, postData] of BLOG_POST_TOPICS.entries()) {
        console.log(`📝 Generating post ${index + 1}/${BLOG_POST_TOPICS.length}: ${postData.topic}`);

        try {
            const response = await fetch(`${apiUrl}/api/content/generate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-KEY': apiKey!,
                },
                body: JSON.stringify({
                    ...postData,
                    author: 'AI Agency Team',
                }),
            });

            const result = await response.json();

            if (response.ok) {
                console.log(`✓ Success: ${result.title}`);
                console.log(`  URL: ${result.url}`);
                console.log(`  File: ${result.filePath}\n`);
            } else {
                console.error(`✗ Failed: ${result.error}`);
                if (result.details) {
                    console.error(`  Details: ${result.details}\n`);
                }
            }

            // Wait 2 seconds between posts to avoid rate limiting
            if (index < BLOG_POST_TOPICS.length - 1) {
                await new Promise(resolve => setTimeout(resolve, 2000));
            }

        } catch (error: any) {
            console.error(`✗ Error generating post: ${error.message}\n`);
        }
    }

    console.log('\n🎉 Blog post generation complete!');
}

// Check if running as script
if (require.main === module) {
    generateBlogPosts().catch(console.error);
}

export { generateBlogPosts, BLOG_POST_TOPICS };
