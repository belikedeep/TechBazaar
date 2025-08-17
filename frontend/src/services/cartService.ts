// Cart API service

import type { Cart, CartItem } from "../types/cart";

const API_BASE = `${import.meta.env.VITE_API_BASE}/api/cart`;

function getAuthHeader(): HeadersInit | undefined {
    const token = localStorage.getItem("token");
    console.log("CartService Authorization header:", token ? `Bearer ${token}` : "none");
    if (token) return { Authorization: `Bearer ${token}` };
    return undefined;
}

export const cartService = {
    async getCart(): Promise<Cart> {
        const res = await fetch(`${API_BASE}`, {
            headers: getAuthHeader()
        });
        if (!res.ok) throw new Error("Failed to fetch cart");
        const backendCart = await res.json();
        const items: CartItem[] = (backendCart.items || []).map((item: any) => ({
            id: item._id || item.product?._id || item.productId,
            productId: item.product?._id || item.productId,
            name: item.product?.name || "",
            price: item.product?.price ?? 0,
            quantity: item.quantity,
            image: item.product?.image || ""
        }));
        const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        return { items, total };
    },

    async addToCart(item: CartItem): Promise<Cart> {
        const res = await fetch(`${API_BASE}/add`, {
            method: "POST",
            headers: Object.assign(
                { "Content-Type": "application/json" },
                getAuthHeader()
            ),
            body: JSON.stringify(item),
        });
        if (!res.ok) throw new Error("Failed to add to cart");
        const backendCart = await res.json();
        const items: CartItem[] = (backendCart.items || []).map((item: any) => ({
            id: item._id || item.product?._id || item.productId,
            productId: item.product?._id || item.productId,
            name: item.product?.name || "",
            price: item.product?.price ?? 0,
            quantity: item.quantity,
            image: item.product?.image || ""
        }));
        const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        return { items, total };
    },

    async updateCartItem(item: CartItem): Promise<Cart> {
        const res = await fetch(`${API_BASE}/update`, {
            method: "PUT",
            headers: Object.assign(
                { "Content-Type": "application/json" },
                getAuthHeader()
            ),
            body: JSON.stringify({
                product: item.productId,
                quantity: item.quantity
            }),
        });
        if (!res.ok) throw new Error("Failed to update cart item");
        const backendCart = await res.json();
        const items: CartItem[] = (backendCart.items || []).map((item: any) => ({
            id: item._id || item.product?._id || item.productId,
            productId: item.product?._id || item.productId,
            name: item.product?.name || "",
            price: item.product?.price ?? 0,
            quantity: item.quantity,
            image: item.product?.image || ""
        }));
        const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        return { items, total };
    },

    async removeFromCart(itemId: string): Promise<Cart> {
        const res = await fetch(`${API_BASE}/remove/${itemId}`, {
            method: "DELETE",
            headers: getAuthHeader()
        });
        if (!res.ok) throw new Error("Failed to remove from cart");
        const backendCart = await res.json();
        const items: CartItem[] = (backendCart.items || []).map((item: any) => ({
            id: item._id || item.product?._id || item.productId,
            productId: item.product?._id || item.productId,
            name: item.product?.name || "",
            price: item.product?.price ?? 0,
            quantity: item.quantity,
            image: item.product?.image || ""
        }));
        const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        return { items, total };
    },

    async clearCart(): Promise<void> {
        const res = await fetch(`${API_BASE}/clear`, {
            method: "DELETE",
            headers: getAuthHeader()
        });
        if (!res.ok) throw new Error("Failed to clear cart");
    },
};