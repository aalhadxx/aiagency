import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Only instantiate Resend if API key is available
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request: NextRequest) {
    try {
        const { email } = await request.json();

        if (!email || !email.includes('@')) {
            return NextResponse.json(
                { error: 'Valid email required' },
                { status: 400 }
            );
        }

        // Check if Resend is configured
        if (!resend) {
            console.warn('RESEND_API_KEY not configured - logging signup only');
            console.log('Newsletter signup:', email);
            
            return NextResponse.json({
                success: true,
                message: 'Subscribed successfully! (Email service not configured - contact admin)',
            });
        }

        // Add to Resend audience
        const audienceId = process.env.RESEND_AUDIENCE_ID;

        if (!audienceId) {
            console.warn('RESEND_AUDIENCE_ID not configured');
            console.log('Newsletter signup:', email);
            
            return NextResponse.json({
                success: true,
                message: 'Subscribed successfully!',
            });
        }

        // Add contact to audience
        const response = await resend.contacts.create({
            email,
            audienceId,
        });

        // Send welcome email
        await resend.emails.send({
            from: 'newsletter@yourdomain.com',
            to: email,
            subject: 'Welcome to AI Agency Newsletter',
            html: `
                <h1>Welcome! 🎉</h1>
                <p>Thanks for subscribing to our newsletter. You'll receive weekly insights on:</p>
                <ul>
                    <li>AI automation best practices</li>
                    <li>OpenClaw security updates</li>
                    <li>Implementation guides</li>
                    <li>Industry trends</li>
                </ul>
                <p>Your first newsletter will arrive next week.</p>
                <p><strong>Bonus:</strong> Download our <a href="${process.env.NEXT_PUBLIC_SITE_URL}/resources/openclaw-security-checklist">OpenClaw Security Checklist</a></p>
            `,
        });

        return NextResponse.json({
            success: true,
            message: 'Subscribed successfully! Check your email to confirm.',
        });

    } catch (error: any) {
        console.error('Newsletter subscription error:', error);
        
        // Handle duplicate email
        if (error.message?.includes('already exists')) {
            return NextResponse.json(
                { error: 'Email already subscribed' },
                { status: 409 }
            );
        }

        return NextResponse.json(
            { error: 'Subscription failed. Please try again.' },
            { status: 500 }
        );
    }
}

export async function GET(request: NextRequest) {
    return NextResponse.json({
        message: 'Newsletter Subscription API',
        endpoint: 'POST /api/newsletter/subscribe',
        requiredFields: ['email'],
        configured: !!resend,
    });
}
