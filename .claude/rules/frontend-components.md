---
paths:
  - "frontend/src/**/*.tsx"
  - "frontend/src/**/*.ts"
---

# Frontend component architecture

Every page in this app is composed the same way, rooted in `App.tsx`:

```
<Theme themeKey="...">
  <Header />   <!-- props come from Theme, based on themeKey -->
  {children}   <!-- the current page's content — not a component of its own -->
  <Footer />   <!-- props come from Theme, based on themeKey -->
</Theme>
```

- **`Theme`** is the root component, rendered in `App.tsx`. It takes a `themeKey` prop and, based on its value, decides which props to pass down to `Header` and `Footer` (logo, nav links, color variant, legal links, or whatever else varies per theme). New pages/features don't invent their own header/footer logic — they render inside `Theme` and let it drive that.
- **`Header`** renders the page header. Its content is driven by props coming from `Theme` via `themeKey`, not decided by the page itself. It accepts a prop to hide it entirely for pages that shouldn't show one.
- **Body / page content** is not a component of its own — it's whatever `Theme` renders as `children`: the current route's page. A "page" is just what goes between `Header` and `Footer`.
- **`Footer`** mirrors `Header`: props come from `Theme` via `themeKey`, and it also accepts a prop to hide it.

Follow this structure for any new page or feature: don't build a page-specific header/footer, and don't have a page reach into `Theme`'s theming logic directly — it goes through `themeKey` and the props `Theme` computes from it.

**Accessibility tie-in** (see the root `CLAUDE.md`'s "Accessibility requirements"): `Header` must render as a `<header>` landmark, `Footer` as a `<footer>` landmark, and `Theme` must wrap the body content in `<main>` — that's what satisfies the "one landmark per role" structure required project-wide. When `Header`/`Footer` are hidden via their hide prop, they must be removed from the accessibility tree too (unmount them, don't just hide them with CSS a screen reader would still announce).
