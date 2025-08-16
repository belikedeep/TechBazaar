import { Request, Response } from "express";
import * as orderService from "./order-service";

export async function createOrderHandler(req: any, res: Response) {
    try {
        const order = await orderService.createOrder(req.user.id, req.body);
        res.status(201).json(order);
    } catch (err) {
        res.status(400).json({ error: "Failed to create order" });
    }
}

export async function getUserOrdersHandler(req: any, res: Response) {
    try {
        const orders = await orderService.getUserOrders(req.user.id);
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch orders" });
    }
}

export async function getOrderByIdHandler(req: any, res: Response) {
    try {
        const order = await orderService.getOrderById(req.params.id!);
        if (!order) return res.status(404).json({ error: "Order not found" });
        // Only allow user to access their own order, or admin
        if (order.user.toString() !== req.user.id && req.user.role !== "admin") {
            return res.status(403).json({ error: "Forbidden" });
        }
        res.json(order);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch order" });
    }
}

export async function updateOrderStatusHandler(req: Request, res: Response) {
    try {
        const { status } = req.body;
        const order = await orderService.updateOrderStatus(req.params.id!, status);
        if (!order) return res.status(404).json({ error: "Order not found" });
        res.json(order);
    } catch (err) {
        res.status(400).json({ error: "Failed to update order status" });
    }
}

export async function getAllOrdersHandler(req: Request, res: Response) {
    try {
        const orders = await orderService.getAllOrders();
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch all orders" });
    }
}