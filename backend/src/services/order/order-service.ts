import Order from "../../db/schemas/order";

export async function createOrder(userId: string, data: any) {
    const { items, total, shippingAddress } = data;
    const order = new Order({
        user: userId,
        items,
        total,
        shippingAddress
    });
    return order.save();
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