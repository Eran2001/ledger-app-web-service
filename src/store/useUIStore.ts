import { create } from 'zustand'

interface UIState {
  sidebarCollapsed: boolean
  activeModal: string | null
  selectedInstallmentId: string | null
  toggleSidebar: () => void
  openModal: (name: string) => void
  closeModal: () => void
  setSelectedInstallment: (id: string | null) => void
}

export const useUIStore = create<UIState>((set) => ({
  sidebarCollapsed: false,
  activeModal: null,
  selectedInstallmentId: null,
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  openModal: (name) => set({ activeModal: name }),
  closeModal: () => set({ activeModal: null }),
  setSelectedInstallment: (id) => set({ selectedInstallmentId: id }),
}))
