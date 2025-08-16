// Order Management API Routes

import { Router } from "express";
import Order from "../../db/schemas/order";
import { authenticateJWT, requireRole } from "../../middleware/authMiddleware";

const router = Router();

// POST /api/orders - Create new order
router.post("/", authenticateJWT, async (req: any, res) => {
    try {
        const { items, total, shippingAddress } = req.body;
        const order = new Order({
            user: req.user.id,
            items,
            total,
            shippingAddress
        });
        await order.save();
        res.status(201).json(order);
    } catch (err) {
        res.status(400).json({ error: "Failed to create order" });
    }
});

// GET /api/orders - Get user's orders
router.get("/", authenticateJWT, async (req: any, res) => {
    try {
        const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch orders" });
    }
});

// GET /api/orders/:id - Get specific order details
router.get("/:id", authenticateJWT, async (req: any, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ error: "Order not found" });
        // Only allow user to access their own order, or admin
        if (order.user.toString() !== req.user.id && req.user.role !== "admin") {
            return res.status(403).json({ error: "Forbidden" });
        }
        res.json(order);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch order" });
    }
});

// PUT /api/orders/:id/status - Update order status (Admin)
router.put("/:id/status", authenticateJWT, requireRole("admin"), async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        if (!order) return res.status(404).json({ error: "Order not found" });
        res.json(order);
    } catch (err) {
        res.status(400).json({ error: "Failed to update order status" });
    }
});

// GET /api/admin/orders - Get all orders (Admin)
router.get("/admin/all", authenticateJWT, requireRole("admin"), async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch all orders" });
    }
});

export default router;
