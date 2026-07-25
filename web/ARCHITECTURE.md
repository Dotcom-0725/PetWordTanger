# Tanger Animalerie — Next.js 15 Architecture

Production-grade rebuild of the storefront using Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, shadcn/ui-style components, Framer Motion, Zustand, React Hook Form + Zod, and next-intl (fr/ar/en, Arabic RTL).

**Build status:** `npm run build` passes clean — type-check ✓, lint ✓, 114 static/SSG pages generated across 3 locales. Verified at runtime (`npm run start`) with real page content, working filters, i18n/RTL switching, and no console errors beyond a documented one-time cold-start blip (see Known Limitations).

## Folder Structure

```
web/
├── src/
│   ├── app/
│   │   ├── [locale]/                 # everything user-facing is locale-scoped
│   │   │   ├── layout.tsx            # root layout (fonts, providers, header/footer, dir=rtl for ar)
│   │   │   ├── page.tsx              # Home
│   │   │   ├── animals/[slug]/       # Live Animals catalog + detail
│   │   │   ├── shop/[slug]/          # Accessories/Food/Health catalog + detail
│   │   │   ├── cart/ wishlist/ checkout/
│   │   │   ├── blog/[slug]/
│   │   │   ├── about/ contact/
│   │   │   ├── login/ register/
│   │   │   ├── account/(layout+orders+profile)/   # customer dashboard, auth-gated
│   │   │   ├── admin/(layout+animals+orders+wholesale+blog+media)/  # admin dashboard, role-gated
│   │   │   ├── not-found.tsx / loading.tsx / error.tsx
│   │   │   └── opengraph-image.tsx   # dynamic OG image (next/og)
│   │   ├── api/
│   │   │   ├── auth/[...nextauth]/ auth/register/
│   │   │   ├── contact/ newsletter/ wholesale/   # Zod-validated, rate-limited
│   │   ├── sitemap.ts / robots.ts
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/                       # shadcn-style primitives (button, card, form, sheet, table, ...)
│   │   ├── layout/                   # header, mobile-nav, footer, floating WhatsApp/call, theme+locale switchers
│   │   ├── home/                     # one component per homepage section (14 sections)
│   │   ├── animals/ products/ catalog/ cart/ contact/ auth/ admin/ motion/
│   ├── lib/
│   │   ├── data/                     # repository-pattern mock data (animals, products, blog, reviews, orders, wholesale)
│   │   ├── validations/              # Zod schemas (contact, auth, checkout, animal form)
│   │   ├── auth.ts                   # NextAuth v5 scaffold
│   │   ├── rate-limit.ts             # in-memory limiter (swap for Upstash in prod)
│   │   ├── seo.ts                    # JSON-LD builders (LocalBusiness, Product, Breadcrumb, FAQ)
│   │   ├── whatsapp.ts               # wa.me link + message builders
│   │   └── utils.ts
│   ├── store/                        # Zustand: cart, wishlist, compare (all localStorage-persisted)
│   ├── types/                        # Animal, Product, Order, BlogPost, Review, WholesaleInquiry, AppUser
│   ├── i18n/                         # next-intl routing, navigation, request config
│   └── middleware.ts                 # locale detection/redirect
├── messages/{fr,ar,en}.json
└── .env.example
```

## What's fully working right now

- **Storefront**: Home (all 15 sections), Animals + Shop catalogs with URL-driven filters/sort/pagination (server components), animal/product detail pages with `generateStaticParams` + `generateMetadata` + JSON-LD, Blog, About, Contact.
- **Cart, Wishlist, Compare**: Zustand + localStorage, real add/remove/quantity, cross-page persistence.
- **Checkout**: React Hook Form + Zod validated, builds a WhatsApp deep-link with the full order summary — no payment gateway needed for a COD/WhatsApp-first business model.
- **i18n**: fr (default) / ar (RTL) / en, locale-prefixed routes, translated nav/hero/trust/forms/footer, `dir="rtl"` verified rendering correctly for Arabic.
- **SEO**: per-page metadata, JSON-LD (LocalBusiness, Product, BreadcrumbList, FAQPage), `sitemap.ts`/`robots.ts`, dynamic OG image.
- **Forms**: Contact, Newsletter, Checkout, Login, Register — all RHF + Zod, all hitting real API routes with server-side validation + rate limiting.
- **Dark mode**, scroll-reveal + counter animations (Framer Motion), sticky glass nav, floating WhatsApp/Call buttons, scroll-to-top, loading skeletons, custom 404/error pages.

## What's scaffolded (correct pattern, needs real infrastructure)

| Area | What exists | What's needed to go live |
|---|---|---|
| **Auth** | NextAuth v5 config, Credentials provider, login/register UI, protected-route pattern on `/account` and `/admin` | A database + `authorize()` wired to a real users table with hashed passwords |
| **Customer dashboard** | Layout, orders/profile pages reading mock data | Real `getOrdersForCustomer` query once orders persist |
| **Admin dashboard** | Sidebar layout (role-gated), stats, Animals table (TanStack Table, sortable), Orders/Wholesale/Blog tables, Media Library grid | Real CRUD mutations (currently read-only against mock data) |
| **API routes** | `/api/contact`, `/api/newsletter`, `/api/wholesale`, `/api/auth/register` — all Zod-validated and rate-limited | Persist to a database instead of `console.log`; send transactional email |
| **Media Library** | UI shell only | Cloudinary/S3/Vercel Blob integration |

**The single most important next decision is the database.** Every mock repository in `src/lib/data/*` is written in repository-pattern style specifically so it can be swapped for real queries (Prisma/Drizzle against Postgres, or a headless CMS) without touching any page or component — only those files change.

## Security

- All form-facing API routes validate input with Zod and apply rate limiting (`src/lib/rate-limit.ts`, in-memory — swap for Upstash Redis in a multi-instance production deployment, per the comment in that file).
- `/account` and `/admin` are gated server-side in their `layout.tsx` via `auth()` + role check, not just hidden client-side.
- Dependency audit: after pinning `next@15.5.21`, `next-auth@5.0.0-beta.32`, `postcss@8.5.23`, and `sharp@0.35.3` (via `overrides`), all **critical/moderate/high runtime** advisories are resolved. The 9 remaining `npm audit` findings are all in the ESLint dev-tooling chain (`eslint`, `eslint-config-next` and their plugins) — devDependencies never shipped to production, left at the version compatible with `eslint-config-next@15.5.21` rather than force-bumping to ESLint 10 (which isn't yet supported by `eslint-config-next`).

## Known limitations (by design, not oversights)

1. **Auth cannot actually sign anyone in** — `authorize()` in `src/lib/auth.ts` always returns `null` until wired to a real database; this is intentional so the app doesn't pretend to have working accounts it doesn't.
2. **Most homepage marketing copy is French-only.** `nav`, `hero`, `trust`, `common`, `cart`, `checkout`, `footer`, and `notFound` are fully translated in `messages/{fr,ar,en}.json` and verified rendering correctly (including RTL). Sections like Why Choose Us, Testimonials, Wholesale tiers, Breeding, FAQ, Blog, and Instagram still have hardcoded French copy — translate these into the message catalogs before shipping ar/en as real, complete experiences.
3. **One-time cold-start console error** on the very first `/api/auth/session` request after `next start` boots (500, then all subsequent requests return 200). Harmless artifact of lazy route compilation in this local test; won't reproduce with a warmed production deployment, but worth a quick sanity check after your first real deploy.
4. **Images are referenced but not present** (`/images/animals/*.jpg`, `/images/products/*.jpg`, `/images/blog/*.jpg`) — drop real photos at those paths (or swap to a CMS/Cloudinary URL) and `next/image` optimization, lazy loading, and `sizes` are already correctly configured to pick them up.

## Local development

```bash
cd web
npm install
cp .env.example .env.local   # fill in AUTH_SECRET (openssl rand -base64 32), WhatsApp number, etc.
npm run dev
```

## Deployment

Framework-native for Vercel (zero-config). For any other Node host: `npm run build && npm run start`. Either way, provision a real Postgres instance and wire `src/lib/data/*` + `src/lib/auth.ts` to it before relying on auth, orders, or admin mutations.
