// Cart Management API Routes

import { Router } from "express";
import Cart from "../../db/schemas/cart";
import { authenticateJWT } from "../../middleware/authMiddleware";

const router = Router();

// GET /api/cart - Get user's cart
router.get("/", authenticateJWT, async (req: any, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id }).populate("items.product");
        if (!cart) return res.json({ items: [] });
        res.json(cart);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch cart" });
    }
});

// POST /api/cart/add - Add item to cart
router.post("/add", authenticateJWT, async (req: any, res) => {
    try {
        const { product, quantity } = req.body;
        let cart = await Cart.findOne({ user: req.user.id });
        if (!cart) {
            cart = new Cart({ user: req.user.id, items: [] });
        }
        if (!cart.items) cart.items = [];
        const itemIndex = cart.items.findIndex((item: any) => item.product.equals(product));
        if (itemIndex > -1) {
            cart.items[itemIndex]!.quantity += quantity;
        } else {
            cart.items.push({ product, quantity });
        }
        await cart.save();
        res.json(cart);
    } catch (err) {
        res.status(400).json({ error: "Failed to add item to cart" });
    }
});

// PUT /api/cart/update - Update cart item quantity
router.put("/update", authenticateJWT, async (req: any, res) => {
    try {
        const { product, quantity } = req.body;
        const cart = await Cart.findOne({ user: req.user.id });
        if (!cart) return res.status(404).json({ error: "Cart not found" });
        const item = cart.items.find((item: any) => item.product.equals(product));
        if (!item) return res.status(404).json({ error: "Item not found in cart" });
        item.quantity = quantity;
        await cart.save();
        res.json(cart);
    } catch (err) {
        res.status(400).json({ error: "Failed to update cart item" });
    }
});

// DELETE /api/cart/remove/:itemId - Remove item from cart
router.delete("/remove/:itemId", authenticateJWT, async (req: any, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id });
        if (!cart) return res.status(404).json({ error: "Cart not found" });
        cart.items = cart.items.filter((item: any) => !item.product.equals(req.params.itemId));
        await cart.save();
        res.json(cart);
    } catch (err) {
        res.status(400).json({ error: "Failed to remove item from cart" });
    }
});

// DELETE /api/cart/clear - Clear entire cart
router.delete("/clear", authenticateJWT, async (req: any, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id });
        if (!cart) return res.status(404).json({ error: "Cart not found" });
        cart.items = [];
        await cart.save();
        res.json(cart);
    } catch (err) {
        res.status(400).json({ error: "Failed to clear cart" });
    }
});

// POST /api/cart/guest - Handle guest cart operations (stateless, returns calculated cart)
router.post("/guest", async (req, res) => {
    try {
        // For guest, just echo back the cart structure sent by client
        // Optionally, you could validate product IDs and quantities here
        res.json(req.body);
    } catch (err) {
        res.status(400).json({ error: "Failed to handle guest cart" });
    }
});

export default router;
