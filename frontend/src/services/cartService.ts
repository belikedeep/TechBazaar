// Cart API service

import type { Cart, CartItem } from "../types/cart";

const API_BASE = "/api/cart";

export const cartService = {
    async getCart(): Promise<Cart> {
        const res = await fetch(`${API_BASE}`, { credentials: "include" });
        if (!res.ok) throw new Error("Failed to fetch cart");
        return res.json();
    },

    async addToCart(item: CartItem): Promise<Cart> {
        const res = await fetch(`${API_BASE}/add`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(item),
        });
        if (!res.ok) throw new Error("Failed to add to cart");
        return res.json();
    },

    async updateCartItem(item: CartItem): Promise<Cart> {
        const res = await fetch(`${API_BASE}/update`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(item),
        });
        if (!res.ok) throw new Error("Failed to update cart item");
        return res.json();
    },

    async removeFromCart(itemId: string): Promise<Cart> {
        const res = await fetch(`${API_BASE}/remove/${itemId}`, {
            method: "DELETE",
            credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to remove from cart");
        return res.json();
    },

    async clearCart(): Promise<void> {
        const res = await fetch(`${API_BASE}/clear`, {
            method: "DELETE",
            credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to clear cart");
    },
};