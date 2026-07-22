# EvenX Website

Marketing website for **EvenX** — a mobile expense-splitting app (iOS + Android). Built with Next.js 14 App Router, TypeScript, and Tailwind CSS v3. Deployed on **Vercel** from the `develop` branch.

**Live site:** https://www.evenx.io
**Production API:** https://api.evenx.io (set via `NEXT_PUBLIC_API_URL`)

## Stack

- **Framework:** Next.js 14 (App Router, `app/` directory)
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS v3 with custom theme in `tailwind.config.ts`
- **Font:** Plus Jakarta Sans via `next/font/google`
- **Package manager:** Yarn 1.x
- **Node:** >=18.14.0

## Commands

```bash
yarn dev          # Start dev server
yarn build        # Production build (uses NEXT_PUBLIC_API_URL env var)
yarn type-check   # TypeScript check without emitting
yarn lint         # ESLint
```

## Project structure

```
app/                          # Next.js App Router pages
  page.tsx                    # Homepage (composes all section components)
  layout.tsx                  # Root layout (font, metadata, globals.css)
  globals.css                 # Tailwind directives + component classes + contact_field styles
  split-expenses/             # Split expenses calculator (interactive tool)
  split-bills-app/            # SEO intent landing page
  expense-splitting-app/      # SEO intent landing page
  shared-expense-tracker/     # SEO intent landing page
  forgot-password/            # Auth page (POST to API)
  reset-password/             # Auth page (POST to API, uses passwordStrength)
  verify-email/               # Auth page (GET to API)
  account-deletion/           # Static info page
  robots.ts / sitemap.ts / manifest.ts
  opengraph-image.tsx / twitter-image.tsx  # Generated OG images (next/og, NOT Tailwind)
components/
  Navbar.tsx                  # Glassmorphic fixed header, mobile menu
  Hero.tsx                    # Gradient hero with floating cards, store CTAs
  Features.tsx                # 6 feature cards in 3-column grid
  AppShowcase.tsx             # Dark section with 3 phone screenshots
  About.tsx                   # 2-column grid with stats and phone
  HomeIntentLinks.tsx         # 4 teaser cards linking to intent pages
  Faq.tsx                     # Accordion using native <details>/<summary>
  Contact.tsx                 # Contact form (client component, POST to API)
  Footer.tsx                  # Dark 4-column footer
  AnimateOnScroll.tsx         # Intersection Observer scroll animations (client component)
  AuthPageShell.tsx           # Shared auth page wrapper (gradient bg, white card, logo)
  IntentLandingPage.tsx       # Shared template for SEO intent pages
  PhoneFrame.tsx              # Phone mockup with 3D rotation support
  Icon.tsx                    # Inline SVG icon component
  SeoJsonLd.tsx               # JSON-LD structured data injector
  SplitExpensesTool.tsx       # Interactive expense calculator (client component, 1060 lines)
  SplitExpensesTool.module.css # CSS module for calculator interior (kept for complex responsive breakpoints)
lib/
  constants.ts                # Store URLs (iOS App Store, Google Play)
  seo.ts                      # Site config, metadata builder, FAQ items, JSON-LD builders
  passwordStrength.ts         # Password strength calculator (0-5 scale)
  splitExpenses.ts            # Expense calculation engine (pure logic)
config/
  api.ts                      # API base URL + endpoint constants
```

## Critical rules

### Do not modify these files (backend logic)
- `config/api.ts` — API configuration and endpoint constants
- `lib/passwordStrength.ts` — Password strength validation
- `lib/splitExpenses.ts` — Expense calculation engine

### API-connected pages (preserve fetch calls exactly)
- `components/Contact.tsx` — POST to `ENDPOINTS.CONTACT_SUBMIT` with `{ name, email, subject, message }`
- `app/forgot-password/page.tsx` — POST to `ENDPOINTS.FORGOT_PASSWORD` with `{ email }`
- `app/reset-password/page.tsx` — POST to `ENDPOINTS.RESET_PASSWORD` with `{ token, newPassword }`
- `app/verify-email/page.tsx` — GET to `ENDPOINTS.VERIFY_EMAIL?token=...`

### Styling conventions
- All components use Tailwind utility classes (no inline style objects, no CSS-in-JS)
- Exception: `SplitExpensesTool.module.css` is kept for complex interior responsive breakpoints
- Exception: `PhoneFrame.tsx` uses inline `style` for dynamic 3D transforms
- Exception: `opengraph-image.tsx` / `twitter-image.tsx` use `next/og` (cannot use Tailwind)
- Brand colors: primary indigo `#6366f1`, violet accent `#8b5cf6`, slate neutrals
- Custom Tailwind classes in globals.css: `site-container`, `section-pad`, `btn-primary`, `btn-secondary`, `store-button`
- Custom shadows: `shadow-primary-sm/md/lg`, `shadow-card`, `shadow-card-hover`, `shadow-glow`, `shadow-phone`, `shadow-nav`
- Custom gradients: `bg-gradient-primary`, `bg-gradient-hero`, `bg-gradient-dark`
- Custom animations: `animate-float-slow`, `animate-float-medium`, `animate-pulse-dot`, `animate-fade-in-up`

### SEO
- Each page exports `metadata` via `buildMetadata()` from `lib/seo.ts`
- JSON-LD structured data: WebSite, Organization, SoftwareApplication, FAQPage, BreadcrumbList, HowTo
- Intent pages use `IntentLandingPage` component with `breadcrumbName` and `breadcrumbPath` props
- `robots.ts` disallows auth pages and account-deletion
- `sitemap.ts` includes all public routes
- FAQ items are in `lib/seo.ts` (shared between Faq component and FAQPage JSON-LD)

### Deployment
- Merges to `develop` auto-deploy on Vercel
- `NEXT_PUBLIC_API_URL` must be set in Vercel environment (production: `https://api.evenx.io`)

## Icon names available
`bolt`, `calculator`, `users`, `chart-pie`, `mobile`, `shield`, `sync`, `heart`, `download`, `apple`, `google-play`, `paper-plane`, `check`, `error`, `spinner`, `check-circle`, `mail-open`, `eye`, `eye-slash`, `home`, `redo`, `warning`, `trash`, `menu`, `close`, `arrow-right`, `star`, `chevron-down`
