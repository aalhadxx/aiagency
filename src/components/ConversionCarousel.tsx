"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const SLIDES = [
  {
    id: "launch",
    badge: "Launching March 2026",
    headline: "We implement AI solutions. OpenClaw is one of many.",
    subtext:
      "Zero clients yet. That means you get our full attention, founder-level commitment, and a partnership—not a ticket number. We build what enterprises actually want.",
    cta: "Be our first",
    href: "/book-audit",
  },
  {
    id: "privacy-local",
    badge: "Privacy & local hosting",
    headline: "Sell privacy. Use your existing hardware. Zero data leaves your network.",
    subtext:
      "On-premise, air-gapped, or self-hosted LLMs. HIPAA, GDPR, SOC 2 by design. Deploy on in-house GPUs and servers—maximize ROI on infrastructure you already own. 52–75% savings vs cloud.",
    cta: "Explore local AI",
    href: "/services",
  },
  {
    id: "why-openclaw",
    badge: "1 of 50 viral use cases",
    headline: "OpenClaw: trending, banned, 42K+ exposed. We fix it.",
    subtext:
      "Enterprises want autonomous AI agents. OpenClaw delivers—but default configs are a security nightmare. We fix that. Network isolation, credential vaults, audit trails. Production-ready in 7 days.",
    cta: "See OpenClaw security",
    href: "/services",
  },
  {
    id: "what-we-deliver",
    badge: "What we build",
    headline: "50 viral use cases. RAG, voice agents, automation, dev tools. You pick.",
    subtext:
      "Customer service agents, AI voice, RAG knowledge bases, coding copilots, document automation, privacy-first local AI. We can build anything in applied AI. OpenClaw is one viral use case—we do them all.",
    cta: "View all 50 use cases",
    href: "/services",
  },
  {
    id: "early-adopter",
    badge: "Early adopter offer",
    headline: "First 100 clients by end of March. Priority access.",
    subtext:
      "Early adopters get: extended post-deployment support, direct founder access, and locked-in pricing. We're hungry. We're proving ourselves. You'll be in the case study.",
    cta: "Claim your spot",
    href: "/book-audit",
  },
  {
    id: "technical",
    badge: "No BS. Real credentials.",
    headline: "Military-grade security. SOC 2-ready. 7-day implementation.",
    subtext:
      "Network isolation, credential vaults (AWS Secrets Manager / HashiCorp Vault), 90–365 day audit logging, plugin vetting, tool sandboxing. We don't oversell—we deliver.",
    cta: "Book free audit",
    href: "/book-audit",
  },
  {
    id: "build-together",
    badge: "Let's build",
    headline: "You have the problem. We have the playbook.",
    subtext:
      "Whether it's OpenClaw, local AI, voice agents, RAG, or something else—we'll assess your setup, identify the right use case, and give you a clear path. Free 30-minute consultation. No obligation.",
    cta: "Book free audit",
    href: "/book-audit",
  },
];

export function ConversionCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    skipSnaps: false,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-4">
              {SLIDES.map((slide) => (
                <div
                  key={slide.id}
                  className="flex-[0_0_100%] min-w-0 pl-4"
                >
                  <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 md:p-12 lg:p-16 min-h-[380px] md:min-h-[420px] flex flex-col justify-between">
                    <div>
                      <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-oc-cyan/30 bg-oc-cyan/10 text-oc-cyan text-xs font-semibold uppercase tracking-wider mb-6">
                        {slide.badge}
                      </span>
                      <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-oc-cream mb-6">
                        {slide.headline}
                      </h2>
                      <p className="text-lg text-oc-cream-muted leading-relaxed max-w-2xl">
                        {slide.subtext}
                      </p>
                    </div>
                    <div className="mt-10">
                      <Link
                        href={slide.href}
                        className="btn-primary group inline-flex items-center gap-2"
                      >
                        {slide.cta}
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <div className="flex items-center gap-2">
              <button
                onClick={scrollPrev}
                disabled={!canScrollPrev}
                className="p-2 rounded-lg border border-oc-border text-oc-cream hover:border-oc-cyan/50 hover:text-oc-cyan transition-colors"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={scrollNext}
                className="p-2 rounded-lg border border-oc-border text-oc-cream hover:border-oc-cyan/50 hover:text-oc-cyan transition-colors"
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Dots */}
            <div className="flex gap-2">
              {SLIDES.map((_, index) => (
                <button
                  key={index}
                  onClick={() => emblaApi?.scrollTo(index)}
                  className={cn(
                    "w-2.5 h-2.5 rounded-full transition-all",
                    index === selectedIndex
                      ? "bg-oc-cyan w-8"
                      : "bg-oc-cream-muted/40 hover:bg-oc-cream-muted/60"
                  )}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
