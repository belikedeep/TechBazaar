// Order Management API Routes

import { Router } from "express";
import { authenticateJWT, requireRole } from "../../middleware/authMiddleware";
import {
    createOrderHandler,
    getUserOrdersHandler,
    getOrderByIdHandler,
    updateOrderStatusHandler,
    getAllOrdersHandler
} from "../../services/order/order-handlers";

const router = Router();

// POST /api/orders - Create new order
router.post("/", authenticateJWT, createOrderHandler);

// GET /api/orders - Get user's orders
router.get("/", authenticateJWT, getUserOrdersHandler);

// GET /api/orders/:id - Get specific order details
router.get("/:id", authenticateJWT, getOrderByIdHandler);

// PUT /api/orders/:id/status - Update order status (Admin)
router.put("/:id/status", authenticateJWT, requireRole("admin"), updateOrderStatusHandler);

// GET /api/admin/orders - Get all orders (Admin)
router.get("/admin/all", authenticateJWT, requireRole("admin"), getAllOrdersHandler);

export default router;
