# Chaparla Monish: Portfolio

A series-style portfolio where sections are episodes and projects are "Originals".

- Live (Vercel): https://monish-portfolio-rho.vercel.app
- Live (GitHub Pages): https://monishchaparla.github.io

## Tech

TypeScript, React 18, Vite, Tailwind CSS 4, Framer Motion. Resume generation uses Node.js
(the `docx` library for Word, headless Chrome for PDF). Image processing uses sharp.

## Run it

```bash
npm install
npm run dev        # local dev server
npm run build      # production build into dist/
```

## Update the content

All text lives in `src/data.ts`. Edit it once, then rebuild both outputs:

```bash
npm run resume     # writes the resume PDF and DOCX into resume/ and public/
npm run build      # rebuilds the site
```

To swap photos, put the originals in `photos/` and run `npm run images`.

## Deploy

Every push to `main` deploys to Vercel (connected to this repository) and to
GitHub Pages (via `.github/workflows/pages.yml`).
