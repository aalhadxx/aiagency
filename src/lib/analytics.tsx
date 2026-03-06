'use client';

import React from 'react';
import { Analytics } from '@vercel/analytics/react';

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
    return (
        <React.Fragment>
            {children}
            <Analytics />
        </React.Fragment>
    );
}

// Custom event tracking
export function trackEvent(eventName: string, properties?: Record<string, any>) {
    if (typeof window !== 'undefined' && (window as any).va) {
        (window as any).va('track', eventName, properties);
    }
    
    // Log for development
    if (process.env.NODE_ENV === 'development') {
        console.log('Analytics Event:', eventName, properties);
    }
}

// Conversion tracking helpers
export const trackConversion = {
    newsletterSignup: (email: string) => {
        trackEvent('newsletter_signup', { email });
    },
    
    auditBooked: (company: string, timeline: string) => {
        trackEvent('audit_booked', { company, timeline });
    },
    
    contactFormSubmitted: (service: string) => {
        trackEvent('contact_form_submitted', { service });
    },
    
    blogPostViewed: (slug: string, title: string) => {
        trackEvent('blog_post_viewed', { slug, title });
    },
    
    ctaClicked: (type: string, location: string) => {
        trackEvent('cta_clicked', { type, location });
    },
};
