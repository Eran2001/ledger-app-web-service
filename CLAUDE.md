# CLAUDE.md — Project Rules & Conventions

## 🚫 No Build Commands

Never run build commands (`npm run build`, `vite build`, `tsc`, etc.). Only run dev servers or install dependencies when explicitly asked.

---

## 🔔 Notifications

Always use the `Notification` utility from `@/utils/notification`. Never import `toast` directly from `"sonner"`, and never use the shadcn `useToast` hook.

```tsx
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

## 📦 Stack

| Concern                 | Library         |
| ----------------------- | --------------- |
| UI Components           | shadcn/ui       |
| Styling                 | Tailwind CSS v4 |
| State Management        | Zustand         |
| Server State / Fetching | React Query     |
| Tables                  | TanStack Table  |
| Routing                 | TanStack Router |
| Animation               | GSAP            |

---

## 📐 Component Size Limit

**One component must never exceed 200 lines.** Split into smaller sub-components if needed.

---

## 📤 Export Rules

- **Pages** (`src/pages/`) → always `export default`
- **Local components** (`src/components/layout/`, `src/components/sales/`, `src/components/shared/`) → always `export default`
- **Global/shared UI primitives** (`src/components/ui/` — shadcn and any reusable design-system pieces) → always named exports (`export function`, `export const`)

```tsx
// ✅ Page — default export
export default function DashboardPage() { ... }

// ✅ Local component — default export
export default function RecordPaymentModal() { ... }

// ✅ shadcn / UI primitive — named export
export function Button() { ... }
export const Card = React.forwardRef(...);
```

---

## ➡️ Arrow Function Rule

- Use arrow functions for React components, helpers, and methods by default.
- Avoid `function` declarations unless there is a specific technical reason to use them.
- Keep new code consistent with arrow-function style across the codebase.

---

## 🔤 Typography Rules

### The Golden Rule

> **Never hardcode typography utility classes inside components.**
> All typography lives exclusively in `index.css` via semantic class aliases.

Inside components, **only alignment classes are allowed directly** (e.g. `text-left`, `text-center`, `text-right`).

Everything else — font size, weight, family, tracking, leading, decoration, transform, etc. — must be defined in `index.css` as a named semantic class using `@apply`.

### ✅ Allowed in components

```jsx
// Only alignment/layout intent — fine in JSX
<p className="text-center">Hello</p>
<h1 className="text-left">Title</h1>
```

### ❌ Never in components

```jsx
// WRONG — typography utilities hardcoded in JSX
<p className="text-sm font-medium tracking-wide text-gray-600">Hello</p>
<h1 className="text-4xl font-bold leading-tight">Title</h1>
```

### ✅ Correct pattern — define in `index.css`

```css
/* index.css */
@layer components {
  .heading-1 {
    @apply text-4xl font-bold leading-tight tracking-tight;
  }

  .body-sm {
    @apply text-sm font-normal leading-relaxed text-gray-600;
  }

  .label-caps {
    @apply text-xs font-semibold uppercase tracking-widest;
  }
}
```

```jsx
/* Component */
<h1 className="heading-1 text-center">Title</h1>
<p className="body-sm">Description</p>
```

---

## 📋 Full Typography Class Reference

The following Tailwind classes **must only appear inside `index.css`**, never in component files.

### Font Family

`font-sans` `font-serif` `font-mono`

### Font Size

`text-xs` `text-sm` `text-base` `text-lg` `text-xl` `text-2xl` `text-3xl` `text-4xl` `text-5xl` `text-6xl` `text-7xl` `text-8xl` `text-9xl`

### Font Weight

`font-thin` `font-extralight` `font-light` `font-normal` `font-medium` `font-semibold` `font-bold` `font-extrabold` `font-black`

### Font Style

`italic` `not-italic`

### Font Variant Numeric

`normal-nums` `ordinal` `slashed-zero` `lining-nums` `oldstyle-nums` `proportional-nums` `tabular-nums` `diagonal-fractions` `stacked-fractions`

### Letter Spacing

`tracking-tighter` `tracking-tight` `tracking-normal` `tracking-wide` `tracking-wider` `tracking-widest`

### Line Height

`leading-none` `leading-tight` `leading-snug` `leading-normal` `leading-relaxed` `leading-loose` `leading-3` `leading-4` `leading-5` `leading-6` `leading-7` `leading-8` `leading-9` `leading-10`

### Text Align _(only these are allowed directly in components)_

`text-left` `text-center` `text-right` `text-justify` `text-start` `text-end`

### Text Color

`text-inherit` `text-current` `text-transparent` `text-black` `text-white` `text-{color}-{50–950}`

### Text Decoration

`underline` `overline` `line-through` `no-underline`

### Text Decoration Color

`decoration-inherit` `decoration-current` `decoration-transparent` `decoration-{color}-{shade}`

### Text Decoration Style

`decoration-solid` `decoration-double` `decoration-dotted` `decoration-dashed` `decoration-wavy`

### Text Decoration Thickness

`decoration-auto` `decoration-from-font` `decoration-0` `decoration-1` `decoration-2` `decoration-4` `decoration-8`

### Text Underline Offset

`underline-offset-auto` `underline-offset-0` `underline-offset-1` `underline-offset-2` `underline-offset-4` `underline-offset-8`

### Text Transform

`uppercase` `lowercase` `capitalize` `normal-case`

### Text Overflow

`truncate` `text-ellipsis` `text-clip`

### Text Wrap

`text-wrap` `text-nowrap` `text-balance` `text-pretty`

### Text Indent

`indent-0` `indent-px` `indent-0.5` `indent-1` `indent-1.5` `indent-2` `indent-2.5` `indent-3` `indent-3.5` `indent-4` `indent-5` `indent-6` `indent-7` `indent-8` `indent-9` `indent-10` `indent-11` `indent-12` `indent-14` `indent-16` `indent-20` `indent-24` `indent-28` `indent-32` `indent-36` `indent-40` `indent-44` `indent-48` `indent-52` `indent-56` `indent-60` `indent-64` `indent-72` `indent-80` `indent-96`

### Vertical Align

`align-baseline` `align-top` `align-middle` `align-bottom` `align-text-top` `align-text-bottom` `align-sub` `align-super`

### Whitespace

`whitespace-normal` `whitespace-nowrap` `whitespace-pre` `whitespace-pre-line` `whitespace-pre-wrap` `whitespace-break-spaces`

### Word Break

`break-normal` `break-words` `break-all` `break-keep`

### Hyphens

`hyphens-none` `hyphens-manual` `hyphens-auto`

### Content

`content-none`

---

## 🔒 TypeScript Strictness

**Never use `any` or `unknown` as a type.** Always use the exact, correct type.

```tsx
// ✅ Correct
function handleChange(e: React.ChangeEvent<HTMLInputElement>) { ... }
const items: Product[] = []
const id: string = params.id

// ❌ Wrong
function handleChange(e: any) { ... }
const items: unknown[] = []
```

If you don't know the type, derive it from the source — use `typeof`, `ReturnType<>`, `Parameters<>`, or define a proper interface. `any` is never acceptable, even temporarily.

---

## 🔡 Naming Conventions

- **File names** → `kebab-case` (e.g. `tab-select.tsx`, `sale-card.tsx`)
- **Component names inside the file** → `PascalCase` (e.g. `function TabSelect`, `function SaleCard`)

```tsx
// ✅ File: sale-card.tsx
export default function SaleCard() { ... }

// ✅ File: tab-select.tsx
export function TabSelect() { ... }
export function TabPanel() { ... }
```
