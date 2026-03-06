"use client";

import { cn } from "@/lib/utils";
import { forwardRef } from "react";

const inputBase =
  "w-full px-4 py-3 rounded-lg border bg-oc-surface text-oc-cream placeholder-oc-cream-muted/60 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-oc-cyan/30 focus:border-oc-cyan/50 disabled:opacity-50 disabled:cursor-not-allowed";

export const Input = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { error?: boolean }
>(({ className, error, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      inputBase,
      "border-oc-border",
      error && "border-oc-coral focus:ring-oc-coral/30 focus:border-oc-coral/50",
      className
    )}
    {...props}
  />
));

Input.displayName = "Input";

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & { error?: boolean }
>(({ className, error, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      inputBase,
      "resize-none min-h-[120px]",
      "border-oc-border",
      error && "border-oc-coral focus:ring-oc-coral/30 focus:border-oc-coral/50",
      className
    )}
    {...props}
  />
));

Textarea.displayName = "Textarea";

export const Select = forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement> & { error?: boolean }
>(({ className, error, children, ...props }, ref) => (
  <select
    ref={ref}
    className={cn(
      inputBase,
      "appearance-none cursor-pointer",
      "border-oc-border",
      error && "border-oc-coral focus:ring-oc-coral/30 focus:border-oc-coral/50",
      className
    )}
    {...props}
  >
    {children}
  </select>
));

Select.displayName = "Select";
