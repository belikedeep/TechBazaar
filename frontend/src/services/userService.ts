// User API service

import type { AuthUser } from "../types/auth";

const API_BASE = "/api/users";

export const userService = {
    async getProfile(): Promise<AuthUser> {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_BASE}/profile`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch profile");
        return res.json();
    },

    async updateProfile(data: Partial<AuthUser>): Promise<AuthUser> {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_BASE}/profile`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error("Failed to update profile");
        return res.json();
    },
};