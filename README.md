# Ledger App — Web Service

A store management web app for tracking installment-based sales, customers, products, and overdue payments.

---

## Tech Stack

| Concern          | Library                  |
| ---------------- | ------------------------ |
| Framework        | React 19 + TypeScript    |
| Build Tool       | Vite 6                   |
| Styling          | Tailwind CSS v4          |
| UI Components    | shadcn/ui + Radix UI     |
| State Management | Zustand                  |
| Forms            | React Hook Form + Zod    |
| Routing          | React Router v7          |
| Charts           | Recharts                 |
| Animations       | GSAP                     |
| Notifications    | Sonner                   |
| Date Utilities   | date-fns                 |

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

| Route                | Page                  | Description                              |
| -------------------- | --------------------- | ---------------------------------------- |
| `/login`             | LoginPage             | User authentication                      |
| `/register`          | RegisterPage          | New user registration request            |
| `/setup-password`    | SetupPasswordPage     | Password setup flow                      |
| `/dashboard`         | DashboardPage         | Overview — KPIs, recent payments         |
| `/sales`             | SalesPage             | All sales / installment plans            |
| `/sales/new`         | SalesNewPage          | Create a new sale                        |
| `/sales/:id`         | SaleDetailPage        | Sale detail + installment schedule       |
| `/customers`         | CustomersPage         | Customer list                            |
| `/customers/:id`     | CustomerDetailPage    | Customer profile + their sales           |
| `/products`          | ProductsPage          | Product catalog                          |
| `/users`             | UsersPage             | Admin user management                    |
| `/overdue`           | OverduePage           | Overdue installments tracker             |
| `/reports`           | ReportsPage           | Sales and payment reports                |
| `/settings`          | SettingsPage          | App settings                             |
| `/settings/profile`  | ProfilePage           | User profile settings                    |

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

| Variable           | Description                   |
| ------------------ | ----------------------------- |
| `VITE_APP_VERSION` | App version shown in footer   |
