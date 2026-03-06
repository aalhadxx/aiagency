import React from 'react';

export function WaitlistWrapper({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full max-w-4xl mx-auto px-6 py-12 md:py-20">
            {children}
        </div>
    );
}
