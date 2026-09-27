# CLAUDE.md

Guidance for Claude Code when working in this repository. Read this before making changes.

## Project overview

FlowSync is a team task-management practice app, built with two independent packages:

- `backend/` — AdonisJS 7 API (TypeScript, ESM, SQLite via Lucid ORM, token-based auth).
- `frontend/` — React 19 SPA (TypeScript, Vite).

**Accessibility is a first-class requirement, not an afterthought.** Every UI feature must be usable with a keyboard and a screen reader, and should follow the guidance at the W3C Web Accessibility Initiative: https://www.w3.org/WAI/design-develop/. See "Accessibility requirements" below before writing or reviewing any frontend code.

## Current state (read before picking up a ticket)

- **Backend auth is already implemented.** Routes (`backend/start/routes.ts`):
  - `POST /api/v1/auth/signup` and `POST /api/v1/auth/login` are public and return `{ user, token }`.
  - `GET /api/v1/account/profile` and `POST /api/v1/account/logout` require auth.
  - The default guard (`config/auth.ts`) is `api`, a **stateless Bearer token guard** (`@adonisjs/auth` access tokens) — not cookies/sessions. Any authenticated request from the frontend needs `Authorization: Bearer <token>` using the `token` returned by login/signup. A `web` session guard is also configured but is not the default; don't switch to it without asking, since it changes how the frontend must store/send credentials.
  - Validation rules (email/password shape) live in `backend/app/validators/user.ts`; keep using `vine` validators for new endpoints rather than validating ad hoc in controllers.
- Don't assume a fetch strategy (raw `fetch`, a `@tuyau/client`, axios, a router library) — check with the user before adding any new frontend dependency.
- CORS (`backend/config/cors.ts`) already allows the Vite dev origin in development (`origin: true` when `app.inDev`) with `credentials: true`, so cross-origin requests from `http://localhost:5173` to `http://localhost:3333` work out of the box in dev.

## Commands

Run these from inside the relevant package folder (`backend/` or `frontend/`), not the repo root — there is no root `package.json`.

### Backend (`backend/`)

| Command | Purpose |
|---|---|
| `npm run dev` | Start the API with hot reload (`ace serve --hmr`), on `http://localhost:3333` |
| `npm run build` | Production build (`ace build`) |
| `npm test` | Run the Japa test suite |
| `npm run lint` | ESLint (`@adonisjs/eslint-config`) |
| `npm run format` | Prettier (`@adonisjs/prettier-config`) |
| `npm run typecheck` | `tsc --noEmit` |

First-run setup (per `README.md`): `.env` from `.env.example`, `node ace generate:key`, `node ace migration:run`. Run `node ace migration:run` again after adding/changing a migration.

### Frontend (`frontend/`)

| Command | Purpose |
|---|---|
| `npm run dev` | Vite dev server, on `http://localhost:5173` |
| `npm run build` | Type-check (`tsc -b`) + production build |
| `npm run lint` | oxlint |
| `npm run preview` | Preview the production build locally |

**Before considering any task done:** run `lint` and `typecheck`/`build` in whichever package you touched, and `npm test` if you touched the backend. Fix failures yourself; don't hand back broken code.

## Code style

- TypeScript everywhere, ESM modules (`type: module`). Don't introduce CommonJS `require`.
- Backend: follow the existing ESLint/Prettier config as-is; don't add a different linter/formatter. Use the `#alias/*` subpath imports already defined in `backend/package.json` (`#controllers/*`, `#models/*`, `#validators/*`, etc.) instead of long relative paths.
- Frontend: follow `.oxlintrc.json`. No UI library or CSS framework is installed — prefer plain, semantic HTML/CSS matching the existing `App.css`/`index.css` conventions unless the user asks otherwise.
- Match the style of the surrounding file. Don't reformat unrelated code in the same diff.
- No comments that just restate the code; comment only non-obvious logic.

## Accessibility requirements

Every frontend change must meet WCAG 2.2 level AA and follow the practices at https://www.w3.org/WAI/design-develop/ (start there for tutorials on forms, images, tables, menus, and media if unsure how to implement a specific component accessibly). Concretely:

- **Semantic HTML first.** Use native elements (`<button>`, `<nav>`, `<main>`, `<label>`, `<table>`, …) instead of `<div>`/`<span>` with ARIA bolted on. Only reach for ARIA roles/attributes when there is no native equivalent, following the WAI-ARIA Authoring Practices Guide (APG) for the exact pattern.
- **Keyboard operability.** Every interactive element must be reachable and operable with `Tab`/`Shift+Tab`/`Enter`/`Space`/arrow keys as appropriate, with a visible focus indicator. Never remove focus outlines without providing an equally visible replacement, and never trap keyboard focus (except intentionally inside an open modal, with a documented escape route).
- **Text alternatives.** Every `<img>` needs meaningful `alt` text (or `alt=""` if purely decorative, as the starter already does for the hero image). Icons used as controls need an accessible name (`aria-label` or visible text) — note the starter's `<svg role="presentation" aria-hidden="true">` pattern for purely decorative icons.
- **Forms.** Every input has a visible, programmatically associated `<label>`. Errors are announced (e.g. `aria-describedby` + `role="alert"`) and not conveyed by color alone. This applies directly to any login/signup form: label the email and password fields, use `<button type="submit">` (not a `<div>` with an `onClick`), and surface backend validation/auth errors (e.g. "invalid credentials" from `POST /api/v1/auth/login`) through an `aria-live`/`role="alert"` region, not just red text.
- **Color and contrast.** Text and meaningful UI elements meet WCAG 2.2 AA contrast ratios (4.5:1 normal text, 3:1 large text/graphics). Never use color as the only way to convey information or state.
- **Structure and landmarks.** Pages have one `<h1>`, a logical heading order, and landmark elements (`<header>`, `<nav>`, `<main>`, `<footer>`) so screen reader users can navigate by structure.
- **Motion and dynamic content.** Respect `prefers-reduced-motion`; announce dynamic content changes (e.g. loading states, toasts) via `aria-live` regions rather than assuming sighted users will notice them visually.
- **`frontend/index.html`** must keep an accurate `lang` attribute and a descriptive `<title>` per page/view.

There is currently no automated accessibility testing configured. When adding meaningful UI, propose adding `eslint-plugin-jsx-a11y` (lint-time checks) and/or `axe-core`/`vitest-axe` (runtime checks in tests) rather than relying on manual review alone — ask before adding new dependencies.

## Testing

- Backend: Japa is wired up (`backend/tests/bootstrap.ts`, with `apiClient`, `authApiClient`, `sessionApiClient` plugins already registered) but no test suites exist yet — the auth endpoints have no tests. Add/update tests for any endpoint, model, or validator you touch. Run `npm test` in `backend/` before finishing.
- Frontend: no test runner is set up yet. If you add one, prefer Vitest + React Testing Library (it queries by accessible role/label, which doubles as an accessibility check) — confirm with the user first since it's a new dependency.
- Manually verify UI changes with keyboard-only navigation at minimum; call this out explicitly when summarizing frontend work.

## Git / workflow notes

- Don't commit `.env` files (already gitignored) — only `.env.example`.
- Keep backend and frontend changes in separate, focused commits when a task touches both.
- Follow whatever branch-naming/PR-target instructions are given in `README.md` for this exercise (fork-based workflow, PR against the course's upstream repo) — don't invent a different git workflow.

## Things to avoid

- Don't add new runtime dependencies (npm packages) without flagging it and getting confirmation first — this matters especially on the frontend, which currently has almost none.
- Don't disable lint rules, type errors, or accessibility-relevant attributes (e.g. removing `alt`, `label`, focus styles) to make something "just work" — fix the underlying issue instead.
- Don't restructure `backend/app/*` module boundaries (controllers/models/validators/transformers) — AdonisJS conventions rely on this layout.
- Don't switch the default auth guard from `api` (token-based) to `web` (session-based), or vice versa, without explicit confirmation — it changes the contract the frontend must implement.
