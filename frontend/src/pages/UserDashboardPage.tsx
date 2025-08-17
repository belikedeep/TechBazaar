// UserDashboardPage: Profile Info, Edit Profile

import React from "react";

import { useEffect, useState } from "react";
import { orderService } from "../services/orderService";
import { useAuthStore } from "../store/authStore";
import type { Order } from "../types/order";

const UserDashboardPage: React.FC = () => {
    const { user } = useAuthStore();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        orderService.getOrders()
            .then(setOrders)
            .catch((e) => setError(e.message || "Failed to load orders"))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="max-w-3xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Profile</h1>
            {user && (
                <div className="mb-8">
                    <div><b>Name:</b> {user.name || user.email}</div>
                    <div><b>Email:</b> {user.email}</div>
                </div>
            )}
            <h2 className="text-lg font-semibold mb-2">Order History</h2>
            {loading && <div>Loading orders...</div>}
            {error && <div className="text-red-600">{error}</div>}
            {orders.length === 0 && !loading && <div>No orders found.</div>}
            <ul className="divide-y">
                {orders.map((order) => (
                    <li key={order.id || order.createdAt} className="py-4">
                        <div className="flex justify-between">
                            <span className="font-semibold">Order #{order.id ?? "N/A"}</span>
                            <span className="text-sm text-gray-600">{new Date(order.createdAt).toLocaleString()}</span>
                        </div>
                        <div>Status: <b>{order.status}</b></div>
                        <div>Shipping: {order.shippingAddress}</div>
                        <ul className="ml-4 mt-2">
                            {order.items.map((item, idx) => (
                                <li key={item.product + '-' + idx}>
                                    {item.product} x {item.quantity} @ ₹{item.price}
                                </li>
                            ))}
                        </ul>
                        <div className="font-bold mt-2">Total: ₹{order.total}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserDashboardPage;