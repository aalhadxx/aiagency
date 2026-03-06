# OpenClaw AI Security Agency — Design System

> Stripe meets Linear meets Vercel: minimal, powerful, enterprise-ready.

---

## 1. Color System

### Rationale
- **Trust**: Deep blues convey security and enterprise credibility
- **Innovation**: Teal/cyan accents signal AI/tech without being playful
- **Clarity**: High-contrast neutrals for readability and accessibility
- **Conversion**: Accent colors draw attention to CTAs without overwhelming

### Primary Palette

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--oc-bg` | `#fafafa` | `#0a0a0b` | Page background |
| `--oc-surface` | `#f4f4f5` | `#141416` | Cards, elevated surfaces |
| `--oc-surface-hover` | `#e4e4e7` | `#1c1c1f` | Hover states |
| `--oc-cream` | `#0a0a0c` | `#fafafa` | Primary text |
| `--oc-cream-muted` | `#52525b` | `#a1a1aa` | Secondary text |
| `--oc-cyan` | `#0891b2` | `#22d3ee` | Primary CTA, links |
| `--oc-cyan-dim` | `#0e7490` | `#67e8f9` | CTA hover |
| `--oc-amber` | `#f59e0b` | `#fbbf24` | Highlights, metrics |
| `--oc-coral` | `#dc2626` | `#f87171` | Alerts, risk |
| `--oc-border` | `rgba(0,0,0,0.08)` | `rgba(255,255,255,0.08)` | Borders |

### Semantic Colors
- **Success**: `#059669` (emerald) — ROI, positive metrics
- **Warning**: `#d97706` (amber) — Attention needed
- **Error**: `#dc2626` (red) — Validation, critical alerts

---

## 2. Typography System

### Font Stack
- **Display**: Syne — `font-display` — Headlines, hero, section titles
- **Body**: DM Sans — `font-sans` — Body copy, UI labels

### Type Scale (rem)

| Scale | Size | Line Height | Letter Spacing | Usage |
|-------|------|-------------|----------------|-------|
| `text-xs` | 0.75rem | 1rem | -0.36px | Labels, captions |
| `text-sm` | 0.875rem | 1.25rem | -0.42px | Secondary text |
| `text-base` | 1rem | 1.6 | -0.48px | Body copy |
| `text-lg` | 1.125rem | 1.75rem | -0.72px | Lead paragraphs |
| `text-xl` | 1.25rem | 1.75rem | -0.8px | Subheadings |
| `text-2xl` | 1.5rem | 2rem | -1.12px | Card titles |
| `text-3xl` | 1.75rem | 2.25rem | -1.2px | Section titles |
| `text-4xl` | 2.25rem | 2.5rem | -1.44px | Page titles |
| `text-5xl` | 3rem | 1.1 | -1.6px | Hero (mobile) |
| `text-6xl` | 3.75rem | 1.05 | -1.8px | Hero (tablet) |
| `text-7xl` | 4.5rem | 1.05 | -2px | Hero (desktop) |
| `text-8xl` | 6rem | 4rem | -2.4px | Large hero |

### Usage Rules
- **Hero**: `font-display text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight`
- **Section titles**: `font-display text-3xl md:text-4xl lg:text-5xl font-bold`
- **Card titles**: `font-display text-xl font-bold`
- **Body**: `font-sans text-base text-oc-cream-muted leading-relaxed`
- **Eyebrow**: `text-sm font-medium tracking-widest uppercase text-oc-cyan`

---

## 3. Component Library

### Buttons

**Primary (CTA)**
```tsx
className="inline-flex items-center gap-2 px-6 py-3 bg-oc-cyan text-oc-bg font-semibold rounded-lg 
          transition-all hover:bg-oc-cyan-dim hover:gap-3"
```

**Secondary (Outline)**
```tsx
className="inline-flex items-center gap-2 px-6 py-3 border border-oc-border text-oc-cream 
          font-medium rounded-lg transition-all hover:border-oc-cyan/50 hover:text-oc-cyan"
```

**Ghost**
```tsx
className="inline-flex items-center gap-2 px-6 py-3 text-oc-cream font-medium 
          rounded-lg transition-all hover:bg-oc-surface"
```

### Cards

**Default**
```tsx
className="p-6 md:p-8 rounded-xl border border-oc-border bg-oc-surface/50 
          backdrop-blur-sm transition-all hover:border-oc-cyan/20"
```

**Highlighted**
```tsx
className="p-6 md:p-8 rounded-xl border-2 border-oc-cyan/30 bg-oc-surface"
```

### Form Inputs

```tsx
className="w-full px-4 py-3 rounded-lg border border-oc-border bg-oc-surface 
          text-oc-cream placeholder-oc-cream-muted/60 focus:outline-none 
          focus:ring-2 focus:ring-oc-cyan/30 focus:border-oc-cyan/50 transition-colors"
```

```tsx
// Error state
className="... border-oc-coral focus:ring-oc-coral/30"
```

---

## 4. Layout Grids

### Container
- **Max width**: 1280px (`max-w-7xl`)
- **Padding**: `px-6 lg:px-12`
- **Section spacing**: `py-20 md:py-24 lg:py-32`

### Grid Patterns
- **2 columns**: `grid md:grid-cols-2 gap-8 lg:gap-12`
- **3 columns**: `grid md:grid-cols-3 gap-6 lg:gap-8`
- **4 columns**: `grid md:grid-cols-2 lg:grid-cols-4 gap-6`
- **12-column**: `grid lg:grid-cols-12 gap-8` (for asymmetric layouts)

### Spacing Scale
- **xs**: 4px
- **sm**: 8px
- **md**: 16px
- **lg**: 24px
- **xl**: 32px
- **2xl**: 48px
- **3xl**: 64px

---

## 5. Animation Principles

### Timing
- **Fast**: 150ms — Hover, focus
- **Default**: 250ms — Transitions
- **Slow**: 500ms — Page reveals
- **Easing**: `cubic-bezier(0.25, 0.4, 0.25, 1)`

### Scroll Reveal
- **Direction**: Up (default)
- **Offset**: 24px
- **Duration**: 0.6s
- **Stagger**: 0.1s per child

### Hover States
- **Cards**: subtle border color shift, slight scale (1.02)
- **Buttons**: background darken, arrow slide
- **Links**: underline + color change

### Reduced Motion
- Respect `prefers-reduced-motion: reduce`
- Fallback: opacity only, no transform

---

## 6. Conversion Friction Reduction

1. **Hero CTA**: Single primary action, visible above fold
2. **Sticky CTA**: On scroll, show "Book Free Audit" bar
3. **Inline CTAs**: Every section ends with clear next step
4. **Form fields**: Minimal required fields (name, email, company)
5. **Progressive disclosure**: FAQ accordions, expandable details
6. **Social proof**: Logos, metrics, testimonials near every CTA

---

## 7. Mobile-First Breakpoints

| Breakpoint | Min Width | Usage |
|------------|-----------|-------|
| `sm` | 640px | Mobile landscape |
| `md` | 768px | Tablet |
| `lg` | 1024px | Desktop |
| `xl` | 1280px | Large desktop |
| `2xl` | 1536px | Wide |

---

## 8. Accessibility

- **Contrast**: WCAG AA minimum (4.5:1 body, 3:1 large text)
- **Focus**: Visible focus ring (`focus:ring-2 focus:ring-oc-cyan/30`)
- **Touch targets**: Min 44×44px for buttons
- **Labels**: All form inputs have visible labels
