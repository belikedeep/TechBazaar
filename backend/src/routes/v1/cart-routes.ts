// Cart Management API Routes

import { Router } from "express";
import { authenticateJWT } from "../../middleware/authMiddleware";
import {
    getUserCartHandler,
    addItemToCartHandler,
    updateCartItemHandler,
    removeCartItemHandler,
    clearCartHandler
} from "../../services/cart/cart-handlers";

const router = Router();

// GET /api/cart - Get user's cart
router.get("/", authenticateJWT, getUserCartHandler);

// POST /api/cart/add - Add item to cart
router.post("/add", authenticateJWT, addItemToCartHandler);

// PUT /api/cart/update - Update cart item quantity
router.put("/update", authenticateJWT, updateCartItemHandler);

// DELETE /api/cart/remove/:itemId - Remove item from cart
router.delete("/remove/:itemId", authenticateJWT, removeCartItemHandler);

// DELETE /api/cart/clear - Clear entire cart
router.delete("/clear", authenticateJWT, clearCartHandler);

// POST /api/cart/guest - Handle guest cart operations (stateless, returns calculated cart)
router.post("/guest", (req, res) => {
    res.json(req.body);
});

export default router;
