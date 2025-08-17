// Order API service

import type { Order } from "../types/order";

const API_BASE = "http://localhost:3000/api/orders";

export const orderService = {
    async getOrders(): Promise<Order[]> {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_BASE}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch orders");
        const data = await res.json();
        // Map _id to id for all orders
        return data.map((order: any) => ({
            ...order,
            id: order._id,
        }));
    },

    async getOrderById(id: string): Promise<Order> {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_BASE}/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch order");
        const order = await res.json();
        return { ...order, id: order._id };
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
        const order = await res.json();
        return { ...order, id: order._id };
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
        const order = await res.json();
        return { ...order, id: order._id };
    },
};