import { create } from "zustand";
import type { Employee } from "@/types/employee-types";
import { employees } from "@/constant/employee-data";

interface AuthState {
  user: Employee | null;
  isAuthenticated: boolean;
  login: (user: Employee) => void;
  updateUser: (user: Employee) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: employees[0],
  isAuthenticated: true,
  login: (user) => set({ user, isAuthenticated: true }),
  updateUser: (user) => set({ user }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));
