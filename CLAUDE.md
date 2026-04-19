You are a senior full-stack engineer working on a multi-tenant installment
sales management SaaS platform. The first tenant is Silva Traders — a Sri
Lankan physical retail store. This is a real client project being built
for production.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROJECT OVERVIEW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
A multi-tenant SaaS platform where each tenant is a physical retail
business selling products on installment plans. No e-commerce. All
sales and payments are recorded manually by the tenant's admin after
the customer pays in person.

Core feature: Customers buy products on installment plans. Admin
records each sale, the system generates a monthly payment schedule,
and admin records each payment as it comes in. After recording a
payment, the system sends a WhatsApp notification to the customer.

Each tenant is fully isolated at the data level via tenant_id.
One tenant = one business. One business = one admin + optional staff.

There are two distinct app surfaces:

1. Super Admin Panel — /super/\* — managed by the platform owner (you)
2. Tenant App — /:slug/\* — used by each business's team

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CURRENT STATE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Frontend is built and working with dummy data (single-tenant).
Backend is not started yet.
Multi-tenancy must be designed into the backend from day one.
Frontend will need tenant slug awareness added (path-based routing).

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FULL TECH STACK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FRONTEND:
Framework: React + Vite + TypeScript
Styling: Tailwind CSS + Shadcn/ui
State: Zustand (client/UI state)
Server state: React Query — TanStack Query (to be added when
backend is ready)
Routing: React Router v6 (path-based tenant routing)
Icons: Lucide React
HTTP client: Axios (to be added)
Notifications: Sonner (toasts)

BACKEND:
Runtime: Node.js
Framework: Express + TypeScript
ORM: Prisma
Database: PostgreSQL (shared DB, shared tables, tenant_id isolation)
Validation: Zod (all request validation)
Auth: JWT (access token + refresh token)
Password: bcrypt
Email: Nodemailer (account setup links + tenant invites)
Notifications: WhatsApp Cloud API (Meta)
File uploads: Multer (business logo per tenant)

INFRASTRUCTURE:
Hosting: TBD (Railway or VPS)
DB: PostgreSQL (hosted, single instance, all tenants)
Environment: .env for all secrets

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MULTI-TENANCY ARCHITECTURE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Model: Shared database, shared tables, tenant_id on every row.

Every table except super_admins and tenants has a tenant_id column.
Every query MUST include WHERE tenant_id = :tenantId.
The tenant_id is never trusted from the request body —
it is always resolved from the authenticated user's JWT payload.

Tenant resolution flow (per request):

1. Extract JWT from Authorization header
2. Decode tenant_id and user role from JWT payload
3. Attach both to req.tenant and req.user
4. All service functions receive tenantId as first argument
5. Prisma queries always include { where: { tenantId } }

Path-based routing:
URL pattern: /api/v1/:slug/...
Example: /api/v1/silva-traders/customers
The :slug is resolved to a tenant_id in resolveTenant middleware.
After resolution, :slug is never used again — only tenant_id is used.

Super admin routes:
URL pattern: /api/v1/super/...
Completely separate from tenant routes.
Requires SUPER_ADMIN role in JWT.
Has no tenant_id — operates across all tenants.

Frontend routing:
/:slug/login → tenant login
/:slug/dashboard → tenant dashboard
/:slug/customers → etc.
/super/login → super admin login
/super/dashboard → super admin panel
/super/tenants → manage all tenants

Slug rules:

- Lowercase, alphanumeric, hyphens only
- Unique across platform
- Set at tenant creation, never changed
- Example: "silva-traders", "perera-stores"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DATABASE SCHEMA (PostgreSQL via Prisma)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
NOTE: Every table marked with [T] has tenant_id (FK → tenants.id).
These tables ALWAYS filter by tenant_id in every query.

super_admins
id, name, email, password_hash, created_at

tenants
id, name, slug (unique), status (ACTIVE | SUSPENDED | INACTIVE),
created_at, updated_at

business_settings [T]
id, tenant_id, business_name, owner_name, address,
phone, whatsapp, email, logo_url, updated_at

roles
id, name (SUPER_ADMIN | ADMIN | STAFF | VIEWER)
-- shared lookup table, no tenant_id needed

role_permissions
id, role_id, permission (string)

users [T]
id, tenant_id, name, email, password_hash, role_id,
status (ACTIVE | INACTIVE), last_login, created_at

pending_registrations [T]
id, tenant_id, name, email, phone, requested_role,
message, status (PENDING | APPROVED | REJECTED), requested_at

customers [T]
id, tenant_id, full_name, phone, nic, address,
notes, created_at

categories [T]
id, tenant_id, name

products [T]
id, tenant_id, name, category_id, base_price,
is_archived, created_at

sales [T]
id, tenant_id, customer_id, product_id, sold_price,
down_payment, monthly_amount, total_months, sale_date,
status (ACTIVE | COMPLETED | WRITTEN_OFF), notes,
created_by (user_id), created_at

installment_schedules [T]
id, tenant_id, sale_id, installment_number, due_date,
expected_amount, paid_amount, status
(PENDING | PARTIALLY_PAID | PAID | OVERDUE | WRITTEN_OFF)

payments [T]
id, tenant_id, installment_schedule_id, paid_amount,
paid_date, recorded_by (user_id), notes, created_at

notifications [T]
id, tenant_id, customer_id, payment_id,
channel (WHATSAPP | SMS), message,
status (SENT | FAILED | PENDING), sent_at

whatsapp_templates [T]
id, tenant_id, name, template_body, is_active

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
AUTH FLOW — TENANT USERS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Super admin creates tenant via super panel
2. Super admin creates the first ADMIN user for that tenant
   (or system auto-creates on tenant creation with a setup link)
3. Tenant admin receives email with setup link to set password
4. Tenant admin logs in at /:slug/login
5. Other staff go to /:slug/register, submit details
6. Tenant admin approves from Settings > Users & Roles
7. On approval: email sent with signed setup link
   (JWT 24h expiry containing registration id + tenant_id)
8. User clicks link → /:slug/setup-password
9. User sets password → account created in users table
10. User logs in at /:slug/login

JWT payload (tenant user):
{ userId, tenantId, role, permissions[] }

Token strategy:
Access token: 15 min expiry, in memory (Zustand)
Refresh token: 7 days, httpOnly cookie
On 401: silent refresh using refresh token
On refresh fail: logout, redirect /:slug/login

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
AUTH FLOW — SUPER ADMIN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Super admin account seeded directly in DB
2. Logs in at /super/login
3. JWT payload: { superAdminId, role: 'SUPER_ADMIN' }
4. Has access to all /super/\* routes only
5. Cannot access tenant routes
6. Has no tenant_id in token

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
RBAC PERMISSIONS — TENANT USERS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ADMIN: all tenant permissions
STAFF: view:dashboard, view:customers, write:customers,
view:sales, write:sales, write:payments, view:products
VIEWER: view:dashboard, view:customers, view:sales,
view:reports, view:products

Permission check: rbac middleware on every protected route.
Frontend hides actions based on role (UI guard).
tenant_id always enforced in addition to role — a user from
tenant A can never access tenant B's data even with ADMIN role.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SUPER ADMIN PANEL FEATURES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Routes: /super/\*
Pages:
/super/login Super admin login
/super/dashboard Platform overview (tenant count,
active tenants, total sales across all)
/super/tenants List all tenants with status + stats
/super/tenants/new Create new tenant (name, slug,
owner name, owner email)
/super/tenants/:id Tenant detail — view their settings,
user count, suspend/activate tenant

On tenant creation:

- tenants row created
- business_settings row created with defaults
- default categories seeded for that tenant
- first ADMIN user record created with status PENDING_SETUP
- setup email sent to owner email with signed link

Tenant suspension:

- tenant.status → SUSPENDED
- All login attempts for that tenant return 403
- Data is never deleted

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BUSINESS LOGIC RULES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
All rules below apply within a tenant's data scope.

Installment schedule generation:

- Auto-generated when a sale is created
- Due dates calendar-based: sale_date + N months
- Evenly split: (sold_price - down_payment) / total_months
- tenant_id copied from sale to every installment row

Payment recording:

- paid_amount >= expected_amount → status PAID
- paid_amount < expected_amount → status PARTIALLY_PAID
- paid_amount > expected_amount → excess applied to next
  PENDING installment automatically
- All payment rows include tenant_id

Overdue detection:

- Query-time check on every installments fetch
- due_date passed + status PENDING → mark OVERDUE inline
- No background job needed at this scale

Sale completion:

- All installments PAID → sale status → COMPLETED

WhatsApp notification:

- Triggered after payment confirmed
- Uses tenant's own WhatsApp config (stored in business_settings)
- Templates are per-tenant (whatsapp_templates [T])
- Notification row always saved regardless of send result

Currency:

- All amounts in LKR, stored as integers
- Formatted at display layer only with toLocaleString()

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
REPOSITORY STRUCTURE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/client
/src
/components
/layout
Sidebar.tsx
Topbar.tsx
AppLayout.tsx
SuperLayout.tsx (super admin shell)
/shared
StatusBadge.tsx
InitialsAvatar.tsx
StatPill.tsx
EmptyState.tsx
/pages
/auth
LoginPage.tsx (tenant login at /:slug/login)
RegisterPage.tsx
SetupPasswordPage.tsx
/super
SuperLoginPage.tsx
SuperDashboardPage.tsx
TenantsPage.tsx
TenantDetailPage.tsx
NewTenantPage.tsx
DashboardPage.tsx
/customers
CustomersPage.tsx
CustomerDetailPage.tsx
/sales
SalesPage.tsx
NewSalePage.tsx
SaleDetailPage.tsx
OverduePage.tsx
ProductsPage.tsx
ReportsPage.tsx
/settings
SettingsPage.tsx
/store
useAuthStore.ts (user, tenantId, slug,
isAuthenticated, login, logout)
useUIStore.ts (sidebarCollapsed, activeModal,
selectedInstallmentId)
useTenantStore.ts (slug, tenantId, businessSettings)
/types
index.ts
/data
dummy.ts
/lib
utils.ts
axios.ts (axios instance with slug in base URL)

/server
/src
/modules
/auth router, controller, service, schema
/super router, controller, service, schema
/customers router, controller, service, schema
/products router, controller, service, schema
/sales router, controller, service, schema
/payments router, controller, service, schema
/notifications router, controller, service, schema
/reports router, controller, service, schema
/settings router, controller, service, schema
/middleware
resolveTenant.ts (slug → tenant_id, attach to req)
auth.ts (verify JWT, attach user + tenantId)
superAuth.ts (verify super admin JWT)
rbac.ts (permission check)
checkTenantActive.ts (block SUSPENDED tenants)
errorHandler.ts
validate.ts (Zod wrapper)
/lib
prisma.ts
jwt.ts (tenant tokens + super admin tokens)
email.ts
whatsapp.ts
/types
express.d.ts (extend Request: user, tenantId,
isSuperAdmin)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
API ROUTES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Base URL tenant: /api/v1/:slug
Base URL super admin: /api/v1/super

SUPER ADMIN ROUTES (no tenant_id, separate auth):
POST /api/v1/super/auth/login
GET /api/v1/super/tenants
POST /api/v1/super/tenants
GET /api/v1/super/tenants/:id
PUT /api/v1/super/tenants/:id/status
DELETE /api/v1/super/tenants/:id

TENANT AUTH ROUTES:
POST /api/v1/:slug/auth/login
POST /api/v1/:slug/auth/logout
POST /api/v1/:slug/auth/refresh
POST /api/v1/:slug/auth/register
POST /api/v1/:slug/auth/setup-password

TENANT ROUTES (all require auth + tenant_id from JWT):
GET /api/v1/:slug/customers
POST /api/v1/:slug/customers
GET /api/v1/:slug/customers/:id
PUT /api/v1/:slug/customers/:id

GET /api/v1/:slug/products
POST /api/v1/:slug/products
PUT /api/v1/:slug/products/:id
DELETE /api/v1/:slug/products/:id

GET /api/v1/:slug/sales
POST /api/v1/:slug/sales
GET /api/v1/:slug/sales/:id
GET /api/v1/:slug/sales/:id/installments

POST /api/v1/:slug/payments

GET /api/v1/:slug/reports/summary
GET /api/v1/:slug/reports/overdue
GET /api/v1/:slug/reports/collection

GET /api/v1/:slug/settings/business
PUT /api/v1/:slug/settings/business
GET /api/v1/:slug/settings/users
POST /api/v1/:slug/settings/users/approve/:registrationId
POST /api/v1/:slug/settings/users/reject/:registrationId
GET /api/v1/:slug/settings/whatsapp/templates
PUT /api/v1/:slug/settings/whatsapp/templates/:id
POST /api/v1/:slug/settings/whatsapp/test

API response format:
Success: { success: true, data: {...} }
Error: { success: false, error: { code, message } }
Paginated: { data: [...], meta: { page, limit, total } }

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MIDDLEWARE CHAIN — TENANT ROUTES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Every tenant API request goes through in this order:

1. resolveTenant — :slug → tenants row → attach tenant to req
2. checkTenantActive — reject if tenant.status !== ACTIVE
3. auth — verify JWT, attach user + tenantId to req
4. rbac — check user has required permission
5. validate — Zod schema validation on req.body
6. controller — calls service
7. service — all Prisma queries include tenantId

MIDDLEWARE CHAIN — SUPER ADMIN ROUTES:

1. superAuth — verify super admin JWT
2. validate — Zod schema validation
3. controller — calls service (no tenantId filter)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FRONTEND TENANT ROUTING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
React Router structure:

/super/login → SuperLoginPage
/super/\* → SuperLayout wrapper
/super/dashboard → SuperDashboardPage
/super/tenants → TenantsPage
/super/tenants/new → NewTenantPage
/super/tenants/:id → TenantDetailPage

/:slug/login → LoginPage
/:slug/register → RegisterPage
/:slug/setup-password → SetupPasswordPage
/:slug/\* → AppLayout wrapper
/:slug/dashboard → DashboardPage
/:slug/customers → CustomersPage
/:slug/customers/:id → CustomerDetailPage
/:slug/sales → SalesPage
/:slug/sales/new → NewSalePage
/:slug/sales/:id → SaleDetailPage
/:slug/products → ProductsPage
/:slug/reports → ReportsPage
/:slug/overdue → OverduePage
/:slug/settings → SettingsPage

Zustand — useTenantStore:
slug: string (from URL param)
tenantId: string (from JWT after login)
businessSettings: object (loaded after login)

Axios base URL:
Tenant: /api/v1/${slug}
Super admin: /api/v1/super
slug always read from useTenantStore, never from URL directly

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CODE RULES — ENFORCE THESE ALWAYS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

- Never use any — always type everything properly
- Validate all request inputs with Zod before service layer
- Never put business logic in controllers
- Never put raw SQL — Prisma query builder only
- EVERY Prisma query on a [T] table MUST include tenantId
  in the where clause — no exceptions
- tenant_id is NEVER trusted from req.body or req.params —
  always from req.tenantId (set by auth middleware from JWT)
- Never commit secrets — all config via .env
- Prefer explicit over clever — no magic
- LKR amounts stored as integers, formatted at display layer only
- Permissions checked in middleware, never in service functions
- Functions over 50 lines must be split
- Super admin routes and tenant routes are completely separate —
  no shared controllers or services between them

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BUILD ORDER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1.  Server project init (tsconfig, eslint, folder structure)
2.  Prisma schema with tenant_id on all tables + migration
3.  DB seed (super admin + first tenant: silva-traders +
    first tenant admin + default categories)
4.  resolveTenant + checkTenantActive middleware
5.  Super admin auth module
6.  Super admin tenants module (CRUD + status management)
7.  Tenant auth module (login, refresh, register, setup-password)
8.  Customers module
9.  Products module
10. Sales module + installment schedule generation
11. Payments module + overdue detection logic
12. WhatsApp notification service
13. Reports module
14. Settings module
15. Update frontend: add slug routing, useTenantStore,
    axios instance, swap dummy data → React Query + API
16. Super admin frontend panel
17. Testing
18. Deployment
