# WorkerOs Web Control Plane — Claude Guidelines

---

## Tech Stack

| Concern       | Library                                 |
| ------------- | --------------------------------------- |
| Framework     | React + Vite + TypeScript               |
| Styling       | Tailwind CSS v4 + Shadcn/ui             |
| State         | Zustand (UI) + TanStack Query (server)  |
| Routing       | React Router v6                         |
| Icons         | Lucide React (via `@/components/icons`) |
| Notifications | Sonner (toasts)                         |
| HTTP          | Axios                                   |

---

## Font

**Plus Jakarta Sans** is the only font used across the entire app — every page, every component.

- Loaded via Google Fonts in `index.html`
- Set as `--font-sans` in `index.css` `@theme` block
- Never use any other font family

---

## CSS Rules

### Forbidden in Component JSX

| Category         | Forbidden pattern            | Use instead                                  |
| ---------------- | ---------------------------- | -------------------------------------------- |
| Font size        | `text-{xs/sm/base/lg/xl…}`   | `t-*` (size + weight bundled)                |
| Font weight      | `font-{thin/light/bold…}`    | `fw-*`                                       |
| Letter spacing   | `tracking-{tight/wide…}`     | `[letter-spacing:var(--tracking-*)]`         |
| Line height      | `leading-{tight/relaxed…}`   | `[line-height:var(--leading-*)]`             |
| Text transform   | `uppercase` `capitalize` …   | `text-uppercase` `text-capitalize`           |
| Color / bg-color | `text-gray-*` `bg-slate-*` … | semantic token classes                       |
| Border color     | `border-gray-*` …            | `border-default` `border-brand` …            |
| Border radius    | `rounded-*`                  | `md-rounded` `lg-rounded` `full-rounded` …   |
| Interactive      | inline `hover:` / `focus:`   | `btn-brand` `sidebar-nav-*`                  |
| Text decoration  | `underline` `line-through` … | `decoration-*`                               |

### Allowed in Component JSX

| Category         | Allowed classes                           |
| ---------------- | ----------------------------------------- |
| Text alignment   | `text-left/center/right/justify`          |
| Text overflow    | `truncate` `text-ellipsis` `text-clip`    |
| Text wrap        | `text-wrap/nowrap/balance/pretty`         |
| Whitespace       | `whitespace-normal/nowrap/pre/pre-line/…` |
| Word break       | `break-normal/words/all/keep`             |
| Vertical align   | `align-baseline/top/middle/bottom`        |
| Text indent      | `indent-*`                                |
| Hyphens          | `hyphens-none/manual/auto`                |
| Layout / spacing | `padding` `margin` `gap` `flex` `grid` …  |

---

## Semantic Typography Classes (`src/index.css @layer utilities`)

### Size + weight combos (`t-*`) — use these first

| Class            | Size     | Weight   | Use for                            |
| ---------------- | -------- | -------- | ---------------------------------- |
| `t-hero`         | 2.25rem  | bold     | Hero numbers                       |
| `t-kpi-lg`       | 1.875rem | bold     | Large KPI values                   |
| `t-kpi`          | 1.5rem   | bold     | KPI numbers, page stats            |
| `t-section`      | 1.25rem  | bold     | Section titles                     |
| `t-display`      | 1.125rem | bold     | Card titles, modal headings        |
| `t-display-soft` | 1.125rem | semibold | Softer display headings            |
| `t-heading`      | 1.125rem | semibold | General headings                   |
| `t-title`        | 1rem     | bold     | Page titles                        |
| `t-nav`          | 1rem     | medium   | Nav items                          |
| `t-body`         | 1rem     | normal   | Primary body text                  |
| `t-meta`         | 0.875rem | medium   | Table cells, metadata              |
| `t-meta-bold`    | 0.875rem | bold     | Emphasized metadata                |
| `t-caption`      | 12px     | medium   | Captions, timestamps, small labels |
| `t-caption-bold` | 12px     | bold     | Emphasized captions                |
| `t-micro`        | 11px     | medium   | Micro labels, role tags            |
| `t-micro-bold`   | 11px     | bold     | Emphasized micro text              |

### Weight overrides (`fw-*`)

| Class         | Weight   |
| ------------- | -------- |
| `fw-normal`   | normal   |
| `fw-medium`   | medium   |
| `fw-semibold` | semibold |
| `fw-bold`     | bold     |
| `fw-black`    | black    |

### Text transform

`text-uppercase` · `text-lowercase` · `text-capitalize`

### Text decoration (`decoration-*`)

| Class                  | Effect       |
| ---------------------- | ------------ |
| `decoration-underline` | underline    |
| `decoration-overline`  | overline     |
| `decoration-strike`    | line-through |
| `decoration-none`      | no-underline |

---

## Component Rules

- Never use `any` or `unknown` — type everything explicitly
- Functions over 50 lines must be split
- Prefer explicit over clever — no magic
- One page = one constants file in `src/constant/` (e.g. `overview-data.ts`)
- Dummy/static data always lives in `src/constant/`, never inline in components
- No comments unless the WHY is non-obvious

---

## File Structure

```
src/
  components/
    icons/          # re-exports from lucide-react
    partials/       # layout pieces (Sidebar, TopBar, etc.)
    ui/             # shadcn primitives
  config/           # app-wide config constants (env vars, API base URL, feature flags)
  constant/         # one file per page for static data/config
  hooks/            # custom React hooks — reusable stateful logic
  layouts/          # DefaultLayout, AuthLayout
  lib/              # third-party lib setup (axios instance, query client, date helpers)
  pages/            # one folder per route
  queries/          # TanStack Query hooks — queries and mutations per feature
  schemas/          # Zod validation schemas for forms and API response shapes
  services/         # Axios API service functions — raw HTTP calls only
  stores/           # Zustand stores
  types/            # shared TypeScript types
  utils/            # pure utility functions
```

---

## Colour Tokens

All colours are CSS HSL variables in `index.css @layer base`. Never hardcode hex values — always reference the token.

| Role                 | Hex       | CSS Variable         |
| -------------------- | --------- | -------------------- |
| Primary (indigo)     | `#4F46E5` | `--primary`          |
| Secondary (slate)    | `#64748B` | `--muted-foreground` |
| Tertiary (teal)      | `#0D9488` | `--tertiary`         |
| Neutral / Background | `#F8FAFC` | `--background`       |

### Usage

| Token     | When to use                                                  |
| --------- | ------------------------------------------------------------ |
| Primary   | Active nav, CTAs, focus rings, progress bars                 |
| Secondary | Muted labels, placeholder text, secondary icons              |
| Tertiary  | Success states, healthy/operational badges                   |
| Neutral   | Page background (`bg-background`), card surfaces (`bg-card`) |

> Dark mode vars live in `@layer base .dark { … }` — keep them in sync when adding new tokens.

---

## Logo

- Two files in `src/assets/images/`: `dunner-logo.png` (full) and `dunner-logo-sm.png` (icon)
- Sidebar and auth pages use the styled **WorkerOs.AI** text logo (icon + text), not the dunner files
- Do **not** delete the dunner logo files from assets

---

## No Build Commands

Never run build commands (`npm run build`, `vite build`, `tsc`, etc.). Only run dev servers or install dependencies when explicitly asked.

---

## Import Alias

`@/` maps to `src/` — always use it, never use relative paths like `../../`.

```ts
// ✅
import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/stores/auth-store"

// ❌
import { Button } from "../../components/ui/button"
```

---

## Component Size Limit

One component must never exceed **200 lines**. Split into smaller sub-components if needed.

---

## Export Rules

| Location                    | Export type      | Example                               |
| --------------------------- | ---------------- | ------------------------------------- |
| `src/pages/`                | `export default` | `export default function Dashboard`   |
| `src/components/layout/`    | `export default` | `export default function TopBar`      |
| `src/components/shared/`    | `export default` | `export default function SaleCard`    |
| `src/components/ui/`        | named export     | `export function Button`              |

---

## Arrow Function Rule

- Use arrow functions for components, helpers, and methods by default
- Avoid `function` declarations unless there is a specific technical reason
- Keep all new code consistent with arrow-function style

---

## Notifications

Always use `Notification` from `@/utils/notification`. Never import `toast` directly from `"sonner"`.

```ts
// ✅ Correct
import { Notification } from "@/utils/notification"
Notification.success("Sale created.")
Notification.error("Something went wrong.")

// ❌ Wrong — direct sonner import
import { toast } from "sonner"
toast.success("Sale created.")

// ❌ Wrong — shadcn hook
import { useToast } from "@/hooks/use-toast"
```

---

## TypeScript Rules

- Never use `any` or `unknown` — always use the exact correct type
- Derive types from source when needed: `typeof`, `ReturnType<>`, `Parameters<>`
- Define proper interfaces — no implicit `any`, not even temporarily

```ts
// ✅
function handleChange(e: React.ChangeEvent<HTMLInputElement>) { ... }
const items: Product[] = []

// ❌
function handleChange(e: any) { ... }
const items: unknown[] = []
```

---

## Naming Conventions

| What            | Convention   | Example                           |
| --------------- | ------------ | --------------------------------- |
| File names      | `kebab-case` | `sale-card.tsx`, `tab-select.tsx` |
| Component names | `PascalCase` | `SaleCard`, `TabSelect`           |
| Zustand stores  | `kebab-case` | `auth-store.ts`, `theme-store.ts` |
| Query files     | `kebab-case` | `auth.queries.ts`                 |
| Schema files    | `kebab-case` | `sale.schema.ts`                  |
