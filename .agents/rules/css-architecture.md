---
description: Enforces scalable CSS architecture and prevents monolithic styles dumping in globals.css
globs: ["**/*.css", "**/*.tsx", "**/*.ts", "**/*.jsx", "**/*.js"]
---

# Scalable CSS Architecture Rules for Inventus Global

All AI agents and developers working on this codebase MUST strictly follow these rules to maintain code quality, maintainability, and optimal performance:

## 1. Zero Tolerance for Monolithic `globals.css`
- **NEVER** append component-specific, page-specific, or section-specific styles into `src/app/globals.css`.
- `src/app/globals.css` is strictly an import manifest (~20 lines) and MUST NOT contain raw CSS classes or styling declarations.

## 2. Directory & Style Organization (`src/styles/`)
Shared global styles are partitioned into domain-specific files under `src/styles/`:
- `src/styles/variables.css`: `:root` design tokens, color palette, font declarations, shadows, hairlines.
- `src/styles/base.css`: CSS reset, base HTML tags (`body`, `h1-h6`, `a`, `button`, `img`), `.container` layout wrapper, and phase badges.
- `src/styles/header.css`: Header, navbar, services mega menu dropdown, and mobile navigation drawer.
- `src/styles/footer.css`: Luxury footer, newsletter bar, and copyright strip.
- `src/styles/home-sections.css`: Core homepage sections (hero, spotlight, services, future cards, marquee, CTA).
- `src/styles/blog.css`: Blog listing grid and single article view typography.
- `src/styles/contact.css`: Contact page hero, trust chips, contact form, and FAQ accordion.
- `src/styles/modals.css`: Contact popup modal and lead capture overlays.
- `src/styles/responsive.css`: Universal cross-breakpoint adjustments (320px–1024px).

When modifying existing shared styles, ALWAYS edit the corresponding file in `src/styles/`.

## 3. Styling Protocol for NEW Components (CSS Modules Mandatory)
Whenever you create a new React component or self-contained section:
1. **Always use CSS Modules**: Name the file `[ComponentName].module.css` in the same directory as the component (or in `src/components/`).
2. **Import and apply classes locally**:
   ```tsx
   import styles from './MyComponent.module.css';
   
   export default function MyComponent() {
     return <div className={styles.container}>...</div>;
   }
   ```
3. **Do NOT declare global classes** for new components unless explicitly requested by the user.

## 4. Use Design Tokens & Variables
- Always reference CSS custom properties defined in `src/styles/variables.css` rather than hardcoding hex codes or arbitrary values:
  - Primary Orange: `var(--primary)` (#f16334)
  - Primary Hover: `var(--primary-hover)` (#df4e1f)
  - Primary Subtle: `var(--primary-subtle)` / `var(--primary-light)`
  - Accent Amber: `var(--accent-yellow)` (#f59e0b)
  - Dark Slate: `var(--bg-dark)` / `var(--text-heading)` (#0f172a)
  - Headings Font: `var(--font-heading)` ('Poppins', sans-serif)
  - Body Font: `var(--font-body)` ('DM Sans', sans-serif)
  - Max Width: `var(--max-width)` (1240px)

## 5. Responsive Design Best Practices
- Place component-specific media queries inside the component's `.module.css` file.
- Keep mobile styles clean and maintain touch target accessibility (minimum 44x44px for buttons/links).
