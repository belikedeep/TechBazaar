import Order from "../../db/schemas/order";

import Cart from "../../db/schemas/cart";

export async function createOrder(userId: string, data: any) {
    const { items, total, shippingAddress } = data;
    const order = new Order({
        user: userId,
        items,
        total,
        shippingAddress
    });
    const savedOrder = await order.save();

    // Clear user's cart after order is placed
    await Cart.findOneAndUpdate(
        { user: userId },
        { $set: { items: [] } }
    );

    return savedOrder;
}

export async function getUserOrders(userId: string) {
    return Order.find({ user: userId }).sort({ createdAt: -1 });
}

export async function getOrderById(orderId: string) {
    return Order.findById(orderId);
}

export async function updateOrderStatus(orderId: string, status: string) {
    return Order.findByIdAndUpdate(orderId, { status }, { new: true });
}

export async function getAllOrders() {
    return Order.find().sort({ createdAt: -1 });
}