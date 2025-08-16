// Zustand store for user profile state

import { create } from "zustand";
import type { AuthUser } from "../types/auth";
import { userService } from "../services/userService";

type State = {
    profile: AuthUser | null;
    loading: boolean;
    error: string | null;
};

type Actions = {
    fetchProfile: () => Promise<void>;
    updateProfile: (data: Partial<AuthUser>) => Promise<void>;
};

export const useUserStore = create<State & Actions>((set) => ({
    profile: null,
    loading: false,
    error: null,

    fetchProfile: async () => {
        set({ loading: true, error: null });
        try {
            const profile = await userService.getProfile();
            set({ profile, loading: false });
        } catch (err: any) {
            set({ error: err.message || "Failed to fetch profile", loading: false });
        }
    },

    updateProfile: async (data) => {
        set({ loading: true, error: null });
        try {
            const profile = await userService.updateProfile(data);
            set({ profile, loading: false });
        } catch (err: any) {
            set({ error: err.message || "Failed to update profile", loading: false });
        }
    },
}));