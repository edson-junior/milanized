This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

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
- **Triggers:** pull requests targeting `main` only — does **not** run on direct pushes to `main`
- **Steps:** `pnpm build` → `lhci autorun` against `http://localhost:3000/` and `/blog`
- **Budgets:** performance ≥ 0.7, accessibility ≥ 0.9, best-practices ≥ 0.9, SEO ≥ 0.9 (configured in `.lighthouserc.json`)
- **Artifacts:** `.lighthouseci/` results uploaded for 14 days
- **Required secrets:** `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`

> **Note:** Lighthouse only runs on PRs. Push to a branch and open a pull request to `main` to trigger it.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
