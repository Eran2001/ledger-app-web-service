import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";

import { AppLayout } from "./components/layout/AppLayout";
import { TooltipProvider } from "./components/ui/tooltip";

import { LoginPage } from "./pages/auth/LoginPage";
import { RegisterPage } from "./pages/auth/RegisterPage";
import { SetupPasswordPage } from "./pages/auth/SetupPasswordPage";
import { DashboardPage } from "./pages/DashboardPage";
import { CustomersPage } from "./pages/customers/CustomersPage";
import { CustomerDetailPage } from "./pages/customers/CustomerDetailPage";
import { SalesPage } from "./pages/sales/SalesPage";
import { NewSalePage } from "./pages/sales/NewSalePage";
import { SaleDetailPage } from "./pages/sales/SaleDetailPage";
import { OverduePage } from "./pages/OverduePage";
import { ProductsPage } from "./pages/ProductsPage";
import { ReportsPage } from "./pages/ReportsPage";
import { SettingsPage } from "./pages/settings/SettingsPage";
import { UsersPage } from "./pages/UsersPage";
import { ButtonsPage } from "./pages/ButtonsPage";

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
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster position="top-right" richColors closeButton />
      </TooltipProvider>
    </BrowserRouter>
  );
}
