# Frederick's Kitchen

Website, booking engine, and admin panel for Frederick's Kitchen — a coffee estate
stay and restaurant in Chikmagaluru.

Built for Nakshatra Namaha Creations · proposal ref NNC/WEB/FRK/120626.

Next.js 16 (App Router) · React 19 · Tailwind v4 · Framer Motion · Lenis.

---

## Running it

```bash
npm install
npm run dev          # http://localhost:3000
```

```bash
npm run build && npm start   # production build
```

Nothing needs configuring to run locally. Without a `RESEND_API_KEY`, confirmation
emails are printed to the server log instead of sent, so the whole booking flow is
testable straight away.

**Admin panel:** `/admin` — password comes from `ADMIN_PASSWORD` in `.env.local`
(currently `fredericks2026` for local dev; change before launch).

---

## The ten modules

| # | Module | Where |
|---|--------|-------|
| 01 | Homepage — hero, three CTAs, testimonials | `src/app/page.tsx`, `src/components/home/` |
| 02 | Fine Dining — full menu, chef specials, private dining, WhatsApp | `src/app/dining/` |
| 03 | Premium Rooms — all types, amenities, availability link | `src/app/rooms/` |
| 04 | Experiences — biker routes, plantation walk, private events | `src/app/experiences/` |
| 05 | Booking Engine — rooms + tables, availability, email confirm | `src/app/book/`, `src/app/api/` |
| 06 | Admin Panel — all bookings, status updates | `src/app/admin/` |
| 07 | Gallery — filterable, lightbox | `src/app/gallery/` |
| 08 | Contact & About — story, contact, map | `src/app/about/` |
| 09 | SEO & Analytics — metadata, JSON-LD, sitemap, GA4 | `src/app/layout.tsx`, `sitemap.ts`, `robots.ts` |
| 10 | Hosting | deploy step, below |

Per the proposal, the booking engine collects **no payment** — it's an
inquiry/call-to-confirm flow. The admin panel does status only: no invoicing, no
billing, no accounting.

---

## Editing content

**Almost all client-editable copy lives in one file: `src/lib/site.ts`.**

Phone, address, email, WhatsApp number, social links, room types and prices, the
whole menu, experiences, testimonials, gallery captions, and table sitting times.
Change it there and it updates everywhere, including the SEO structured data.

Room amenity lists, menu prices, and chef's-special flags are all plain data — no
markup to touch.

---

## Photography

The site ships with art-directed gradient panels where the commissioned photos go.
They're deliberate, not broken.

To drop in real photos, put them in `public/` and pass `src` to the `Frame`
component — it renders the image instead of the gradient with no other changes:

```tsx
<Frame src="/rooms/estate-suite.jpg" alt="The Estate Suite verandah" className="h-96" />
```

`Frame` is used by every page, so this is the only component to touch.

---

## Configuration

Copy `.env.example` to `.env.local` and fill in what you need.

| Variable | Needed | What it does |
|----------|--------|--------------|
| `ADMIN_PASSWORD` | For `/admin` | The password staff type in. |
| `ADMIN_SECRET` | **Production** | Signs the session cookie. `openssl rand -hex 32`. The app refuses to start in production without it. |
| `RESEND_API_KEY` | To send email | From resend.com. Omit → emails log instead of send. |
| `BOOKING_FROM` | With Resend | Must be a verified domain on the Resend account. |
| `NEXT_PUBLIC_GA_ID` | Analytics | GA4 ID (`G-XXXXXXXXXX`). Omit → no script loads at all. |
| `NEXT_PUBLIC_GSC_VERIFICATION` | Search Console | The `content=` value from the HTML-tag verification method. |

Also update `site.url` in `src/lib/site.ts` to the live domain — canonical URLs,
Open Graph, and the sitemap all derive from it.

---

## How bookings are stored

Bookings live in `data/bookings.json`, a file-backed store (`src/lib/store.ts`).
This is a deliberate choice: the property takes a handful of bookings a day and a
database would be scaffolding nobody asked for.

Two things worth knowing:

- **Writes are serialised and atomic.** Availability is decided *inside* the write
  transaction, so two guests booking the last room in the same instant cannot both
  win. Verified with ten concurrent requests: exactly one `201`, nine `409`s.
- **`data/` is gitignored** — it's real guest data.

To move to a real database later, swap `readAll`/`writeAll` in `src/lib/store.ts`.
Nothing above that file changes.

> **Deploy note:** this needs a persistent disk. On Vercel's serverless filesystem
> the JSON store won't survive between invocations — use a VPS, Railway, Render, or
> a Vercel deploy with the store swapped for a database. Any Node host with a real
> disk works as-is.

### Availability rules

- Rooms are one-of-a-kind: any live booking blocks those nights.
- Dates are **half-open** — a checkout on the 5th frees the room for a check-in on
  the 5th.
- Cancelling a booking releases its nights immediately.
- The dining room seats 24 per sitting; a slot closes when the seats are gone.

---

## Deploying

1. Point `site.url` at the live domain.
2. Set `ADMIN_SECRET` and a real `ADMIN_PASSWORD`.
3. Add `RESEND_API_KEY` + a verified `BOOKING_FROM` to turn emails on.
4. Add `NEXT_PUBLIC_GA_ID` and verify in Search Console.
5. `npm run build && npm start` behind a reverse proxy, on a host with a
   persistent disk.
6. Submit `https://<domain>/sitemap.xml` to Search Console.

`/admin` and `/api/` are disallowed in `robots.txt`, and the admin page sends
`noindex`.

---

## SEO

Targets the audiences in the proposal: `coffee estate stay Chikmagaluru`,
`biker stay Chikmagaluru`, `plantation stay`, `fine dining Chikmagaluru`.

- Per-page titles, descriptions, and canonicals.
- JSON-LD: `Hotel` + `Restaurant` on the homepage, `Menu` on dining, room `Offer`s
  on rooms.
- `sitemap.xml` and `robots.txt` generated at build.
- Mobile-first and statically prerendered — every public page is `○ (Static)`.
