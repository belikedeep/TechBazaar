// Zustand store for authentication state

import { create } from "zustand";
import type { AuthUser } from "../types/auth";
import { authService } from "../services/authService";

type State = {
    user: AuthUser | null;
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
};

type Actions = {
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    register: (data: { name: string; email: string; password: string }) => Promise<void>;
    fetchProfile: () => Promise<void>;
    setToken: (token: string) => void;
};

export const useAuthStore = create<State & Actions>((set) => ({
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null,

    login: async (email, password) => {
        set({ loading: true, error: null });
        try {
            const { user, token } = await authService.login({ email, password });
            set({ user, token, isAuthenticated: true, loading: false });
        } catch (err: any) {
            set({ error: err.message || "Login failed", loading: false });
        }
    },

    logout: () => {
        authService.logout();
        set({ user: null, token: null, isAuthenticated: false });
    },

    register: async (data) => {
        set({ loading: true, error: null });
        try {
            await authService.register(data);
            set({ loading: false });
        } catch (err: any) {
            set({ error: err.message || "Registration failed", loading: false });
        }
    },

    fetchProfile: async () => {
        set({ loading: true, error: null });
        try {
            const user = await authService.getProfile();
            set({ user, isAuthenticated: true, loading: false });
        } catch (err: any) {
            set({ error: err.message || "Fetch profile failed", loading: false });
        }
    },

    setToken: (token) => set({ token }),
}));