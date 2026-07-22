# Cameron Cruz — Landing Page + Dashboard

Dark, editorial landing page (VSL, testimonials, booking calendar, contact form) with an admin dashboard, built for **Cloudflare Workers** with **D1** and **Resend**.

## Structure

```
public/            Static site (served by Cloudflare assets)
  index.html       Landing page
  dashboard/       Admin dashboard (calendar + contacts)
  privacy-policy.html, refund-policy.html, terms.html, 404.html
  assets/          Videos & images — see assets/README.md for expected filenames
src/worker.js      API: contact, newsletter, booking, availability, admin
schema.sql         D1 schema (contacts, bookings)
wrangler.jsonc     Cloudflare config
```

## Setup

```bash
npm install

# 1. Create the D1 database (once), then paste its id into wrangler.jsonc
npx wrangler d1 create cameron-landing

# 2. Apply the schema
npm run db:schema

# 3. Secrets
npx wrangler secret put RESEND_API_KEY   # from resend.com (verify your sending domain)
npx wrangler secret put ADMIN_KEY        # password for /dashboard

# 4. Deploy
npm run deploy
```

Update `NOTIFY_EMAIL` / `FROM_EMAIL` in `wrangler.jsonc` — `FROM_EMAIL` must use a domain verified in Resend.

## Local development

```bash
npm run db:schema:local
npm run dev
```

## How booking works

1. Visitor picks a weekday + 30-min slot (`/api/availability` hides taken slots) and books (`/api/book`).
2. Booking is stored in D1; Resend emails a notification to you and a confirmation to the visitor.
3. On `/dashboard` (protected by `ADMIN_KEY`) you see the calendar + contacts, paste the Zoom link, and hit **Confirm + send link** — the visitor gets the Zoom link by email.

## Cookie consent

Bottom banner on first visit: **Accept All** / **Reject Non-Essential**, choice stored in `localStorage` (`cc-cookie-consent`), links to `/privacy-policy`, fully keyboard-navigable with ARIA labels. To gate analytics on consent, listen for the `cookie-consent` CustomEvent in `app.js`.
