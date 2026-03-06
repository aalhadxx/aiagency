'use client';

import { useState } from 'react';

const MONTHLY_SERVICE_COST = 500; // Base managed service tier

export function ROICalculator() {
    const [hoursSaved, setHoursSaved] = useState(10);
    const [hourlyCost, setHourlyCost] = useState(75);

    const monthlySavings = hoursSaved * 4.33 * hourlyCost; // 4.33 weeks per month
    const netMonthly = monthlySavings - MONTHLY_SERVICE_COST;
    const breakEvenWeeks = monthlySavings > 0
        ? Math.ceil((MONTHLY_SERVICE_COST / monthlySavings) * 4.33)
        : null;

    return (
        <div>
            <div className="space-y-6 mb-6">
                <div>
                    <label className="block text-sm font-medium text-oc-cream-muted mb-2">
                        Hours saved per week
                    </label>
                    <input
                        type="range"
                        min={1}
                        max={40}
                        value={hoursSaved}
                        onChange={(e) => setHoursSaved(Number(e.target.value))}
                        className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-white/10 accent-oc-cyan"
                    />
                    <div className="flex justify-between text-sm text-oc-cream-muted mt-1">
                        <span>1</span>
                        <span className="font-bold text-oc-cream">{hoursSaved} hrs</span>
                        <span>40</span>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-oc-cream-muted mb-2">
                        Hourly cost ($)
                    </label>
                    <input
                        type="range"
                        min={25}
                        max={200}
                        step={5}
                        value={hourlyCost}
                        onChange={(e) => setHourlyCost(Number(e.target.value))}
                        className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-white/10 accent-oc-cyan"
                    />
                    <div className="flex justify-between text-sm text-oc-cream-muted mt-1">
                        <span>$25</span>
                        <span className="font-bold text-oc-cream">${hourlyCost}</span>
                        <span>$200</span>
                    </div>
                </div>
            </div>

            <div className="space-y-3 pt-6 border-t border-white/10">
                <div className="flex justify-between items-center">
                    <span className="text-oc-cream-muted">Monthly savings</span>
                    <span className="text-lg font-bold text-oc-cyan">
                        ${monthlySavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-oc-cream-muted">Service cost ($500/mo)</span>
                    <span className="text-lg font-bold text-oc-cream-muted">
                        -${MONTHLY_SERVICE_COST}
                    </span>
                </div>
                <div className="flex justify-between items-center pt-2">
                    <span className="font-semibold text-oc-cream">Net monthly</span>
                    <span className={`text-xl font-bold ${netMonthly >= 0 ? "text-oc-cyan" : "text-oc-coral"}`}>
                        {netMonthly >= 0 ? "+" : ""}$
                        {netMonthly.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                </div>
                {breakEvenWeeks !== null && monthlySavings > 0 && (
                    <p className="text-sm text-oc-cream-muted pt-2">
                        Break-even in <strong className="text-oc-cream">~{breakEvenWeeks} weeks</strong>
                    </p>
                )}
            </div>
        </div>
    );
}
