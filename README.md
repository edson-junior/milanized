# Milanized

A production-grade content platform for internationals navigating life in Italy. Built with Next.js App Router, headless Sanity CMS, and a full CI/CD pipeline including unit tests, end-to-end tests, and automated Lighthouse performance audits.

**Live site:** [milanized.com](https://milanized.com)

---

## Performance Scores

Measured with Lighthouse desktop preset, no throttling (local production build). All URLs audited in CI are listed:

| Page | Performance | Accessibility | Best Practices | SEO |
|------|:-----------:|:-------------:|:--------------:|:---:|
| `/` (homepage) | 100 | 100 | 100 | 100 |
| `/blog` (listing) | 100 | 100 | 100 | 100 |
| `/blog/2-weeks-in-italy` (post) | 100 | 100 | 100 | 100 |
| `/about` | 100 | 100 | 100 | 100 |
| `/contact` | 100 | 100 | 100 | 100 |
| `/search` | 100 | 100 | 100 | 69 |

> **Note:** `/search` scores 69 on SEO — the page renders no indexable content without a query parameter, so Lighthouse flags it for missing meta description and low text ratio. This is expected behaviour for a search results page.

Scores are enforced in CI via `.lighthouserc.json` budgets. See [CI / GitHub Actions](#ci--github-actions).

---

## Features

- **Server-side rendering with ISR** — pages revalidate every 60 seconds; no stale content without sacrificing performance
- **Headless CMS** — content editors manage everything in Sanity Studio without touching code
- **Blog with pagination, RSS feed, and sitemap** — SEO-ready out of the box
- **Full-text search** — GROQ-powered search endpoint with instant results
- **Contact form** — Cloudflare Turnstile CAPTCHA + Zod validation + Nodemailer, with server-side XSS sanitization
- **Author profiles** — dedicated pages per author with bio and social links
- **Table of contents with scroll-spy** — auto-generated from headings, highlights active section
- **Structured data (JSON-LD)** — `Organization` and `BlogPosting` schemas for Google rich results
- **Open Graph + Twitter Card metadata** — per-page social previews
- **XSS protection** — all CMS-sourced HTML sanitized with `sanitize-html` before rendering
- **Accessibility** — skip-to-content link, semantic landmarks, ARIA labels; accessibility score enforced at ≥ 0.9 in CI
- **Three-tier CI pipeline** — unit tests, Playwright E2E tests, and Lighthouse performance budgets on every PR

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 6 |
| CMS | Sanity v4 (GROQ) |
| Styling | Tailwind CSS v4 |
| UI primitives | Radix UI, class-variance-authority |
| Forms | Zod (validation), Cloudflare Turnstile (CAPTCHA) |
| Email | Nodemailer (Gmail) |
| Security | sanitize-html |
| Fonts | Google Fonts via `next/font` |
| Analytics | Google Tag Manager |
| Rich text | `@portabletext/react` |
| Structured data | `schema-dts` |
| Linting / formatting | Biome |
| Unit tests | Vitest + React Testing Library |
| E2E tests | Playwright (Chromium) |
| Performance | Lighthouse CI |
| Git hooks | Husky + commitlint (Conventional Commits) |
| Package manager | pnpm 10 |
| Deployment | Vercel |

---

## Prerequisites

- **Node.js** ≥ 20 (24 recommended)
- **pnpm** ≥ 10 — install with `npm i -g pnpm`
- A **Sanity** project — [create one free](https://sanity.io)
- A **Cloudflare** account for [Turnstile](https://www.cloudflare.com/products/turnstile/) (free tier available)
- A **Gmail** account with an [App Password](https://support.google.com/accounts/answer/185833) for the contact form

---

## Environment Variables

Copy `.env.local.example` to `.env.local` and fill in the values:

```bash
cp .env.local.example .env.local
```

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | ✅ | Sanity project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | ✅ | Sanity dataset (e.g. `production`) |
| `NEXT_PUBLIC_SANITY_API_VERSION` | ✅ | Sanity API version (e.g. `2024-06-14`) |
| `SANITY_API_TOKEN` | ✅ | Sanity read token (for draft/preview mode) |
| `CLIENT_URL` | ✅ | Canonical origin (e.g. `http://localhost:3000`) |
| `NEXT_PUBLIC_CLIENT_URL` | ✅ | Public canonical origin (same as above) |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | ✅ | Cloudflare Turnstile site key |
| `TURNSTILE_SECRET_KEY` | ✅ | Cloudflare Turnstile secret key |
| `NODEMAILER_EMAIL` | ✅ | Gmail address to send contact emails from/to |
| `NODEMAILER_PASSWORD` | ✅ | Gmail App Password |
| `NEXT_PUBLIC_GTM_ID` | ➖ | Google Tag Manager container ID |
| `NEXT_PUBLIC_ADSENSE_ID` | ➖ | Google AdSense publisher ID |

> **Security note:** `SANITY_API_TOKEN`, `TURNSTILE_SECRET_KEY`, and `NODEMAILER_PASSWORD` are server-only secrets — they are never exposed to the browser.

---

## Getting Started

```bash
# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start Next.js development server |
| `pnpm build` | Production build |
| `pnpm start` | Start production server |
| `pnpm lint` | Run Biome linter + formatter (auto-fix) |
| `pnpm test` | Run Vitest unit tests |
| `pnpm test:watch` | Run Vitest in watch mode |
| `pnpm test:e2e` | Run Playwright E2E tests (requires `pnpm start`) |
| `pnpm test:e2e:ui` | Open Playwright UI mode |

---

## Project Structure

```
app/
├── (frontend)/           # Public-facing pages (homepage, blog, contact, etc.)
│   ├── blog/
│   │   ├── page.tsx      # Paginated post listing
│   │   ├── [...slug]/    # Individual post pages
│   │   └── rss.xml/      # RSS feed route
│   ├── search/           # Full-text search page
│   └── contact/          # Contact form page
├── actions/
│   └── contact.ts        # Server action: form validation → CAPTCHA → email
├── api/
│   └── search/           # Search API route
├── layout.tsx            # Root layout (fonts, GTM, header, footer)
└── sitemap.ts            # Dynamic XML sitemap

components/
├── ui/                   # Primitive components (Button, Input, Label, etc.)
├── Header/               # Desktop + mobile navigation, search bar
├── homepage/             # Homepage-specific sections
├── BlockRenderClient.tsx # Portable Text renderer (figures, embeds, CTAs)
├── Toc.tsx               # Table of contents
└── TocHighlighter.tsx    # Scroll-spy for active TOC section

lib/
├── sanitize.ts           # XSS sanitization utilities (sanitize-html)
├── contact-schema.ts     # Zod schema for contact form
└── utils.ts              # cn(), slugify(), formatDate()

sanity/
├── env.ts                # Env var validation for Sanity config
└── lib/
    ├── client.ts         # sanityFetch (ISR), typed query functions
    ├── queries.ts        # GROQ query definitions
    └── image.ts          # Sanity image URL builder

e2e/                      # Playwright end-to-end tests
.github/workflows/        # CI: unit tests, E2E, Lighthouse
```

---

## Testing

```bash
# Unit tests (Vitest + React Testing Library)
pnpm test

# E2E tests (Playwright — start the server first)
pnpm build && pnpm start
pnpm test:e2e
```

See [CI / GitHub Actions](#ci--github-actions) for how tests run automatically on every push.

---

## CI / GitHub Actions

Three workflows run automatically on GitHub Actions:

### Unit Tests (`unit.yml`)
- **Triggers:** every push and pull request on any branch
- **Steps:** TypeScript type check (`tsc --noEmit`) → Vitest unit tests
- **Required secrets:** none

### E2E Tests (`e2e.yml`)
- **Triggers:** push and pull request to `main`
- **Steps:** install Playwright (Chromium cached by lockfile hash) → `pnpm build` → Playwright tests
- **Artifacts:** `playwright-report/` uploaded for 14 days on every run
- **Required secrets:** `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`

### Lighthouse CI (`lighthouse.yml`)
- **Triggers:** push to `main` and pull requests targeting `main`
- **Steps:** `pnpm build` → `lhci collect` → `lhci assert` → artifact upload → `lhci upload` (temporary public storage)
- **Budgets:** performance ≥ 0.7, accessibility ≥ 0.9, best-practices ≥ 0.9, SEO ≥ 0.9 — except `/search` where SEO is a warning at ≥ 0.6 (configured in `.lighthouserc.json`)
- **Artifacts:** `.lighthouseci/` results uploaded for 14 days
- **Required secrets:** `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`

---

## Deployment

The project is deployed on **Vercel**. Any push to `main` triggers an automatic production deployment.

### Required production environment variables

Add all variables from the [Environment Variables](#environment-variables) table to your Vercel project under **Settings → Environment Variables**.

### GitHub Actions secrets

For CI to run correctly, add these secrets under **Settings → Secrets and variables → Actions** in your GitHub repository:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `SANITY_API_TOKEN`

---

## Architecture Decisions

| Decision | Rationale |
|---|---|
| Separate public + authenticated Sanity clients | `sanityFetch` uses the CDN-backed public client for all ISR reads; the authenticated client is reserved for draft/preview mode — keeps public traffic fast and cheap |
| `sanitize-html` on all CMS HTML output | CMS editors can inject arbitrary HTML; whitelisting allowed tags/attributes prevents stored XSS without blocking legitimate rich content |
| Zod + server action for contact form | Validation runs server-side even if JS is disabled; no client-side-only guard that can be bypassed |
| Cloudflare Turnstile over reCAPTCHA | Privacy-friendly, no user friction on most devices, free tier |
| Biome over ESLint + Prettier | Single tool, ~10× faster, zero config drift between linting and formatting |
| Conventional Commits enforced via commitlint + Husky | Enables automated changelog generation and makes `git log` meaningful |

[![CI](https://github.com/edson-junior/milanized-client/actions/workflows/unit.yml/badge.svg)](https://github.com/edson-junior/milanized-client/actions)
[![E2E](https://github.com/edson-junior/milanized-client/actions/workflows/e2e.yml/badge.svg)](https://github.com/edson-junior/milanized-client/actions)
[![Lighthouse](https://github.com/edson-junior/milanized-client/actions/workflows/lighthouse.yml/badge.svg)](https://github.com/edson-junior/milanized-client/actions)
[![Vercel](https://vercelbadge.vercel.app/api/milanized/milanized-client)](https://milanized.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![pnpm](https://img.shields.io/badge/pnpm-10.x-f69220?logo=pnpm)](https://pnpm.io/)

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines and best practices.
