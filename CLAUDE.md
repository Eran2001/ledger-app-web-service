# WorkerOs Web Control Plane — Claude Guidelines.

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

| Category         | Forbidden pattern            | Use instead                                |
| ---------------- | ---------------------------- | ------------------------------------------ |
| Font size        | `text-{xs/sm/base/lg/xl…}`   | `t-*` (size + weight bundled)              |
| Font weight      | `font-{thin/light/bold…}`    | `fw-*`                                     |
| Letter spacing   | `tracking-{tight/wide…}`     | `[letter-spacing:var(--tracking-*)]`       |
| Line height      | `leading-{tight/relaxed…}`   | `[line-height:var(--leading-*)]`           |
| Text transform   | `uppercase` `capitalize` …   | `text-uppercase` `text-capitalize`         |
| Color / bg-color | `text-gray-*` `bg-slate-*` … | semantic token classes                     |
| Border color     | `border-gray-*` …            | `border-default` `border-brand` …          |
| Border radius    | `rounded-*`                  | `md-rounded` `lg-rounded` `full-rounded` … |
| Interactive      | inline `hover:` / `focus:`   | `btn-brand` `sidebar-nav-*`                |
| Text decoration  | `underline` `line-through` … | `decoration-*`                             |

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

## index.css File Organization

`src/index.css` is organized into 8 numbered, banner-commented sections, in this exact cascade order.
When adding new CSS, find the matching section below — don't append randomly or create a new top-level block.

| #   | Section              | Purpose                                                                                                                                                                                                                                                                                                                                                                    |
| --- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | `:root`              | Light mode tokens. Raw design values — always full `hsl(...)`, never bare numbers. Everything downstream references these; never hardcode a color anywhere else.                                                                                                                                                                                                          |
| 2   | `.dark`               | Dark mode overrides. Same variable **names** as `:root`, different **values**. This is the _only_ place dark mode happens — never add a `.dark` override anywhere else.                                                                                                                                                                                                   |
| 3   | `@theme`              | Design tokens NOT tied to light/dark (fonts, shadows, spacing scale, breakpoints, animations). Real Tailwind config — generates utilities like `font-sans`, `shadow-card`.                                                                                                                                                                                                |
| 4   | `@theme inline`       | Bridges `:root`/`.dark` vars into Tailwind's naming convention (`--color-*`, `--radius-*`) so `bg-primary`, `rounded-lg` etc. work. Always reference vars — never hardcode a hex/hsl here, or dark mode silently breaks for that token.                                                                                                                                  |
| 5   | `@layer base`         | Element resets & global defaults. WEAKEST layer. Targets raw HTML elements (`*`, `body`, `h1`, `a`) — never class names.                                                                                                                                                                                                                                                  |
| 6   | `@layer utilities`    | Atomic, single-purpose classes (1-3 properties): typography scale, color/rounding/spacing helpers. STRONGEST layer besides no-layer — always beats `@layer components` automatically.                                                                                                                                                                                     |
| 7   | `@layer components`   | Multi-property reusable patterns (`.btn-base`, `.card-base`). MIDDLE layer — beats base, loses to utilities, intentionally, so a utility can override one property without a fight.                                                                                                                                                                                       |
| 8   | No layer              | Third-party overrides & escape hatches. STRONGEST in the whole cascade, beats utilities too. Reserved for overriding library-injected styles (Radix, Sonner, react-international-phone) and browser quirks (autofill, webkit scrollbar). Keep this section SMALL — if you're tempted to put your own classes here "to be safe," they belong in `@layer utilities` instead. |

---

## Cascading for CSS

CSS cascade strength, strongest to weakest (top wins). Know this before reaching for `!important` or no-layer CSS.

1. **Inline `style=""` + `!important` anywhere** — Highest possible priority in the whole system. `style="color: red !important"` beats literally everything below it, no exceptions.

2. **Browser / OS level injected styles** — Not your CSS at all — Chrome's own internal UA styles (e.g. `input:-webkit-autofill` yellow background, default `<select>` arrow, default checkbox look). This is WHY no-layer + `!important` is required to beat it — your stylesheet (even unlayered) is still "author CSS," and the browser's own internal style sits ABOVE all author CSS by default. `!important` on YOUR rule is what lets your author CSS jump above that browser-injected style. → This is the actual reason the autofill hack needs `!important`. It's not fighting your own utilities, it's fighting Chrome itself.

3. **Inline `style=""` (no `!important`)** — Style attributes written directly in HTML/JSX, OR injected live by a JS library (Sonner, Radix, react-international-phone). Beats ANY selector in your stylesheet, layered or not, because inline style has a fixed specificity above classes/ids in the normal cascade.

4. **No layer (your own unlayered author CSS)** — Any CSS you write OUTSIDE `@layer` blocks. Beats `@layer utilities`, `@layer components`, `@layer base` — all of them — automatically, by cascade layer rules. No `!important` needed UNLESS you're also fighting #2 or #3 above (browser UA styles or inline styles from a library). → Reserved for: 3rd-party override patches, browser quirk fixes, vendor CSS overrides.

5. **`@layer utilities`** — Atomic, single-purpose classes (`.text-main`, `.pill-rounded`). Beats `@layer components` and `@layer base` automatically. Never needs `!important` to win against your own components — that's the whole point of using layers in the first place.

6. **`@layer components`** — Multi-property reusable patterns (`.btn-base`, `.card-base`). Beats `@layer base`. Loses to `@layer utilities` — intentional, so a utility class can always override one property of a component without a fight.

7. **`@layer base`** — Element resets & global defaults (`*`, `body`, `h1`, `a`). Weakest of your own layers. Designed to be overridden by everything above it — that's its entire job.

> **The one-line takeaway:** No-layer beats your OWN layered CSS automatically (layer rule). `!important` is ONLY needed when fighting something that ISN'T your CSS — browser-injected UA styles, or inline styles written/injected by a JS library. Two different problems, two different tools.

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

## Responsive Spacing Constants

The app supports all breakpoints (`xs` → `8xl`). For layout properties that repeat the same breakpoint scale across multiple components (e.g. `px`, `py`, `min-h`, `gap`, `w`, `max-w`), extract them into `src/constants/responsive.ts` instead of duplicating inline.

**Rules:**

- Group constants by **layout context** (e.g. `layout`, `header`, `footer`, `page`, `card`, `section`, `emptyState`, `modal`) — not just by property name, because different areas use different scale values
- Each context object holds only the properties relevant to it (e.g. `header` needs `minH`, `footer` needs `minH`, `page` needs `px/py/gap`)
- Export as a single `R` object (`as const`) — import with `import { R } from "@/constants/responsive"`
- Do **not** create this file until the full set of sections and values has been explicitly agreed with the user — the scale values differ per context and must be intentional

---

## Shadcn Component Rule

**Never modify any file in `src/components/ui/` without explicitly asking the user first.**
These are the base UI primitives. Always confirm before making any change, no matter how small.

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

---

## Custom Hooks Rules

- Always prefix with use
- Sidebar and auth pages use the styled **WorkerOs.AI** text logo (icon + text), not the dunner files
- Do **not** delete the dunner logo files from assets

---

---

## Handler Naming

```
// ✅ always handle prefix
const handleSubmit = () => {}
const handleDelete = () => {}
const handleModalOpen = () => {}

// ❌
const onSubmit = () => {}
const deleteItem = () => {}
const openModal = () => {}
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
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/auth-store";

// ❌
import { Button } from "../../components/ui/button";
```

---

## Component Size Limit

One component must never exceed **200 lines**. Split into smaller sub-components if needed.

---

## Export Rules

| Location                    | Export Type      | Reason                                        |
| --------------------------- | ---------------- | --------------------------------------------- |
| `src/pages/**/index.tsx`    | `export default` | Required for `React.lazy()` code splitting    |
| `src/components/layout/`    | `named export`   | Tree shaking + consistent imports             |
| `src/components/shared/`    | `named export`   | Tree shaking + consistent imports             |
| `src/components/ui/`        | `named export`   | Follows shadcn convention                     |
| `src/pages/home/components` | `named export`   | Bundled with root, never lazy-loaded directly |

### Rules

- Every page folder has an `index.tsx` as the **root component** — this is the only file that uses `export default`
- All child components inside a page folder use **named exports**
- `React.lazy()` always points to the page root (`index.tsx`) — never to child components directly
-

```tsx
// ✅ src/pages/dashboard/index.tsx — root, lazy loadable
const DashboardPage = () => { ... }
export default DashboardPage

// ✅ src/pages/dashboard/dashboard-stats.tsx — child, named
export const DashboardStats = () => { ... }

// ✅ src/components/shared/sale-card.tsx
export const SaleCard = () => { ... }

// ✅ Router
const DashboardPage = React.lazy(() => import('@/pages/dashboard'))
```

---

## Arrow Function Rule

- Use **arrow functions** for all components, helpers, hooks, and methods by default
- Avoid `function` declarations unless there is a specific technical reason (e.g. hoisting required)
- Keep all new code consistent with arrow-function style
-

```tsx
// ✅ Correct
export const DashboardStats = () => { ... }
export const formatCurrency = (amount: number) => { ... }

// ❌ Avoid
export function DashboardStats() { ... }
```

---

## Notifications

Always use `Notification` from `@/utils/notification`. Never import `toast` directly from `"sonner"`.

```ts
// ✅ Correct
import { Notification } from "@/utils/notification";
Notification.success("Sale created.");
Notification.error("Something went wrong.");

// ❌ Wrong — direct sonner import
import { toast } from "sonner";
toast.success("Sale created.");

// ❌ Wrong — shadcn hook
import { useToast } from "@/hooks/use-toast";
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

| What            | Convention   | Example                                |
| --------------- | ------------ | -------------------------------------- |
| File names      | `kebab-case` | `sale-card.tsx`, `dashboard-stats.tsx` |
| Component names | `PascalCase` | `SaleCard`, `DashboardStats`           |
| Page root files | `index.tsx`  | `src/pages/dashboard/index.tsx`        |
| Zustand stores  | `kebab-case` | `auth-store.ts`, `theme-store.ts`      |
| Query files     | `kebab-case` | `auth-queries.ts`                      |
| Schema files    | `kebab-case` | `sale-schema.ts`                       |

> **Why kebab-case for files?** Avoids case-sensitivity bugs across Windows/Mac/Linux and prevents Git from missing renames.
> **Why PascalCase for components?** React requires it — lowercase JSX tags are treated as HTML elements.

```

```
