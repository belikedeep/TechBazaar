// Zustand store for cart state

import { create } from "zustand";
import type { CartItem } from "../types/cart";
import { cartService } from "../services/cartService";

type State = {
    cartItems: CartItem[];
    total: number;
    loading: boolean;
    error: string | null;
};

type Actions = {
    fetchCart: () => Promise<void>;
    addToCart: (item: CartItem) => Promise<void>;
    updateCartItem: (item: CartItem) => Promise<void>;
    removeFromCart: (itemId: string) => Promise<void>;
    clearCart: () => Promise<void>;
    setCart: (items: CartItem[]) => void;
};

export const useCartStore = create<State & Actions>((set, get) => ({
    cartItems: [],
    total: 0,
    loading: false,
    error: null,

    fetchCart: async () => {
        set({ loading: true, error: null });
        try {
            const cart = await cartService.getCart();
            set({ cartItems: cart.items, total: cart.total, loading: false });
        } catch (err: any) {
            set({ error: err.message || "Failed to fetch cart", loading: false });
        }
    },

    addToCart: async (item) => {
        set({ loading: true, error: null });
        try {
            const cart = await cartService.addToCart(item);
            set({ cartItems: cart.items, total: cart.total, loading: false });
        } catch (err: any) {
            set({ error: err.message || "Failed to add to cart", loading: false });
        }
    },

    updateCartItem: async (item) => {
        set({ loading: true, error: null });
        try {
            const cart = await cartService.updateCartItem(item);
            set({ cartItems: cart.items, total: cart.total, loading: false });
        } catch (err: any) {
            set({ error: err.message || "Failed to update cart item", loading: false });
        }
    },

    removeFromCart: async (itemId) => {
        set({ loading: true, error: null });
        try {
            const cart = await cartService.removeFromCart(itemId);
            set({ cartItems: cart.items, total: cart.total, loading: false });
        } catch (err: any) {
            set({ error: err.message || "Failed to remove from cart", loading: false });
        }
    },

    clearCart: async () => {
        set({ loading: true, error: null });
        try {
            await cartService.clearCart();
            set({ cartItems: [], total: 0, loading: false });
        } catch (err: any) {
            set({ error: err.message || "Failed to clear cart", loading: false });
        }
    },

    setCart: (items) => set({ cartItems: items }),
}));