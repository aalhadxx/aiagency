"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Star } from "lucide-react";
import type { Testimonial } from "@/data/testimonials";
import { cn } from "@/lib/utils";
import { OptimizedImage } from "@/components/performance/OptimizedImage";

interface TestimonialCardProps {
  testimonial: Testimonial;
  className?: string;
  /** @deprecated Use ScrollReveal delay instead. Kept for API compatibility. */
  delay?: number;
}

export function TestimonialCard({ testimonial, className }: TestimonialCardProps) {
  const initials = testimonial.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <article
      className={cn(
        "glass-card glass-transition p-6 md:p-8 flex flex-col h-full",
        "hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/20",
        className
      )}
    >
      {/* Rating */}
      <div className="flex gap-1 mb-4">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star
            key={i}
            className="w-4 h-4 fill-amber-400 text-amber-400"
            aria-hidden
          />
        ))}
      </div>

      {/* Quote */}
      <blockquote className="flex-1 text-foreground/90 text-base md:text-lg leading-relaxed mb-6">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>

      {/* Author */}
      <footer className="flex items-center gap-4">
        <Avatar className="h-12 w-12 rounded-full border-2 border-white/20 dark:border-slate-600/50 overflow-hidden shrink-0">
          <AvatarImage asChild>
            <OptimizedImage
              src={testimonial.avatar}
              alt={testimonial.name}
              width={48}
              height={48}
              className="object-cover h-full w-full"
              withBlur
            />
          </AvatarImage>
          <AvatarFallback className="bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-sm font-medium">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold text-foreground">{testimonial.name}</p>
          <p className="text-sm text-muted-foreground">
            {testimonial.role} at {testimonial.company}
          </p>
        </div>
      </footer>
    </article>
  );
}
