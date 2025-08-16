// Zustand store for order state

import { create } from "zustand";
import type { Order } from "../types/order";
import { orderService } from "../services/orderService";

type State = {
    orders: Order[];
    currentOrder: Order | null;
    loading: boolean;
    error: string | null;
};

type Actions = {
    fetchOrders: () => Promise<void>;
    fetchOrderById: (id: string) => Promise<void>;
    createOrder: (data: Partial<Order>) => Promise<void>;
    updateOrderStatus: (id: string, status: string) => Promise<void>;
};

export const useOrderStore = create<State & Actions>((set) => ({
    orders: [],
    currentOrder: null,
    loading: false,
    error: null,

    fetchOrders: async () => {
        set({ loading: true, error: null });
        try {
            const orders = await orderService.getOrders();
            set({ orders, loading: false });
        } catch (err: any) {
            set({ error: err.message || "Failed to fetch orders", loading: false });
        }
    },

    fetchOrderById: async (id) => {
        set({ loading: true, error: null });
        try {
            const order = await orderService.getOrderById(id);
            set({ currentOrder: order, loading: false });
        } catch (err: any) {
            set({ error: err.message || "Failed to fetch order", loading: false });
        }
    },

    createOrder: async (data) => {
        set({ loading: true, error: null });
        try {
            const order = await orderService.createOrder(data);
            set({ currentOrder: order, loading: false });
        } catch (err: any) {
            set({ error: err.message || "Failed to create order", loading: false });
        }
    },

    updateOrderStatus: async (id, status) => {
        set({ loading: true, error: null });
        try {
            const order = await orderService.updateOrderStatus(id, status);
            set({ currentOrder: order, loading: false });
        } catch (err: any) {
            set({ error: err.message || "Failed to update order status", loading: false });
        }
    },
}));