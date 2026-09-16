# AI Agent Guidelines & Architecture Standards

Welcome to the **Inventus Global** Next.js codebase. All AI assistants, automated coding agents, and contributors must adhere to the standards outlined below.

---

## 1. CSS & Styling Architecture (STRICT)

### The Rule: Never Bloat `globals.css`
- **`src/app/globals.css` is strictly a manifest index** (~20 lines). It must ONLY contain `@import` directives for modular stylesheets.
- **NEVER** write new CSS classes, component styles, or page-level overrides directly into `globals.css`.

### Directory Structure: `src/styles/`
Global stylesheets are modularized by domain:
- `src/styles/variables.css`: Design tokens, colors, typography, hairlines, shadows.
- `src/styles/base.css`: Reset, base typography tags, `.container`.
- `src/styles/header.css`: Header, navigation, mega menu, mobile navigation drawer.
- `src/styles/footer.css`: Luxury footer, newsletter bar, bottom bar.
- `src/styles/home-sections.css`: Main homepage sections.
- `src/styles/blog.css`: Blog listing & single article view.
- `src/styles/contact.css`: Contact page, forms, trust chips, FAQs.
- `src/styles/modals.css`: Contact modal and lead popups.
- `src/styles/responsive.css`: Global breakpoint overrides.

### New Components: Mandatory CSS Modules
When creating ANY new component:
1. Always create a colocated `[ComponentName].module.css` (e.g., `src/components/MyWidget.module.css`).
2. Scope styles via `styles.className` in JSX.
3. Keep component-specific media queries within that component's `.module.css`.

### Tokens & Colors
Always use established design tokens from `variables.css`:
- `--primary`: `#f16334`
- `--primary-hover`: `#df4e1f`
- `--font-heading`: `'Poppins', sans-serif`
- `--font-body`: `'DM Sans', sans-serif`
- `--max-width`: `1240px`

---

## 2. Next.js 15 & React 19 Patterns
- Use Next.js App Router conventions (`src/app/`).
- Mark client components explicitly with `"use client";` at the top when using hooks (`useState`, `useEffect`, `useRef`).
- Server components should remain default where interactivity is not required.
- Always check TypeScript types and build validity using `npm run build` after completing modifications.
