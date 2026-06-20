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
├── index.html                  # Entry point (Open Graph, hreflang)
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
    ├── assets/
    │   └── flags/              # Flag SVGs (gb, fr, tn)
    ├── data/
    │   ├── portfolio.json      # Display content — person, metaLocales, locales (en/fr/ar)
    │   └── jsonld.json         # Schema.org JSON-LD @graph per locale (en/fr/ar)
    ├── composables/
    │   ├── useLanguage.js      # Reactive language state (singleton)
    │   ├── useJsonLd.js        # Injects/updates <script type="application/ld+json"> on lang change
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

### Display content

All UI text lives in [`src/data/portfolio.json`](src/data/portfolio.json), structured as:

```text
{
  "person"       — static contact/social fields (email, phone, linkedin, location…)
  "metaLocales"  — per-locale metadata (lang code, direction, hreflang label)
  "locales": {
    "en" / "fr" / "ar" — nav, hero, about, skills, experience, projects, education, contact, footer
  }
}
```

Edit in one locale and mirror the change to the others.

### Structured data (SEO)

Schema.org JSON-LD lives in [`src/data/jsonld.json`](src/data/jsonld.json) as three fully-formed `@graph` documents (one per locale). The `useJsonLd` composable injects the correct graph into `<head>` on mount and whenever the language changes — no build step required.
