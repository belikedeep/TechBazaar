// OrderManagementPage: Orders Table, Status Updates, Details View

import React, { useEffect, useState } from "react";
import { orderService } from "../services/orderService";
import type { Order } from "../types/order";

const statusOptions = ["pending", "processing", "shipped", "delivered", "cancelled"];

const OrderManagementPage: React.FC = () => {
    // Removed unused user variable
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [updating, setUpdating] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        fetch(`${import.meta.env.VITE_API_BASE}/api/orders/admin/all`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then((res) => res.json())
            .then((data: Array<Order & { _id: string }>) =>
                setOrders(
                    data.map((order) => ({
                        ...order,
                        id: order._id,
                    }))
                )
            )
            .catch((e) => setError(e.message || "Failed to load orders"))
            .finally(() => setLoading(false));
    }, []);

    const handleStatusChange = async (orderId: string, status: string) => {
        setUpdating(orderId);
        try {
            await orderService.updateOrderStatus(orderId, status);
            setOrders((prev) =>
                prev.map((order) =>
                    order.id === orderId ? { ...order, status } : order
                )
            );
        } catch (e: unknown) {
            if (e && typeof e === "object" && "message" in e) {
                alert((e as { message?: string }).message || "Failed to update status");
            } else {
                alert("Failed to update status");
            }
        }
        setUpdating(null);
    };

    return (
        <div className="max-w-5xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Order Management</h1>
            {loading && <div>Loading orders...</div>}
            {error && <div className="text-red-600">{error}</div>}
            <table className="w-full border">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-2 border">Order ID</th>
                        <th className="p-2 border">User</th>
                        <th className="p-2 border">Total</th>
                        <th className="p-2 border">Status</th>
                        <th className="p-2 border">Date</th>
                        <th className="p-2 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id || order.createdAt} className="border-b">
                            <td className="p-2 border">{order.id ?? "N/A"}</td>
                            <td className="p-2 border">{order.user || "N/A"}</td>
                            <td className="p-2 border">₹{order.total}</td>
                            <td className="p-2 border">
                                <select
                                    value={order.status}
                                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                    disabled={updating === order.id}
                                    className="border rounded px-2 py-1"
                                >
                                    {statusOptions.map((status) => (
                                        <option key={status} value={status}>
                                            {status}
                                        </option>
                                    ))}
                                </select>
                            </td>
                            <td className="p-2 border">
                                {new Date(order.createdAt).toLocaleString()}
                            </td>
                            <td className="p-2 border">
                                <details>
                                    <summary className="cursor-pointer text-blue-600 underline">
                                        Details
                                    </summary>
                                    <div className="mt-2">
                                        <div>
                                            <b>Shipping:</b> {order.shippingAddress}
                                        </div>
                                        <ul className="ml-4 mt-2">
                                            {order.items.map((item, idx) => (
                                                <li key={item.product + '-' + idx}>
                                                    {item.product} x {item.quantity} @ ₹{item.price}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </details>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrderManagementPage;