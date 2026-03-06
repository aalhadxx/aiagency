import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'contact@aiagency.com';

export async function POST(request: NextRequest) {
    try {
        const { name, email, company, service, message } = await request.json();

        if (!name?.trim?.()) {
            return NextResponse.json({ error: 'Name is required' }, { status: 400 });
        }
        if (!email?.trim?.() || !email.includes('@')) {
            return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
        }
        if (!service?.trim?.()) {
            return NextResponse.json({ error: 'Please select a service' }, { status: 400 });
        }
        if (!message?.trim?.()) {
            return NextResponse.json({ error: 'Message is required' }, { status: 400 });
        }

        if (!resend) {
            console.log('[Contact] RESEND_API_KEY not configured - logging only:', { name, email, company, service, message });
            return NextResponse.json(
                { success: true, message: 'Message received. We\'ll respond shortly.' }
            );
        }

        await resend.emails.send({
            from: 'AI Agency <onboarding@resend.dev>',
            to: CONTACT_EMAIL,
            replyTo: email,
            subject: `Contact: ${service} - ${name}`,
            html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Company:</strong> ${company || '(not provided)'}</p>
                <p><strong>Service:</strong> ${service}</p>
                <h3>Message:</h3>
                <p>${message.replace(/\n/g, '<br>')}</p>
            `,
        });

        return NextResponse.json({ success: true, message: 'Message sent successfully!' });
    } catch (error: unknown) {
        console.error('Contact form error:', error);
        return NextResponse.json(
            { error: 'Failed to send message. Please try again.' },
            { status: 500 }
        );
    }
}
