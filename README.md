# Rachana Builders — Bhavnagar · Website

A premium marketing website for **Rachana Builders**, a RERA-registered real-estate developer in
Bhavnagar, Gujarat (est. 2017) — built around their flagship **Rachana Victoria** collection.

> *"Crafting Quality, Building Trust"* · Highest standards of quality · Useful detailing · Value for money.

The firm had **no existing website** — this site was built from scratch and populated entirely with
publicly-available information about the company (directory listings, RERA records).

## Real company information used
- **Company:** Rachana Builders — a partnership firm, **established 2017** (owner: B Rawal).
- **Office:** Shop No. 319, 3rd Floor, Eva Surbhi Complex, Waghawadi Road, Bhavnagar – 364001, Gujarat.
- **Phone:** +91 93277 87878 (primary) · +91 94279 09192 · +91 94285 90382.
- **Positioning:** "a premier real estate company with its main focus on providing projects with the
  highest standards of quality"; "builds each home painstakingly … quality, useful detailing & value."
- **100% RERA-registered** (Gujarat RERA; Victoria 18 = PAA06542).
- **Projects — the Rachana Victoria collection:**
  | Project | Type | Location | Status | Real render? |
  |---|---|---|---|---|
  | Rachana Victoria 18 | **Residential** (gated plots) | Subhashnagar, Bhavnagar | Delivered | — (procedural art) |
  | Rachana Victoria Prime | Commercial (offices/shops/showrooms) | Kaliyabid, Bhavnagar | Ready | ✅ |
  | Rachana Victoria Heights | Commercial (showrooms/offices) | **Vidyanagar**, Bhavnagar | Ready | ✅ |
  | Rachana Victoria Edge | Commercial (showrooms/offices) | Sidsar, Bhavnagar | Under construction (2027) | — (procedural art) |
  | Rachana Victoria Corporate | Commercial (corporate offices) | Krishna Nagar, Bhavnagar | Under construction (2027) | ✅ |

## Design
- **Identity:** a custom royal "Victoria" look — **deep navy + antique gold** with an elegant gold
  "R" monogram logo (Playfair serif). Cyan powers the glitch accent.
- **Glitch** hero/title effects, **smooth** reveal-on-scroll, animated counters, sticky header,
  scroll-progress bar.
- **Real project renders** for Victoria Prime, Heights & Corporate (downloaded from public listings);
  the other two projects + all decorative panels use generated SVG architecture (navy skylines/towers
  with lit gold windows), so nothing can break.
- Fully responsive, keyboard-friendly, respects `prefers-reduced-motion`.

## Pages (11)
Home · Residential · Commercial · Projects (Victoria Collection) · Locations · About Rachana ·
Why Rachana · Our Journey (Delivered) · Blogs · Careers · Contact.

## Structure
```
rachana-builders/
├── index.html + 10 page files
└── assets/
    ├── css/main.css          # design system (navy+gold tokens, glitch, animations)
    └── js/
        ├── components.js      # logo + header/footer/nav injection
        ├── projects.js        # the Rachana Victoria dataset + card renderer
        ├── art.js             # procedural SVG architecture (navy/gold)
        └── main.js            # reveals, counters, filters, tabs, accordion, scroll UI
```

## Run locally
```bash
cd rachana-builders
python3 -m http.server 5247   # → http://localhost:5247
```

> **⚠️ Before launch:**
> - **Phone numbers are real** (client-provided). **Emails (@rachanabuilders.in) are placeholders** —
>   no public email was found.
> - **Logo** is the client's real "R" mark (`assets/img/logo.png`, processed to a transparent white R).
> - **Project renders** for Prime/Heights/Corporate are real — Prime from the official brochure, the
>   other two from a listing portal with the watermark **cropped out**. Victoria 18 & Edge have no
>   public exterior render (procedural art used).
> - **Floor plans** (real, from the client's `FloorPlans/` PDFs) power a click-to-enlarge gallery on
>   the Prime (2), Corporate (3) and Edge (2) cards — `assets/js/lightbox.js` + `floorplans/` images.
> - Blog posts and exact possession dates are illustrative — verify against RERA/company records.
> - Forms are front-end demos (wire to a backend or Formspree). Asset links carry a `?v=r2` cache-buster.
