import Cart from "../../db/schemas/cart";
import mongoose from "mongoose";

export async function getUserCart(userId: string) {
    return Cart.findOne({ user: userId }).populate("items.product");
}

export async function addItemToCart(userId: string, product: string, quantity: number) {
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
        cart = new Cart({ user: userId, items: [] });
    }
    if (!cart.items) cart.items = [];
    const itemIndex = cart.items.findIndex((item: any) => item.product.equals(product));
    if (itemIndex > -1) {
        cart.items[itemIndex]!.quantity += quantity;
    } else {
        cart.items.push({ product: new mongoose.Types.ObjectId(product), quantity });
    }
    await cart.save();
    return cart;
}

export async function updateCartItem(userId: string, product: string, quantity: number) {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) return null;
    const item = cart.items.find((item: any) => item.product.equals(product));
    if (!item) return null;
    item.quantity = quantity;
    await cart.save();
    return await Cart.findOne({ user: userId }).populate("items.product");
}

export async function removeCartItem(userId: string, itemId: string) {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) return null;
    cart.items = cart.items.filter((item: any) => !item.product.equals(itemId));
    await cart.save();
    return await Cart.findOne({ user: userId }).populate("items.product");
}

export async function clearCart(userId: string) {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) return null;
    cart.items = [];
    await cart.save();
    return cart;
}