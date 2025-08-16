// Authentication API service

import type { AuthUser, AuthCredentials, RegisterData } from "../types/auth";

const API_BASE = "/api";

export const authService = {
    async login(credentials: AuthCredentials): Promise<{ user: AuthUser; token: string }> {
        const res = await fetch(`${API_BASE}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
        });
        if (!res.ok) throw new Error("Login failed");
        return res.json();
    },

    async register(data: RegisterData): Promise<void> {
        const res = await fetch(`${API_BASE}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error("Registration failed");
    },

    logout(): void {
        // Remove token from storage (if used)
        localStorage.removeItem("token");
    },

    async getProfile(): Promise<AuthUser> {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_BASE}/users/profile`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch profile");
        return res.json();
    },
};