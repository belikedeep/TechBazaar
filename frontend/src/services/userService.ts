// User API service

import type { AuthUser } from "../types/auth";

// Use explicit backend base so requests hit backend server directly
const API_BASE = "http://localhost:3000/api/users";

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

    // Admin: get all users
    async getAllUsers(): Promise<AuthUser[]> {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_BASE}/admin/users`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch users");
        return res.json();
    },

    // Admin: delete user (will call backend DELETE /api/users/admin/users/:id)
    async deleteUser(userId: string): Promise<{ message?: string }> {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_BASE}/admin/users/${userId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (!res.ok) {
            const text = await res.text();
            throw new Error(text || "Failed to delete user");
        }
        return res.json();
    },
};