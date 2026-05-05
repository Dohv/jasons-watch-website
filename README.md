# MYTIME26 — Demo Site

A multi-page editorial luxury watch dealer demo. Built with React + Vite.

## Run locally

You'll need [Node.js](https://nodejs.org) installed (any recent version).

```bash
npm install
npm run dev
```

Then open http://localhost:5173 in your browser.

## Deploy to Vercel (free, ~3 minutes)

The fastest way to get a real shareable URL:

### Option A — Drag & drop (easiest)

1. Run `npm install` then `npm run build` in this folder
2. Go to [vercel.com/new](https://vercel.com/new) and sign in (free account, GitHub login works)
3. Look for the "Deploy from a folder" option, or drag the entire `dist` folder onto the page
4. You'll get a live URL like `killing-time-demo.vercel.app`

### Option B — Via GitHub (recommended for updates)

1. Create a free GitHub account if you don't have one
2. Create a new repository, upload all these files
3. Go to [vercel.com/new](https://vercel.com/new) → "Import Git Repository"
4. Select your repo → click Deploy
5. Done. Future changes pushed to GitHub auto-deploy.

### Option C — Netlify (similar, also free)

1. Run `npm install` then `npm run build`
2. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
3. Drag the `dist` folder onto the page
4. Instant live URL

## Project structure

```
killing-time-demo/
├── index.html          ← page shell
├── package.json        ← dependencies
├── vite.config.js      ← build config
└── src/
    ├── main.jsx        ← React entry point
    └── App.jsx         ← the entire site (all 5 pages)
```

## Pages included

- Home (hero, inventory grid, story, sell process, reviews, concierge CTA)
- Shop / Inventory (with brand filter)
- Product Detail
- Sell / Trade (with full multi-step form UI)
- About

## Notes

This is a **visual demo**. The forms don't submit, the inventory is hardcoded.
For a real site, the next step would be wiring up Sanity (or similar CMS) for
content management, plus Formspree/Resend for form submissions.
