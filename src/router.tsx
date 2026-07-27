import { lazy, Suspense } from "react";
import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  redirect,
} from "@tanstack/react-router";

import AuthLayout from "@/layouts/auth-layout";
import DefaultLayout from "@/layouts/default-layout";

import { Loading } from "@/components/ui/loading";
import { settingsSearchSchema } from "@/constant/setting-data";

/* AUTH */
const Login = lazy(() => import("./pages/auth/login"));
const Register = lazy(() => import("./pages/auth/register"));
const SetupPassword = lazy(() => import("./pages/auth/setup-password"));
const ForgotPassword = lazy(() => import("./pages/auth/forgot-password"));

/* DEFAULT */
const Dashboard = lazy(() => import("./pages/dashboard"));
const Sales = lazy(() => import("./pages/sales"));
const SalesNew = lazy(() => import("./pages/sales/pages/sales-new"));
const SaleDetails = lazy(() => import("./pages/sales/pages/sale-details"));
const Customers = lazy(() => import("./pages/customer"));
const CustomerDetails = lazy(
  () => import("./pages/customer/pages/customer-details"),
);
const Products = lazy(() => import("./pages/products"));
const Employee = lazy(() => import("./pages/employees"));
const Overdue = lazy(() => import("./pages/overdue"));
const Reports = lazy(() => import("./pages/reports"));
const Settings = lazy(() => import("./pages/settings"));

/* ERROR */
const NotFound = lazy(() => import("./pages/404"));
const Unauthorized = lazy(() => import("./pages/401"));
const SubscriptionError = lazy(() => import("./pages/502"));

/* ROOT */
const rootRoute = createRootRoute({
  component: () => (
    <Suspense fallback={<Loading />}>
      <Outlet />
    </Suspense>
  ),
});

/* AUTH */
const authRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "auth",
  component: AuthLayout,
});

const loginRoute = createRoute({
  getParentRoute: () => authRoute,
  path: "/login",
  component: Login,
});
const registerRoute = createRoute({
  getParentRoute: () => authRoute,
  path: "/register",
  component: Register,
});
const setupPasswordRoute = createRoute({
  getParentRoute: () => authRoute,
  path: "/setup-password",
  component: SetupPassword,
});
const forgotPasswordRoute = createRoute({
  getParentRoute: () => authRoute,
  path: "/forgot-password",
  component: ForgotPassword,
});

/* DEFAULT */
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
  component: Dashboard,
});
const salesRoute = createRoute({
  getParentRoute: () => shellRoute,
  path: "/sales",
  component: Sales,
});
const salesNewRoute = createRoute({
  getParentRoute: () => shellRoute,
  path: "/sales/new",
  component: SalesNew,
});
const saleDetailRoute = createRoute({
  getParentRoute: () => shellRoute,
  path: "/sales/$id",
  component: SaleDetails,
});
const customersRoute = createRoute({
  getParentRoute: () => shellRoute,
  path: "/customers",
  component: Customers,
});
const customerDetailRoute = createRoute({
  getParentRoute: () => shellRoute,
  path: "/customers/$id",
  component: CustomerDetails,
});
const productsRoute = createRoute({
  getParentRoute: () => shellRoute,
  path: "/products",
  component: Products,
});
const usersRoute = createRoute({
  getParentRoute: () => shellRoute,
  path: "/users",
  component: Employee,
});
const overdueRoute = createRoute({
  getParentRoute: () => shellRoute,
  path: "/overdue",
  component: Overdue,
});
const reportsRoute = createRoute({
  getParentRoute: () => shellRoute,
  path: "/reports",
  component: Reports,
});
const settingsRoute = createRoute({
  getParentRoute: () => shellRoute,
  path: "/settings",
  validateSearch: settingsSearchSchema,
  component: Settings,
});

/* ERROR */
const notFoundRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/404",
  component: NotFound,
});
const unauthorizedRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/401",
  component: Unauthorized,
});
const subscriptionErrorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/502",
  component: SubscriptionError,
});

const routeTree = rootRoute.addChildren([
  authRoute.addChildren([
    loginRoute,
    registerRoute,
    setupPasswordRoute,
    forgotPasswordRoute,
  ]),

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
  ]),

  notFoundRoute,
  unauthorizedRoute,
  subscriptionErrorRoute,
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
