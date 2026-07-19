import { create } from "zustand";

const SIDEBAR_COLLAPSED_KEY = "sidebarCollapsed";
const NEW_CUSTOMER_OPEN_KEY = "newCustomerOpen";

interface UIState {
  sidebarCollapsed: boolean;
  mobileSidebarOpen: boolean;
  activeModal: string | null;
  selectedInstallmentId: string | null;

  /* New Customer */
  newCustomerOpen: boolean;

  toggleSidebar: () => void;
  setMobileSidebarOpen: (open: boolean) => void;
  openModal: (name: string) => void;
  closeModal: () => void;
  setSelectedInstallment: (id: string | null) => void;
  openNewCustomer: () => void;
  closeNewCustomer: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarCollapsed: localStorage.getItem(SIDEBAR_COLLAPSED_KEY) === "true",
  mobileSidebarOpen: false,
  activeModal: null,
  selectedInstallmentId: null,

  /* New Customer */
  newCustomerOpen: sessionStorage.getItem(NEW_CUSTOMER_OPEN_KEY) === "true",

  toggleSidebar: () =>
    set((s) => {
      const nextCollapsed = !s.sidebarCollapsed;
      localStorage.setItem(SIDEBAR_COLLAPSED_KEY, String(nextCollapsed));
      return { sidebarCollapsed: nextCollapsed };
    }),
  setMobileSidebarOpen: (open) => set({ mobileSidebarOpen: open }),
  openModal: (name) => set({ activeModal: name }),
  closeModal: () => set({ activeModal: null, selectedInstallmentId: null }),
  setSelectedInstallment: (id) => set({ selectedInstallmentId: id }),
  openNewCustomer: () => {
    sessionStorage.setItem(NEW_CUSTOMER_OPEN_KEY, "true");
    set({ newCustomerOpen: true });
  },
  closeNewCustomer: () => {
    sessionStorage.removeItem(NEW_CUSTOMER_OPEN_KEY);
    set({ newCustomerOpen: false });
  },
}));
