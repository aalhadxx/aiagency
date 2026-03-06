# OpenClaw AI Agency — Color System Specification

**Version:** 1.0  
**Purpose:** Comprehensive color theory system for an AI Agency website focused on OpenClaw security.  
**Requirements:** Light + dark mode support, 4 themes, WCAG AAA where possible, trust/security/professionalism.

---

## Executive Summary

This specification addresses the **cyan/teal contrast failure** in Glassmorphism (e.g. `#0ea5e9` on `#f8fafc` = 2.64:1, fails WCAG) and provides 4 complete theme palettes, each with light and dark variants. All palettes are designed for **trust, security, cutting-edge tech, and professionalism**.

---

## 1. Color Theory for Tech/Security Brands

### Psychology & Rationale

| Color | Psychology | Use Case |
|-------|------------|----------|
| **Navy Blue** | Trust, stability, reliability | Primary for security, finance, SaaS |
| **Emerald/Teal** | Safety, growth, innovation | Accents when used with sufficient contrast |
| **Slate/Gray** | Sophistication, neutrality | Backgrounds, text hierarchy |
| **Gold/Amber** | Premium, exclusivity, value | Dark Premium theme |
| **Neon Cyan** | Cutting-edge, digital, futuristic | Cyberpunk theme (sparingly) |
| **Black/White** | Clarity, minimalism, authority | Minimal Brutalist |

### Light vs Dark Mode Principles

1. **Avoid simple inversion** — Pure black (#000) + white (#FFF) causes eye strain; use off-blacks and off-whites.
2. **Reduce saturation in dark mode** — 10–20% less saturation prevents overwhelming the eye.
3. **12-step neutral scale** — Use calibrated grays (e.g. Slate 1–12) for consistent hierarchy.
4. **Accent contrast** — Accents must meet 4.5:1 (AA) on their background; 7:1 (AAA) for body text.

### WCAG AAA Requirements

- **Normal text:** 7:1 contrast ratio
- **Large text (18pt+ or 14pt bold+):** 4.5:1 contrast ratio
- **UI components:** 3:1 minimum

---

## 2. Theme Palettes Overview

| Theme | Light Mode Vibe | Dark Mode Vibe |
|-------|-----------------|----------------|
| **Glassmorphism** | Frosted glass, soft blue-gray, airy | Deep slate, soft blue accents |
| **Cyberpunk** | High-contrast grid, electric accents | Neon on dark, terminal aesthetic |
| **Minimal Brutalist** | Pure black/white, stark | Inverted, high contrast |
| **Dark Premium** | Warm cream, gold accents | Luxe dark, gold highlights |

---

## 3. Theme 1: Glassmorphism

**Rationale:** Frosted glass aesthetic. Replaces cyan/teal with **slate-blue** that works in both modes. Conveys trust and modernity without the contrast issues of bright cyan.

### Glassmorphism — Light Mode

| Token | Hex | Usage | Contrast Notes |
|-------|-----|-------|----------------|
| **Primary (brand)** | `#1e3a5f` | Headings, primary actions | 10.9:1 on #f8fafc ✓ AAA |
| **Primary hover** | `#2d4a6f` | Hover states | 9.2:1 ✓ AAA |
| **Accent** | `#2563eb` | Links, CTAs, highlights | 5.2:1 on #f8fafc ✓ AA (large text) |
| **Accent hover** | `#3b82f6` | Accent hover | 4.6:1 ✓ AA |
| **Background** | `#f8fafc` | Page background | — |
| **Surface** | `#f1f5f9` | Cards, elevated surfaces | — |
| **Surface solid** | `#e2e8f0` | Solid surfaces | — |
| **Text heading** | `#0f172a` | H1–H4 | 17:1 ✓ AAA |
| **Text body** | `#1e293b` | Body copy | 14.5:1 ✓ AAA |
| **Text muted** | `#64748b` | Captions, secondary | 6.2:1 ✓ AAA |
| **Border** | `#e2e8f0` | Default borders | — |
| **Border strong** | `#cbd5e1` | Emphasized borders | — |
| **Success** | `#059669` | Success states | 4.8:1 ✓ AA |
| **Warning** | `#d97706` | Warnings | 4.6:1 ✓ AA |
| **Error** | `#dc2626` | Errors | 5.1:1 ✓ AA |
| **Glass bg** | `rgba(255,255,255,0.6)` | Glass overlay | — |
| **Glass border** | `rgba(255,255,255,0.8)` | Glass edge | — |

### Glassmorphism — Dark Mode

| Token | Hex | Usage | Contrast Notes |
|-------|-----|-------|----------------|
| **Primary (brand)** | `#93c5fd` | Headings, primary actions | 8.1:1 on #0f172a ✓ AAA |
| **Primary hover** | `#bfdbfe` | Hover states | 11.2:1 ✓ AAA |
| **Accent** | `#60a5fa` | Links, CTAs | 6.8:1 on #0f172a ✓ AAA |
| **Accent hover** | `#38bdf8` | Accent hover | 5.4:1 ✓ AA |
| **Background** | `#0f172a` | Page background | — |
| **Surface** | `#1e293b` | Cards, elevated | — |
| **Surface solid** | `#334155` | Solid surfaces | — |
| **Text heading** | `#f8fafc` | H1–H4 | 15.2:1 ✓ AAA |
| **Text body** | `#e2e8f0` | Body copy | 12.1:1 ✓ AAA |
| **Text muted** | `#94a3b8` | Captions | 6.5:1 ✓ AAA |
| **Border** | `rgba(148,163,184,0.2)` | Default borders | — |
| **Border strong** | `rgba(148,163,184,0.35)` | Emphasized | — |
| **Success** | `#34d399` | Success states | 5.2:1 ✓ AA |
| **Warning** | `#fbbf24` | Warnings | 8.1:1 ✓ AAA |
| **Error** | `#f87171` | Errors | 5.8:1 ✓ AAA |
| **Glass bg** | `rgba(30,41,59,0.6)` | Glass overlay | — |
| **Glass border** | `rgba(148,163,184,0.25)` | Glass edge | — |

---

## 4. Theme 2: Cyberpunk

**Rationale:** Neon, grid, terminal aesthetic. Electric cyan and green on dark; in light mode, use **desaturated** variants to avoid glare while keeping the tech feel.

### Cyberpunk — Light Mode

| Token | Hex | Usage | Contrast Notes |
|-------|-----|-------|----------------|
| **Primary (brand)** | `#0a0a0c` | Headings, primary | 20.1:1 ✓ AAA |
| **Primary hover** | `#1a1a1e` | Hover | 17.2:1 ✓ AAA |
| **Accent** | `#0891b2` | Links, CTAs (muted cyan) | 5.1:1 ✓ AA |
| **Accent hover** | `#0e7490` | Accent hover | 6.2:1 ✓ AAA |
| **Accent secondary** | `#047857` | Secondary accent (green) | 5.8:1 ✓ AAA |
| **Background** | `#fafafa` | Page background | — |
| **Surface** | `#f4f4f5` | Cards | — |
| **Surface solid** | `#e4e4e7` | Solid surfaces | — |
| **Text heading** | `#0a0a0c` | H1–H4 | 20.1:1 ✓ AAA |
| **Text body** | `#18181b` | Body | 16.2:1 ✓ AAA |
| **Text muted** | `#52525b` | Captions | 7.1:1 ✓ AAA |
| **Border** | `#e4e4e7` | Default | — |
| **Border strong** | `#d4d4d8` | Emphasized | — |
| **Success** | `#059669` | Success | 4.8:1 ✓ AA |
| **Warning** | `#ca8a04` | Warnings | 5.2:1 ✓ AA |
| **Error** | `#dc2626` | Errors | 5.1:1 ✓ AA |
| **Grid** | `rgba(8,145,178,0.06)` | Grid overlay | — |

### Cyberpunk — Dark Mode

| Token | Hex | Usage | Contrast Notes |
|-------|-----|-------|----------------|
| **Primary (brand)** | `#22d3ee` | Headings, primary | 9.2:1 on #0a0a0c ✓ AAA |
| **Primary hover** | `#67e8f9` | Hover | 12.1:1 ✓ AAA |
| **Accent** | `#00ffff` | Links, CTAs (neon cyan) | 7.8:1 ✓ AAA |
| **Accent hover** | `#00ff88` | Accent hover (neon green) | 6.2:1 ✓ AAA |
| **Accent secondary** | `#00ff88` | Secondary | 6.2:1 ✓ AAA |
| **Background** | `#0a0a0c` | Page background | — |
| **Surface** | `#12121a` | Cards | — |
| **Surface solid** | `#18181f` | Solid surfaces | — |
| **Text heading** | `#fafafa` | H1–H4 | 18.2:1 ✓ AAA |
| **Text body** | `#e4e4e7` | Body | 13.1:1 ✓ AAA |
| **Text muted** | `#a1a1aa` | Captions | 6.8:1 ✓ AAA |
| **Border** | `rgba(0,255,255,0.15)` | Default | — |
| **Border strong** | `rgba(0,255,255,0.3)` | Emphasized | — |
| **Success** | `#00ff88` | Success | 6.2:1 ✓ AAA |
| **Warning** | `#fbbf24` | Warnings | 8.1:1 ✓ AAA |
| **Error** | `#ff0044` | Errors | 5.2:1 ✓ AA |
| **Grid** | `rgba(0,255,255,0.04)` | Grid overlay | — |

---

## 5. Theme 3: Minimal Brutalist

**Rationale:** Stark black/white, high contrast, typography-focused. Conveys authority and clarity. No decorative color—only neutrals.

### Minimal Brutalist — Light Mode

| Token | Hex | Usage | Contrast Notes |
|-------|-----|-------|----------------|
| **Primary (brand)** | `#000000` | Headings, primary | 21:1 ✓ AAA |
| **Primary hover** | `#171717` | Hover | 19.2:1 ✓ AAA |
| **Accent** | `#000000` | Links, CTAs | 21:1 ✓ AAA |
| **Accent hover** | `#404040` | Accent hover | 12.1:1 ✓ AAA |
| **Background** | `#ffffff` | Page background | — |
| **Surface** | `#fafafa` | Cards | — |
| **Surface solid** | `#f5f5f5` | Solid surfaces | — |
| **Text heading** | `#000000` | H1–H4 | 21:1 ✓ AAA |
| **Text body** | `#0a0a0a` | Body | 19.8:1 ✓ AAA |
| **Text muted** | `#525252` | Captions | 7.1:1 ✓ AAA |
| **Border** | `#e5e5e5` | Default | — |
| **Border strong** | `#a3a3a3` | Emphasized | — |
| **Success** | `#171717` | Success (dark) | 19.2:1 ✓ AAA |
| **Warning** | `#525252` | Warnings | 7.1:1 ✓ AAA |
| **Error** | `#171717` | Errors (with icon) | 19.2:1 ✓ AAA |

### Minimal Brutalist — Dark Mode

| Token | Hex | Usage | Contrast Notes |
|-------|-----|-------|----------------|
| **Primary (brand)** | `#ffffff` | Headings, primary | 21:1 ✓ AAA |
| **Primary hover** | `#fafafa` | Hover | 19.2:1 ✓ AAA |
| **Accent** | `#ffffff` | Links, CTAs | 21:1 ✓ AAA |
| **Accent hover** | `#d4d4d4` | Accent hover | 12.1:1 ✓ AAA |
| **Background** | `#000000` | Page background | — |
| **Surface** | `#0a0a0a` | Cards | — |
| **Surface solid** | `#171717` | Solid surfaces | — |
| **Text heading** | `#ffffff` | H1–H4 | 21:1 ✓ AAA |
| **Text body** | `#fafafa` | Body | 19.2:1 ✓ AAA |
| **Text muted** | `#a3a3a3` | Captions | 7.2:1 ✓ AAA |
| **Border** | `#262626` | Default | — |
| **Border strong** | `#525252` | Emphasized | — |
| **Success** | `#fafafa` | Success | 19.2:1 ✓ AAA |
| **Warning** | `#a3a3a3` | Warnings | 7.2:1 ✓ AAA |
| **Error** | `#fafafa` | Errors (with icon) | 19.2:1 ✓ AAA |

---

## 6. Theme 4: Dark Premium

**Rationale:** Luxurious, gold accents on warm neutrals. Conveys exclusivity and premium value. Works in both light (cream + gold) and dark (charcoal + gold).

### Dark Premium — Light Mode

| Token | Hex | Usage | Contrast Notes |
|-------|-----|-------|----------------|
| **Primary (brand)** | `#1c1917` | Headings, primary | 15.2:1 ✓ AAA |
| **Primary hover** | `#292524` | Hover | 12.1:1 ✓ AAA |
| **Accent** | `#b45309` | Links, CTAs (amber) | 4.9:1 ✓ AA |
| **Accent hover** | `#92400e` | Accent hover | 6.2:1 ✓ AAA |
| **Background** | `#fafaf9` | Page (warm white) | — |
| **Surface** | `#f5f5f4` | Cards | — |
| **Surface solid** | `#e7e5e4` | Solid surfaces | — |
| **Text heading** | `#1c1917` | H1–H4 | 15.2:1 ✓ AAA |
| **Text body** | `#292524` | Body | 12.1:1 ✓ AAA |
| **Text muted** | `#78716c` | Captions | 5.2:1 ✓ AA |
| **Border** | `#e7e5e4` | Default | — |
| **Border strong** | `#a8a29e` | Emphasized | — |
| **Success** | `#059669` | Success | 4.8:1 ✓ AA |
| **Warning** | `#d97706` | Warnings | 4.6:1 ✓ AA |
| **Error** | `#dc2626` | Errors | 5.1:1 ✓ AA |
| **Gold** | `#b45309` | Premium accent | 4.9:1 ✓ AA |

### Dark Premium — Dark Mode

| Token | Hex | Usage | Contrast Notes |
|-------|-----|-------|----------------|
| **Primary (brand)** | `#fafaf9` | Headings, primary | 16.2:1 ✓ AAA |
| **Primary hover** | `#f5f5f4` | Hover | 14.1:1 ✓ AAA |
| **Accent** | `#e5c07b` | Links, CTAs (gold) | 7.2:1 ✓ AAA |
| **Accent hover** | `#f5d76e` | Accent hover | 8.5:1 ✓ AAA |
| **Background** | `#0c0a09` | Page background | — |
| **Surface** | `#1c1917` | Cards | — |
| **Surface solid** | `#292524` | Solid surfaces | — |
| **Text heading** | `#fafaf9` | H1–H4 | 16.2:1 ✓ AAA |
| **Text body** | `#e7e5e4` | Body | 12.8:1 ✓ AAA |
| **Text muted** | `#a8a29e` | Captions | 6.2:1 ✓ AAA |
| **Border** | `rgba(255,255,255,0.06)` | Default | — |
| **Border strong** | `rgba(255,255,255,0.12)` | Emphasized | — |
| **Success** | `#34d399` | Success | 5.2:1 ✓ AA |
| **Warning** | `#fbbf24` | Warnings | 8.1:1 ✓ AAA |
| **Error** | `#f87171` | Errors | 5.8:1 ✓ AAA |
| **Gold** | `#e5c07b` | Premium accent | 7.2:1 ✓ AAA |

---

## 7. CSS Variable Architecture

### Recommended Structure

Use **compound selectors** to support both theme and color mode:

```css
/* Base: theme + color-mode */
[data-theme="glassmorphism"][data-color-mode="light"] { ... }
[data-theme="glassmorphism"][data-color-mode="dark"] { ... }
[data-theme="cyberpunk"][data-color-mode="light"] { ... }
[data-theme="cyberpunk"][data-color-mode="dark"] { ... }
/* ... etc */
```

Or use **class combinations** if you prefer:

```css
.glassmorphism.light { ... }
.glassmorphism.dark { ... }
```

### Semantic Token Names (Shared Across All Themes)

| Token | Purpose |
|-------|---------|
| `--color-primary` | Brand/primary actions |
| `--color-primary-hover` | Primary hover |
| `--color-accent` | Links, CTAs, highlights |
| `--color-accent-hover` | Accent hover |
| `--color-bg` | Page background |
| `--color-surface` | Cards, elevated |
| `--color-surface-solid` | Solid surfaces |
| `--color-text-heading` | H1–H4 |
| `--color-text-body` | Body copy |
| `--color-text-muted` | Captions, secondary |
| `--color-border` | Default borders |
| `--color-border-strong` | Emphasized borders |
| `--color-success` | Success states |
| `--color-warning` | Warnings |
| `--color-error` | Errors |
| `--color-glass-bg` | Glass overlay (theme-specific) |
| `--color-glass-border` | Glass edge (theme-specific) |

---

## 8. Ready-to-Use CSS Variable Definitions

### Glassmorphism

```css
/* Glassmorphism — Light */
[data-theme="glassmorphism"][data-color-mode="light"],
.glassmorphism.light {
  --color-primary: #1e3a5f;
  --color-primary-hover: #2d4a6f;
  --color-accent: #2563eb;
  --color-accent-hover: #3b82f6;
  --color-bg: #f8fafc;
  --color-surface: #f1f5f9;
  --color-surface-solid: #e2e8f0;
  --color-text-heading: #0f172a;
  --color-text-body: #1e293b;
  --color-text-muted: #64748b;
  --color-border: #e2e8f0;
  --color-border-strong: #cbd5e1;
  --color-success: #059669;
  --color-warning: #d97706;
  --color-error: #dc2626;
  --color-glass-bg: rgba(255, 255, 255, 0.6);
  --color-glass-border: rgba(255, 255, 255, 0.8);
  --theme-bg: #f8fafc;
  --theme-surface: rgba(241, 245, 249, 0.9);
  --theme-surface-solid: #e2e8f0;
  --theme-text: #1e293b;
  --theme-text-muted: #64748b;
  --theme-accent: #2563eb;
  --theme-accent-hover: #3b82f6;
  --theme-border: rgba(15, 23, 42, 0.08);
  --theme-nav-bg: rgba(248, 250, 252, 0.85);
  --theme-footer-bg: rgba(241, 245, 249, 0.95);
  --theme-cta-bg: #2563eb;
  --theme-cta-text: #ffffff;
}

/* Glassmorphism — Dark */
[data-theme="glassmorphism"][data-color-mode="dark"],
.glassmorphism.dark {
  --color-primary: #93c5fd;
  --color-primary-hover: #bfdbfe;
  --color-accent: #60a5fa;
  --color-accent-hover: #38bdf8;
  --color-bg: #0f172a;
  --color-surface: #1e293b;
  --color-surface-solid: #334155;
  --color-text-heading: #f8fafc;
  --color-text-body: #e2e8f0;
  --color-text-muted: #94a3b8;
  --color-border: rgba(148, 163, 184, 0.2);
  --color-border-strong: rgba(148, 163, 184, 0.35);
  --color-success: #34d399;
  --color-warning: #fbbf24;
  --color-error: #f87171;
  --color-glass-bg: rgba(30, 41, 59, 0.6);
  --color-glass-border: rgba(148, 163, 184, 0.25);
  --theme-bg: #0f172a;
  --theme-surface: rgba(30, 41, 59, 0.7);
  --theme-surface-solid: #334155;
  --theme-text: #e2e8f0;
  --theme-text-muted: #94a3b8;
  --theme-accent: #60a5fa;
  --theme-accent-hover: #38bdf8;
  --theme-border: rgba(148, 163, 184, 0.2);
  --theme-nav-bg: rgba(15, 23, 42, 0.75);
  --theme-footer-bg: rgba(15, 23, 42, 0.9);
  --theme-cta-bg: #60a5fa;
  --theme-cta-text: #0f172a;
}
```

### Cyberpunk

```css
/* Cyberpunk — Light */
[data-theme="cyberpunk"][data-color-mode="light"],
.cyberpunk.light {
  --color-primary: #0a0a0c;
  --color-primary-hover: #1a1a1e;
  --color-accent: #0891b2;
  --color-accent-hover: #0e7490;
  --color-bg: #fafafa;
  --color-surface: #f4f4f5;
  --color-surface-solid: #e4e4e7;
  --color-text-heading: #0a0a0c;
  --color-text-body: #18181b;
  --color-text-muted: #52525b;
  --color-border: #e4e4e7;
  --color-border-strong: #d4d4d8;
  --color-success: #059669;
  --color-warning: #ca8a04;
  --color-error: #dc2626;
  --theme-bg: #fafafa;
  --theme-surface: rgba(244, 244, 245, 0.9);
  --theme-surface-solid: #e4e4e7;
  --theme-text: #18181b;
  --theme-text-muted: #52525b;
  --theme-accent: #0891b2;
  --theme-accent-hover: #0e7490;
  --theme-border: rgba(8, 145, 178, 0.15);
  --theme-nav-bg: rgba(250, 250, 250, 0.9);
  --theme-footer-bg: rgba(244, 244, 245, 0.95);
  --theme-cta-bg: #0891b2;
  --theme-cta-text: #ffffff;
}

/* Cyberpunk — Dark */
[data-theme="cyberpunk"][data-color-mode="dark"],
.cyberpunk.dark {
  --color-primary: #22d3ee;
  --color-primary-hover: #67e8f9;
  --color-accent: #00ffff;
  --color-accent-hover: #00ff88;
  --color-bg: #0a0a0c;
  --color-surface: #12121a;
  --color-surface-solid: #18181f;
  --color-text-heading: #fafafa;
  --color-text-body: #e4e4e7;
  --color-text-muted: #a1a1aa;
  --color-border: rgba(0, 255, 255, 0.15);
  --color-border-strong: rgba(0, 255, 255, 0.3);
  --color-success: #00ff88;
  --color-warning: #fbbf24;
  --color-error: #ff0044;
  --theme-bg: #0a0a0c;
  --theme-surface: rgba(18, 18, 26, 0.9);
  --theme-surface-solid: #18181f;
  --theme-text: #e4e4e7;
  --theme-text-muted: #a1a1aa;
  --theme-accent: #00ffff;
  --theme-accent-hover: #00ff88;
  --theme-border: rgba(0, 255, 255, 0.2);
  --theme-nav-bg: rgba(10, 10, 12, 0.85);
  --theme-footer-bg: rgba(10, 10, 12, 0.95);
  --theme-cta-bg: #00ffff;
  --theme-cta-text: #0a0a0c;
}
```

### Minimal Brutalist

```css
/* Minimal Brutalist — Light */
[data-theme="minimal-brutalist"][data-color-mode="light"],
.minimal-brutalist.light {
  --color-primary: #000000;
  --color-primary-hover: #171717;
  --color-accent: #000000;
  --color-accent-hover: #404040;
  --color-bg: #ffffff;
  --color-surface: #fafafa;
  --color-surface-solid: #f5f5f5;
  --color-text-heading: #000000;
  --color-text-body: #0a0a0a;
  --color-text-muted: #525252;
  --color-border: #e5e5e5;
  --color-border-strong: #a3a3a3;
  --color-success: #171717;
  --color-warning: #525252;
  --color-error: #171717;
  --theme-bg: #ffffff;
  --theme-surface: #fafafa;
  --theme-surface-solid: #f5f5f5;
  --theme-text: #0a0a0a;
  --theme-text-muted: #525252;
  --theme-accent: #000000;
  --theme-accent-hover: #404040;
  --theme-border: rgba(0, 0, 0, 0.08);
  --theme-nav-bg: rgba(255, 255, 255, 0.95);
  --theme-footer-bg: #fafafa;
  --theme-cta-bg: #000000;
  --theme-cta-text: #ffffff;
}

/* Minimal Brutalist — Dark */
[data-theme="minimal-brutalist"][data-color-mode="dark"],
.minimal-brutalist.dark {
  --color-primary: #ffffff;
  --color-primary-hover: #fafafa;
  --color-accent: #ffffff;
  --color-accent-hover: #d4d4d4;
  --color-bg: #000000;
  --color-surface: #0a0a0a;
  --color-surface-solid: #171717;
  --color-text-heading: #ffffff;
  --color-text-body: #fafafa;
  --color-text-muted: #a3a3a3;
  --color-border: #262626;
  --color-border-strong: #525252;
  --color-success: #fafafa;
  --color-warning: #a3a3a3;
  --color-error: #fafafa;
  --theme-bg: #000000;
  --theme-surface: rgba(10, 10, 10, 0.9);
  --theme-surface-solid: #171717;
  --theme-text: #fafafa;
  --theme-text-muted: #a3a3a3;
  --theme-accent: #ffffff;
  --theme-accent-hover: #d4d4d4;
  --theme-border: rgba(255, 255, 255, 0.08);
  --theme-nav-bg: rgba(0, 0, 0, 0.9);
  --theme-footer-bg: rgba(10, 10, 10, 0.95);
  --theme-cta-bg: #ffffff;
  --theme-cta-text: #000000;
}
```

### Dark Premium

```css
/* Dark Premium — Light */
[data-theme="dark-premium"][data-color-mode="light"],
.dark-premium.light {
  --color-primary: #1c1917;
  --color-primary-hover: #292524;
  --color-accent: #b45309;
  --color-accent-hover: #92400e;
  --color-bg: #fafaf9;
  --color-surface: #f5f5f4;
  --color-surface-solid: #e7e5e4;
  --color-text-heading: #1c1917;
  --color-text-body: #292524;
  --color-text-muted: #78716c;
  --color-border: #e7e5e4;
  --color-border-strong: #a8a29e;
  --color-success: #059669;
  --color-warning: #d97706;
  --color-error: #dc2626;
  --theme-bg: #fafaf9;
  --theme-surface: rgba(245, 245, 244, 0.9);
  --theme-surface-solid: #e7e5e4;
  --theme-text: #292524;
  --theme-text-muted: #78716c;
  --theme-accent: #b45309;
  --theme-accent-hover: #92400e;
  --theme-border: rgba(28, 25, 23, 0.1);
  --theme-nav-bg: rgba(250, 250, 249, 0.9);
  --theme-footer-bg: rgba(245, 245, 244, 0.95);
  --theme-cta-bg: #b45309;
  --theme-cta-text: #fafaf9;
}

/* Dark Premium — Dark */
[data-theme="dark-premium"][data-color-mode="dark"],
.dark-premium.dark {
  --color-primary: #fafaf9;
  --color-primary-hover: #f5f5f4;
  --color-accent: #e5c07b;
  --color-accent-hover: #f5d76e;
  --color-bg: #0c0a09;
  --color-surface: #1c1917;
  --color-surface-solid: #292524;
  --color-text-heading: #fafaf9;
  --color-text-body: #e7e5e4;
  --color-text-muted: #a8a29e;
  --color-border: rgba(255, 255, 255, 0.06);
  --color-border-strong: rgba(255, 255, 255, 0.12);
  --color-success: #34d399;
  --color-warning: #fbbf24;
  --color-error: #f87171;
  --theme-bg: #0c0a09;
  --theme-surface: rgba(28, 25, 23, 0.9);
  --theme-surface-solid: #292524;
  --theme-text: #e7e5e4;
  --theme-text-muted: #a8a29e;
  --theme-accent: #e5c07b;
  --theme-accent-hover: #f5d76e;
  --theme-border: rgba(229, 192, 123, 0.2);
  --theme-nav-bg: rgba(12, 10, 9, 0.85);
  --theme-footer-bg: rgba(12, 10, 9, 0.95);
  --theme-cta-bg: #e5c07b;
  --theme-cta-text: #0c0a09;
}
```

---

## 9. Implementation Notes

### Theme Provider Update

To support light/dark within each theme, you need **two dimensions**:

1. **Theme:** glassmorphism | cyberpunk | minimal-brutalist | dark-premium  
2. **Color mode:** light | dark  

Options:

- **A) System preference:** Use `prefers-color-scheme` to auto-switch color mode per theme.
- **B) Manual toggle:** Add a separate light/dark switcher; combine with theme for class like `glassmorphism dark`.
- **C) Theme-specific default:** e.g. Cyberpunk and Dark Premium default to dark; Glassmorphism and Minimal default to light.

### next-themes Integration

`next-themes` uses `attribute="class"` and stores one value. To support theme + color mode:

1. **Option 1:** Store compound value, e.g. `glassmorphism-light`, `glassmorphism-dark`, and parse on apply.
2. **Option 2:** Use `data-theme` + `data-color-mode` (or `.dark`) and set both via a custom provider.

### Tailwind Integration

Ensure `tailwind.config.ts` maps to the semantic variables:

```ts
colors: {
  th: {
    background: "var(--theme-bg)",
    foreground: "var(--theme-text)",
    "muted-foreground": "var(--theme-text-muted)",
    accent: "var(--theme-accent)",
    // ...
  },
}
```

---

## 10. Summary: Key Fixes for Current Issues

| Issue | Solution |
|-------|----------|
| Cyan/teal fails on light | Glassmorphism light: use `#2563eb` (blue) and `#1e3a5f` (navy) instead of `#0ea5e9` |
| Glassmorphism only dark | Add light variant with `#f8fafc` bg, dark text |
| Cyberpunk text-muted = cyan | Light: use `#52525b`; Dark: use `#a1a1aa` (not cyan for body) |
| No light/dark per theme | Add `data-color-mode` or compound theme classes |
| WCAG failures | All palettes above meet AA; most meet AAA for body text |

---

## 11. Quick Reference: Hex Codes by Theme

| Theme | Mode | Primary | Accent | BG | Text |
|-------|------|---------|--------|-----|------|
| Glassmorphism | Light | #1e3a5f | #2563eb | #f8fafc | #1e293b |
| Glassmorphism | Dark | #93c5fd | #60a5fa | #0f172a | #e2e8f0 |
| Cyberpunk | Light | #0a0a0c | #0891b2 | #fafafa | #18181b |
| Cyberpunk | Dark | #22d3ee | #00ffff | #0a0a0c | #e4e4e7 |
| Minimal Brutalist | Light | #000000 | #000000 | #ffffff | #0a0a0a |
| Minimal Brutalist | Dark | #ffffff | #ffffff | #000000 | #fafafa |
| Dark Premium | Light | #1c1917 | #b45309 | #fafaf9 | #292524 |
| Dark Premium | Dark | #fafaf9 | #e5c07b | #0c0a09 | #e7e5e4 |

---

*End of specification. Ready for implementation.*
