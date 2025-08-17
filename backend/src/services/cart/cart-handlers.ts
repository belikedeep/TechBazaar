import { Request, Response } from "express";
import * as cartService from "./cart-service";

export async function getUserCartHandler(req: any, res: Response) {
    try {
        const cart = await cartService.getUserCart(req.user.id);
        res.json(cart || { items: [] });
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch cart" });
    }
}

export async function addItemToCartHandler(req: any, res: Response) {
    try {
        console.log("addItemToCartHandler req.body:", req.body);
        const { product, quantity } = req.body;
        const cart = await cartService.addItemToCart(req.user.id, product, quantity);
        res.json(cart);
    } catch (err) {
        console.error("addItemToCartHandler error:", err);
        res.status(400).json({ error: "Failed to add item to cart", details: (err && typeof err === "object" && "message" in err) ? (err as any).message : undefined });
    }
}

export async function updateCartItemHandler(req: any, res: Response) {
    try {
        const { product, quantity } = req.body;
        const cart = await cartService.updateCartItem(req.user.id, product, quantity);
        if (!cart) {
            res.status(404).json({ error: "Cart or item not found" });
            return;
        }
        res.json(cart);
        return;
    } catch (err) {
        res.status(400).json({ error: "Failed to update cart item" });
        return;
    }
}

export async function removeCartItemHandler(req: any, res: Response) {
    try {
        const cart = await cartService.removeCartItem(req.user.id, req.params.itemId);
        if (!cart) {
            res.status(404).json({ error: "Cart not found" });
            return;
        }
        res.json(cart);
        return;
    } catch (err) {
        res.status(400).json({ error: "Failed to remove item from cart" });
        return;
    }
}

export async function clearCartHandler(req: any, res: Response) {
    try {
        const cart = await cartService.clearCart(req.user.id);
        if (!cart) {
            res.status(404).json({ error: "Cart not found" });
            return;
        }
        res.json(cart);
        return;
    } catch (err) {
        res.status(400).json({ error: "Failed to clear cart" });
        return;
    }
}