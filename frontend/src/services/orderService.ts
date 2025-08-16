// Order API service

import type { Order } from "../types/order";

const API_BASE = "/api/orders";

export const orderService = {
    async getOrders(): Promise<Order[]> {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_BASE}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch orders");
        return res.json();
    },

    async getOrderById(id: string): Promise<Order> {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_BASE}/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch order");
        return res.json();
    },

    async createOrder(data: Partial<Order>): Promise<Order> {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_BASE}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error("Failed to create order");
        return res.json();
    },

    async updateOrderStatus(id: string, status: string): Promise<Order> {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_BASE}/${id}/status`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ status }),
        });
        if (!res.ok) throw new Error("Failed to update order status");
        return res.json();
    },
};