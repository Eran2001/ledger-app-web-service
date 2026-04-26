import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";

import { AppLayout } from "./components/layout/app-layout";
import { TooltipProvider } from "./components/ui/tooltip";

import { LoginPage } from "./pages/auth/login-page";
import { RegisterPage } from "./pages/auth/register-page";
import { SetupPasswordPage } from "./pages/auth/setup-password-page";
import { DashboardPage } from "./pages/dashboard-page";
import { CustomersPage } from "./pages/customers/customers-page";
import { CustomerDetailPage } from "./pages/customers/customer-detail-page";
import { SalesPage } from "./pages/sales/sales-page";
import { NewSalePage } from "./pages/sales/new-sale-page";
import { SaleDetailPage } from "./pages/sales/sale-detail-page";
import { OverduePage } from "./pages/overdue-page";
import { ProductsPage } from "./pages/products-page";
import { ReportsPage } from "./pages/reports-page";
import { SettingsPage } from "./pages/settings/settings-page";
import { ProfilePage } from "./pages/settings/profile-page";
import { UsersPage } from "./pages/users-page";
import { ButtonsPage } from "./pages/buttons-page";

import { useThemeStore } from "./store/theme.store";

export default function App() {
  const { init } = useThemeStore();
  useEffect(() => {
    init();
  }, [init]);

  return (
    <BrowserRouter>
      <TooltipProvider>
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/setup-password" element={<SetupPasswordPage />} />

          {/* Protected Routes */}
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="customers" element={<CustomersPage />} />
            <Route path="customers/:id" element={<CustomerDetailPage />} />
            <Route path="sales" element={<SalesPage />} />
            <Route path="sales/new" element={<NewSalePage />} />
            <Route path="sales/:id" element={<SaleDetailPage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="overdue" element={<OverduePage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="buttons" element={<ButtonsPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="settings/profile" element={<ProfilePage />} />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster position="top-center" richColors closeButton />
      </TooltipProvider>
    </BrowserRouter>
  );
}
