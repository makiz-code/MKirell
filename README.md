# MKirell — Portfolio

Personal portfolio built with **Vue 3** + **Vite** + **Tailwind CSS**.  
Supports English, French, and Arabic (RTL).

---

## Requirements

- [Node.js](https://nodejs.org/) v18 or later
- npm v9 or later (bundled with Node)

---

## Setup

```bash
npm install
```

---

## Development

```bash
npm run dev
```

Opens at `http://localhost:5173` with hot-module replacement.

To switch language, append `?lang=fr` or `?lang=ar` to the URL:

```text
http://localhost:5173/?lang=fr
http://localhost:5173/?lang=ar
```

---

## Production build

```bash
npm run build
```

Output goes to `dist/`. To preview the production build locally:

```bash
npm run preview
```

---

## Project structure

```text
├── index.html                  # Entry point (JSON-LD, Open Graph, hreflang)
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── public/
│   ├── robots.txt
│   └── sitemap.xml
└── src/
    ├── main.js                 # App entry, registers v-reveal directive
    ├── style.css               # CSS variables, Tailwind directives, global styles
    ├── App.vue                 # Root component
    ├── data/
    │   └── portfolio.js        # All content in EN / FR / AR
    ├── composables/
    │   ├── useLanguage.js      # Reactive language state (singleton)
    │   └── useTypewriter.js    # Typewriter effect composable
    ├── directives/
    │   └── reveal.js           # v-reveal scroll-reveal directive
    ├── utils/
    │   └── text.js             # boldify() — **text** → <strong>
    └── components/
        ├── AppNav.vue
        ├── HeroSection.vue
        ├── AboutSection.vue
        ├── SkillsSection.vue
        ├── ExperienceSection.vue
        ├── ProjectsSection.vue
        ├── EducationSection.vue
        ├── ContactSection.vue
        └── AppFooter.vue
```

---

## Editing content

All text content lives in [`src/data/portfolio.json`](src/data/portfolio.json).  
Each locale (`en`, `fr`, `ar`) mirrors the same structure — edit in one language and replicate the change to the others.
