# Ledger App — Web Service

A store management web app for tracking installment-based sales, customers, products, and overdue payments.

---

## Tech Stack

| Concern          | Library               |
| ---------------- | --------------------- |
| Framework        | React 19 + TypeScript |
| Build Tool       | Vite 6                |
| Styling          | Tailwind CSS v4       |
| UI Components    | shadcn/ui + Radix UI  |
| State Management | Zustand               |
| Forms            | React Hook Form + Zod |
| Routing          | React Router v7       |
| Charts           | Recharts              |
| Animations       | GSAP                  |
| Notifications    | Sonner                |
| Date Utilities   | date-fns              |

---

## Project Structure

```
src/
├── components/
│   ├── layout/       # AppShell, Sidebar, TopBar, Footer
│   ├── sales/        # Sales-specific components (e.g. RecordPaymentModal)
│   ├── shared/       # Reusable components (Avatar, StatusBadge, StatPill, etc.)
│   └── ui/           # shadcn/ui primitives
├── pages/            # One file per route
├── index.css         # Global styles & typography scale
├── App.tsx           # Route definitions
└── main.tsx          # Entry point
```

---

## Pages & Routes

| Route               | Page               | Description                        |
| ------------------- | ------------------ | ---------------------------------- |
| `/login`            | LoginPage          | User authentication                |
| `/register`         | RegisterPage       | New user registration request      |
| `/setup-password`   | SetupPasswordPage  | Password setup flow                |
| `/dashboard`        | DashboardPage      | Overview — KPIs, recent payments   |
| `/sales`            | SalesPage          | All sales / installment plans      |
| `/sales/new`        | SalesNewPage       | Create a new sale                  |
| `/sales/:id`        | SaleDetailPage     | Sale detail + installment schedule |
| `/customers`        | CustomersPage      | Customer list                      |
| `/customers/:id`    | CustomerDetailPage | Customer profile + their sales     |
| `/products`         | ProductsPage       | Product catalog                    |
| `/users`            | UsersPage          | Admin user management              |
| `/overdue`          | OverduePage        | Overdue installments tracker       |
| `/reports`          | ReportsPage        | Sales and payment reports          |
| `/settings`         | SettingsPage       | App settings                       |
| `/settings/profile` | ProfilePage        | User profile settings              |

---

## Getting Started

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

The app runs at `http://localhost:5173` by default.

---

## Environment Variables

| Variable           | Description                 |
| ------------------ | --------------------------- |
| `VITE_APP_VERSION` | App version shown in footer |

---

## Global CSS Class Reference (`src/index.css`)

### Typography Scale (`t-*`)

Naming rule:
- `display` = biggest text
- `title` = heading text
- `body` = reading / metadata text
- `label` = smallest UI text

| Class              | Description                     | Example                                                     |
| ------------------ | ------------------------------- | ----------------------------------------------------------- |
| `t-display-code`   | Largest decorative numeral      | `<div className="t-display-code">404</div>`                 |
| `t-display-max`    | Largest display headline        | `<h1 className="t-display-max">Coming Soon</h1>`            |
| `t-display-2xl`    | Hero display                    | `<p className="t-display-2xl">₱120,000</p>`                 |
| `t-display-xl`     | Large stat display              | `<p className="t-display-xl">340</p>`                       |
| `t-display-lg`     | Standard stat display           | `<p className="t-display-lg">₱48,500</p>`                   |
| `t-title-xl`       | Section title                   | `<h2 className="t-title-xl">Sales Overview</h2>`            |
| `t-title-lg`       | Card or modal title             | `<h3 className="t-title-lg">Payment Schedule</h3>`          |
| `t-title-lg-soft`  | Softer heading                  | `<h4 className="t-title-lg-soft">Filters</h4>`              |
| `t-title-md`       | Page title                      | `<h1 className="t-title-md">Customers</h1>`                 |
| `t-input`          | Form control text               | `<input className="t-input" />`                             |
| `t-body-lg-medium` | Strong body text                | `<span className="t-body-lg-medium">Dashboard</span>`       |
| `t-body-lg`        | Primary body text               | `<p className="t-body-lg">Payment is due on the 5th.</p>`   |
| `t-body-md`        | Metadata text                   | `<td className="t-body-md">Jan 5, 2025</td>`                |
| `t-body-md-bold`   | Strong metadata text            | `<td className="t-body-md-bold">Overdue</td>`               |
| `t-label-md`       | Caption text                    | `<span className="t-label-md">Last updated 2h ago</span>`   |
| `t-label-md-bold`  | Strong caption text             | `<span className="t-label-md-bold">3 items</span>`          |
| `t-label-sm`       | Micro label                     | `<span className="t-label-sm">ADMIN</span>`                 |
| `t-label-sm-bold`  | Strong micro label              | `<span className="t-label-sm-bold">NEW</span>`              |

### Text Transform

| Class             | Effect        | Example                                                     |
| ----------------- | ------------- | ----------------------------------------------------------- |
| `text-uppercase`  | ALL CAPS      | `<span className="t-label-sm text-uppercase">overdue</span>`   |
| `text-lowercase`  | all lowercase | `<span className="text-lowercase">EMAIL@EXAMPLE.COM</span>` |
| `text-capitalize` | Title Case    | `<span className="text-capitalize">john doe</span>`         |

### Text Decoration

| Class                  | Effect            | Example                                             |
| ---------------------- | ----------------- | --------------------------------------------------- |
| `decoration-underline` | underline         | `<a className="decoration-underline">Link</a>`      |
| `decoration-strike`    | line-through      | `<span className="decoration-strike">₱2,000</span>` |
| `decoration-none`      | removes underline | `<a className="decoration-none">Link</a>`           |

### Semantic Rounding

| Class           | Radius                       | Example                                    |
| --------------- | ---------------------------- | ------------------------------------------ |
| `no-rounded`    | 0 — flush edges              | `<div className="no-rounded">...</div>`    |
| `sm-rounded`    | `--radius-sm` — small        | `<div className="sm-rounded">...</div>`    |
| `md-rounded`    | `--radius-md` — default      | `<div className="md-rounded">...</div>`    |
| `lg-rounded`    | `--radius-lg` — cards        | `<div className="lg-rounded">...</div>`    |
| `xl-rounded`    | `--radius-xl` — modals       | `<div className="xl-rounded">...</div>`    |
| `full-rounded`  | 999px — avatars, pills, dots | `<div className="full-rounded">...</div>`  |
| `t-rounded`     | top corners only             | `<div className="t-rounded">...</div>`     |
| `b-rounded`     | bottom corners only          | `<div className="b-rounded">...</div>`     |
| `tl-rounded`    | top-left only                | `<div className="tl-rounded">...</div>`    |
| `tr-rounded`    | top-right only               | `<div className="tr-rounded">...</div>`    |
| `bl-rounded`    | bottom-left only             | `<div className="bl-rounded">...</div>`    |
| `br-rounded`    | bottom-right only            | `<div className="br-rounded">...</div>`    |

### Semantic Text Colors

| Class               | Token              | Example                                               |
| ------------------- | ------------------ | ----------------------------------------------------- |
| `text-main`         | `--text-primary`   | `<p className="text-main">Primary text</p>`           |
| `text-soft`         | `--text-secondary` | `<p className="text-soft">Secondary text</p>`         |
| `text-faint`        | `--text-muted`     | `<p className="text-faint">Muted hint</p>`            |
| `text-brand`        | `--primary`        | `<p className="text-brand">View all</p>`              |
| `text-danger`       | `--destructive`    | `<p className="text-danger">Delete this item</p>`     |
| `text-success-role` | `--success`        | `<p className="text-success-role">Paid</p>`           |
| `text-cat-teal`     | `--cat-teal`       | `<span className="text-cat-teal">Teal tag</span>`     |
| `text-cat-purple`   | `--cat-purple`     | `<span className="text-cat-purple">Purple tag</span>` |

### Semantic Surfaces

| Class                  | Description            | Example                                                    |
| ---------------------- | ---------------------- | ---------------------------------------------------------- |
| `surface-page`         | Page background        | `<div className="surface-page">...</div>`                  |
| `surface-card`         | Card background        | `<div className="surface-card global-rounded p-4">...</div>` |
| `surface-brand`        | Primary brand fill     | `<div className="surface-brand text-white">...</div>`      |
| `surface-brand-soft`   | Light brand tint       | `<div className="surface-brand-soft">...</div>`            |
| `surface-success-soft` | Success background     | `<div className="surface-success-soft">...</div>`          |
| `surface-danger-soft`  | Danger background      | `<div className="surface-danger-soft">...</div>`           |
| `surface-muted`        | Muted fill             | `<div className="surface-muted">...</div>`                 |
| `surface-overdue-row`  | Overdue table row tint | `<tr className="surface-overdue-row">...</tr>`             |

### Semantic Borders

| Class                 | Description          | Example                                                 |
| --------------------- | -------------------- | ------------------------------------------------------- |
| `border-default`      | Standard border      | `<div className="border border-default">...</div>`      |
| `border-brand`        | Primary color border | `<div className="border border-brand">...</div>`        |
| `border-brand-soft`   | 20% primary border   | `<div className="border border-brand-soft">...</div>`   |
| `border-success-soft` | 20% success border   | `<div className="border border-success-soft">...</div>` |
| `border-danger-soft`  | 20% danger border    | `<div className="border border-danger-soft">...</div>`  |

### Status Badges

| Class            | Color    | Example                                                                                     |
| ---------------- | -------- | ------------------------------------------------------------------------------------------- |
| `status-success` | Green    | `<span className="status-success border full-rounded px-2 py-0.5 t-label-md">Paid</span>`    |
| `status-warning` | Amber    | `<span className="status-warning border full-rounded px-2 py-0.5 t-label-md">Partial</span>` |
| `status-error`   | Red      | `<span className="status-error border full-rounded px-2 py-0.5 t-label-md">Overdue</span>`   |
| `status-info`    | Sky blue | `<span className="status-info border full-rounded px-2 py-0.5 t-label-md">Info</span>`       |
| `status-pending` | Gray     | `<span className="status-pending border full-rounded px-2 py-0.5 t-label-md">Pending</span>` |

### Pill Variants

| Class         | Color  | Example                                                                           |
| ------------- | ------ | --------------------------------------------------------------------------------- |
| `pill-indigo` | Blue   | `<span className="pill-indigo circle-rounded px-2 py-0.5 t-label-sm">Active</span>`  |
| `pill-green`  | Green  | `<span className="pill-green circle-rounded px-2 py-0.5 t-label-sm">Paid</span>`     |
| `pill-amber`  | Amber  | `<span className="pill-amber circle-rounded px-2 py-0.5 t-label-sm">Partial</span>`  |
| `pill-red`    | Red    | `<span className="pill-red circle-rounded px-2 py-0.5 t-label-sm">Overdue</span>`    |
| `pill-gray`   | Gray   | `<span className="pill-gray circle-rounded px-2 py-0.5 t-label-sm">Pending</span>`   |
| `pill-teal`   | Teal   | `<span className="pill-teal circle-rounded px-2 py-0.5 t-label-sm">Service</span>`   |
| `pill-purple` | Purple | `<span className="pill-purple circle-rounded px-2 py-0.5 t-label-sm">Premium</span>` |

### Buttons

| Class             | Description    | Example                                                                        |
| ----------------- | -------------- | ------------------------------------------------------------------------------ |
| `btn-brand`       | Primary CTA    | `<button className="btn-brand global-rounded px-4 py-2">Save</button>`         |
| `btn-destructive` | Danger action  | `<button className="btn-destructive global-rounded px-4 py-2">Delete</button>` |
| `btn-warning`     | Warning action | `<button className="btn-warning global-rounded px-4 py-2">Archive</button>`    |

### Table

| Class              | Description                     | Example                                                     |
| ------------------ | ------------------------------- | ----------------------------------------------------------- |
| `table-header`     | TH cell — uppercase label style | `<th className="table-header px-4 py-3">Customer</th>`      |
| `table-text`       | TD cell — secondary body text   | `<td className="table-text px-4 py-3">John Doe</td>`        |
| `table-title-text` | TD cell — primary bold text     | `<td className="table-title-text px-4 py-3">Sale #001</td>` |

### Sidebar

| Class                     | Description             | Example                                                              |
| ------------------------- | ----------------------- | -------------------------------------------------------------------- |
| `app-sidebar`             | Sidebar root bg + color | `<aside className="app-sidebar">...</aside>`                         |
| `app-sidebar-link`        | Inactive nav link       | `<a className="app-sidebar-link">Dashboard</a>`                      |
| `app-sidebar-link-active` | Active nav link         | `<a className="app-sidebar-link-active">Sales</a>`                   |
| `app-sidebar-text-muted`  | Muted sidebar text      | `<span className="app-sidebar-text-muted">v1.0.0</span>`             |
| `app-sidebar-panel`       | Inset panel bg          | `<div className="app-sidebar-panel p-3">...</div>`                   |
| `app-sidebar-avatar`      | Avatar chip             | `<div className="app-sidebar-avatar circle-rounded size-8">JD</div>` |

### Label / Caps

| Class             | Description                                          | Example                                         |
| ----------------- | ---------------------------------------------------- | ----------------------------------------------- |
| `label-caps`      | 11px bold uppercase + letter-spacing — section label | `<p className="label-caps">Payment History</p>` |
| `label-caps-wide` | 11px bold uppercase + wider spacing                  | `<p className="label-caps-wide">Filter By</p>`  |
