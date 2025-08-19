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
        <div className="max-w-3xl mx-auto pt-20 p-4">
            <h1 className="text-3xl font-bold mb-10 text-white tracking-tight">Profile</h1>
            {user && (
                <div className="mb-10 bg-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/10">
                    <div className="text-lg text-white mb-2"><span className="font-semibold">Name:</span> {user.name || user.email}</div>
                    <div className="text-lg text-white"><span className="font-semibold">Email:</span> {user.email}</div>
                </div>
            )}
            <h2 className="text-2xl font-semibold mb-6 text-white">Order History</h2>
            {loading && <div className="text-white/80">Loading orders...</div>}
            {error && <div className="text-red-400">{error}</div>}
            {orders.length === 0 && !loading && <div className="text-white/60">No orders found.</div>}
            <ul className="flex flex-col gap-6">
                {orders.map((order) => (
                    <li key={order.id || order.createdAt} className="bg-white/10 backdrop-blur-xl rounded-xl p-6 shadow border border-white/10">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 mb-2">
                            <span className="font-semibold text-white">Order #{order.id ?? "N/A"}</span>
                            <span className="text-sm text-white/70">{new Date(order.createdAt).toLocaleString()}</span>
                        </div>
                        <div className="mb-2 text-white/80">Status: <b className="text-purple-300">{order.status}</b></div>
                        <div className="mb-2 text-white/80">Shipping: <span className="text-white">{order.shippingAddress}</span></div>
                        <ul className="ml-4 mt-2 text-white/90">
                            {order.items.map((item, idx) => (
                                <li key={item.product + '-' + idx}>
                                    {item.product} <span className="text-purple-300">x {item.quantity}</span> @ ₹{item.price}
                                </li>
                            ))}
                        </ul>
                        <div className="font-bold mt-4 text-white text-lg">Total: ₹{order.total}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserDashboardPage;