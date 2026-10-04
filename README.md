# LEUCO JUBATUS — Full E-commerce Foundation

A custom Next.js + TypeScript storefront for LEUCO JUBATUS, designed for Sri Lanka and LKR.

## Included
- Luxury responsive storefront, collection/shop pages and product pages
- Product variants (size/color), inventory-ready Prisma models and demo catalogue fallback
- Browser cart, Sri Lankan checkout fields, COD/bank transfer/PayHere payment choices
- Server-side order validation and server-authoritative pricing
- PayHere notify endpoint with signature verification; browser redirects/screenshots never mark orders paid
- Order confirmation/tracking UI, admin dashboard foundation
- About, contact, size guide, shipping, returns, FAQ, privacy and terms
- Sitemap, robots, OpenGraph metadata and security headers

## Run locally
1. Install Node.js 20+.
2. `npm install`
3. Copy `.env.example` to `.env`. The site previews with demo catalogue data even without a database.
4. For live persistence, create PostgreSQL and set `DATABASE_URL`.
5. `npx prisma generate`
6. `npx prisma migrate dev --name init`
7. `npm run dev`

## Before production
The project intentionally does **not** invent merchant credentials or admin secrets. Before launch, connect: PostgreSQL, a production identity/session provider for RBAC, cloud image storage, PayHere approved merchant credentials, transactional email, rate limiting, backups and monitoring. Add admin CRUD server actions/API routes behind verified ADMIN/STAFF authorization.

### PayHere security
`/api/payments/payhere/notify` verifies the server callback signature. Never update `paymentStatus=PAID` from a return URL, browser JavaScript, user screenshot or unverified request. Confirm the current PayHere integration requirements against your approved merchant account before launch.
