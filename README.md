# Chukwuemeka Olaraonye — Portfolio

Personal site for Chukwuemeka Olaraonye — MSc Computer Science researcher
(neural collaborative filtering for e-commerce recommendation) based in
Gaborone, Botswana.

Live at **[chemz.tech](https://chemz.tech)** (see `CNAME`).

## Stack

React 19 · TypeScript · Vite · Tailwind CSS v4 · lucide-react

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build    # production build to dist/
npm run preview  # serve the production build
```

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the
site and publishes `dist/` to GitHub Pages.

## Layout

| Path | Purpose |
|---|---|
| `App.tsx` | Every page section and the case-study modal |
| `constants.tsx` | All site content — projects, research, skills, experience |
| `types.ts` | Shapes for that content |
| `index.css` | Design tokens: violet/citron palette, light + dark ramps |
| `Chukwuemeka_Olaraonye_CV.pdf` | Served by the Download CV button |

To update the CV, replace that PDF and keep the filename (it is imported in
`App.tsx`). To change content, edit `constants.tsx` — not the markup.
