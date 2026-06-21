
import { create } from "zustand"

interface UIState {
  sidebarCollapsed: boolean
  mobileSidebarOpen: boolean
  activeModal: string | null
  selectedInstallmentId: string | null
  toggleSidebar: () => void
  setMobileSidebarOpen: (open: boolean) => void
  openModal: (name: string) => void
  closeModal: () => void
  setSelectedInstallment: (id: string | null) => void
}

export const useUIStore = create<UIState>((set) => ({
  sidebarCollapsed: true,
  mobileSidebarOpen: false,
  activeModal: null,
  selectedInstallmentId: null,
  toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
  setMobileSidebarOpen: (open) => set({ mobileSidebarOpen: open }),
  openModal: (name) => set({ activeModal: name }),
  closeModal: () => set({ activeModal: null, selectedInstallmentId: null }),
  setSelectedInstallment: (id) => set({ selectedInstallmentId: id }),
}))
