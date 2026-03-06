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
        <div className="p-6 rounded-2xl bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl border border-white/20 dark:border-slate-600/30 shadow-xl">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                ROI Calculator
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                See how quickly our services pay for themselves.
            </p>

            <div className="space-y-4 mb-6">
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Hours saved per week
                    </label>
                    <input
                        type="range"
                        min={1}
                        max={40}
                        value={hoursSaved}
                        onChange={(e) => setHoursSaved(Number(e.target.value))}
                        className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-slate-200 dark:bg-slate-600 accent-blue-600"
                    />
                    <div className="flex justify-between text-sm text-slate-500 dark:text-slate-400 mt-1">
                        <span>1</span>
                        <span className="font-bold text-slate-900 dark:text-white">{hoursSaved} hrs</span>
                        <span>40</span>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Hourly cost ($)
                    </label>
                    <input
                        type="range"
                        min={25}
                        max={200}
                        step={5}
                        value={hourlyCost}
                        onChange={(e) => setHourlyCost(Number(e.target.value))}
                        className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-slate-200 dark:bg-slate-600 accent-blue-600"
                    />
                    <div className="flex justify-between text-sm text-slate-500 dark:text-slate-400 mt-1">
                        <span>$25</span>
                        <span className="font-bold text-slate-900 dark:text-white">${hourlyCost}</span>
                        <span>$200</span>
                    </div>
                </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-200/50 dark:border-slate-600/50">
                <div className="flex justify-between items-center">
                    <span className="text-slate-600 dark:text-slate-400">Monthly savings</span>
                    <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                        ${monthlySavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-slate-600 dark:text-slate-400">Service cost ($500/mo)</span>
                    <span className="text-lg font-bold text-slate-700 dark:text-slate-300">
                        -${MONTHLY_SERVICE_COST}
                    </span>
                </div>
                <div className="flex justify-between items-center pt-2">
                    <span className="font-semibold text-slate-900 dark:text-white">Net monthly</span>
                    <span className={`text-xl font-bold ${netMonthly >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                        {netMonthly >= 0 ? '+' : ''}${netMonthly.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                </div>
                {breakEvenWeeks !== null && monthlySavings > 0 && (
                    <p className="text-sm text-slate-600 dark:text-slate-400 pt-2">
                        Break-even in <strong className="text-slate-900 dark:text-white">~{breakEvenWeeks} weeks</strong>
                    </p>
                )}
            </div>
        </div>
    );
}
