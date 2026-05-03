import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom"
import { Toaster } from "sonner"
import { ThemeInit } from "@/components/theme-init"
import { Sidebar, MobileSidebar } from "@/components/layout/sidebar"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import SetupPasswordPage from "./pages/SetupPasswordPage"
import DashboardPage from "./pages/DashboardPage"
import SalesPage from "./pages/SalesPage"
import SalesNewPage from "./pages/SalesNewPage"
import SaleDetailPage from "./pages/SaleDetailPage"
import CustomersPage from "./pages/CustomersPage"
import CustomerDetailPage from "./pages/CustomerDetailPage"
import ProductsPage from "./pages/ProductsPage"
import UsersPage from "./pages/UsersPage"
import OverduePage from "./pages/OverduePage"
import ReportsPage from "./pages/ReportsPage"
import SettingsPage from "./pages/SettingsPage"
import ProfilePage from "./pages/ProfilePage"

function AppShell() {
  return (
    <div className="flex h-screen w-full overflow-hidden surface-page">
      <Sidebar />
      <MobileSidebar />
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Outlet />
      </main>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeInit />
      <Toaster position="top-right" richColors />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/setup-password" element={<SetupPasswordPage />} />
        <Route element={<AppShell />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/sales" element={<SalesPage />} />
          <Route path="/sales/new" element={<SalesNewPage />} />
          <Route path="/sales/:id" element={<SaleDetailPage />} />
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/customers/:id" element={<CustomerDetailPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/overdue" element={<OverduePage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/settings/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
