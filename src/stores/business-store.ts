import { create } from "zustand";

interface BusinessState {
  logoUrl: string | null;
  setLogoUrl: (logoUrl: string | null) => void;
}

export const useBusinessStore = create<BusinessState>((set) => ({
  logoUrl: null,
  setLogoUrl: (logoUrl) => set({ logoUrl }),
}));
