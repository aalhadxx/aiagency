import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || "contact@aiagency.com";

export async function POST(request: NextRequest) {
  try {
    const { name, email, company, currentSetup, timeline } = await request.json();

    if (!name?.trim?.()) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    if (!email?.trim?.() || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }
    if (!company?.trim?.()) {
      return NextResponse.json({ error: "Company is required" }, { status: 400 });
    }
    if (!currentSetup?.trim?.()) {
      return NextResponse.json({ error: "Please select your current setup" }, { status: 400 });
    }
    if (!timeline?.trim?.()) {
      return NextResponse.json({ error: "Please select a timeline" }, { status: 400 });
    }

    if (!resend) {
      console.log("[Audit] RESEND_API_KEY not configured - logging only:", {
        name,
        email,
        company,
        currentSetup,
        timeline,
      });
      return NextResponse.json({
        success: true,
        message: "Audit booked. We'll confirm within 1 hour.",
      });
    }

    await resend.emails.send({
      from: "AI Agency <onboarding@resend.dev>",
      to: CONTACT_EMAIL,
      replyTo: email,
      subject: `Free Audit Request: ${company} - ${name}`,
      html: `
        <h2>New Free Security Audit Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Current Setup:</strong> ${currentSetup}</p>
        <p><strong>Timeline:</strong> ${timeline}</p>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Audit booked successfully! Check your email for confirmation.",
    });
  } catch (error: unknown) {
    console.error("Audit form error:", error);
    return NextResponse.json(
      { error: "Failed to book audit. Please try again." },
      { status: 500 }
    );
  }
}
