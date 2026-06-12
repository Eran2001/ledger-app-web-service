import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  redirect,
} from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { Loading } from "@/components/shared/loading";
import AuthLayout from "@/layouts/auth-layout";
import DefaultLayout from "@/layouts/default-layout";

const LoginPage = lazy(() => import("./pages/auth/login"));
const RegisterPage = lazy(() => import("./pages/auth/register"));
const SetupPasswordPage = lazy(() => import("./pages/auth/setup-password"));
const DashboardPage = lazy(() => import("./pages/dashboard"));
const SalesPage = lazy(() => import("./pages/sales"));
const SalesNewPage = lazy(() => import("./pages/sales/pages/SalesNewPage"));
const SaleDetailPage = lazy(() => import("./pages/sales/pages/SaleDetailPage"));
const CustomersPage = lazy(() => import("./pages/customer"));
const CustomerDetailPage = lazy(() => import("./pages/customer/pages/detail"));
const ProductsPage = lazy(() => import("./pages/products"));
const EmployeePage = lazy(() => import("./pages/employees"));
const OverduePage = lazy(() => import("./pages/overdue"));
const ReportsPage = lazy(() => import("./pages/reports"));
const SettingsPage = lazy(() => import("./pages/settings"));
const ProfilePage = lazy(
  () => import("./pages/settings/components/account-information"),
);

const rootRoute = createRootRoute({
  component: () => (
    <Suspense fallback={<Loading />}>
      <Outlet />
    </Suspense>
  ),
});

const authRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "auth",
  component: AuthLayout,
});

const loginRoute = createRoute({
  getParentRoute: () => authRoute,
  path: "/login",
  component: LoginPage,
});
const registerRoute = createRoute({
  getParentRoute: () => authRoute,
  path: "/register",
  component: RegisterPage,
});
const setupPasswordRoute = createRoute({
  getParentRoute: () => authRoute,
  path: "/setup-password",
  component: SetupPasswordPage,
});

const shellRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "shell",
  component: DefaultLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => shellRoute,
  path: "/",
  beforeLoad: () => {
    throw redirect({ to: "/dashboard" });
  },
});
const dashboardRoute = createRoute({
  getParentRoute: () => shellRoute,
  path: "/dashboard",
  component: DashboardPage,
});
const salesRoute = createRoute({
  getParentRoute: () => shellRoute,
  path: "/sales",
  component: SalesPage,
});
const salesNewRoute = createRoute({
  getParentRoute: () => shellRoute,
  path: "/sales/new",
  component: SalesNewPage,
});
const saleDetailRoute = createRoute({
  getParentRoute: () => shellRoute,
  path: "/sales/$id",
  component: SaleDetailPage,
});
const customersRoute = createRoute({
  getParentRoute: () => shellRoute,
  path: "/customers",
  component: CustomersPage,
});
const customerDetailRoute = createRoute({
  getParentRoute: () => shellRoute,
  path: "/customers/$id",
  component: CustomerDetailPage,
});
const productsRoute = createRoute({
  getParentRoute: () => shellRoute,
  path: "/products",
  component: ProductsPage,
});
const usersRoute = createRoute({
  getParentRoute: () => shellRoute,
  path: "/users",
  component: EmployeePage,
});
const overdueRoute = createRoute({
  getParentRoute: () => shellRoute,
  path: "/overdue",
  component: OverduePage,
});
const reportsRoute = createRoute({
  getParentRoute: () => shellRoute,
  path: "/reports",
  component: ReportsPage,
});
const settingsRoute = createRoute({
  getParentRoute: () => shellRoute,
  path: "/settings",
  component: SettingsPage,
});
const profileRoute = createRoute({
  getParentRoute: () => shellRoute,
  path: "/settings/profile",
  component: ProfilePage,
});

const routeTree = rootRoute.addChildren([
  authRoute.addChildren([loginRoute, registerRoute, setupPasswordRoute]),
  shellRoute.addChildren([
    indexRoute,
    dashboardRoute,
    salesRoute,
    salesNewRoute,
    saleDetailRoute,
    customersRoute,
    customerDetailRoute,
    productsRoute,
    usersRoute,
    overdueRoute,
    reportsRoute,
    settingsRoute,
    profileRoute,
  ]),
]);

export const router = createRouter({
  routeTree,
  defaultPendingComponent: Loading,
  defaultPendingMs: 0,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
