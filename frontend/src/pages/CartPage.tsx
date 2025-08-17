// CartPage: Cart Items List, Quantity Controls, Totals, Checkout Button

import React, { useEffect } from "react";
import { useCartStore } from "../store/cartStore";
import { Link } from "react-router";

const CartPage: React.FC = () => {
    const {
        cartItems,
        total,
        loading,
        error,
        fetchCart,
        updateCartItem,
        removeFromCart,
        clearCart,
    } = useCartStore();

    useEffect(() => {
        fetchCart();
    }, [fetchCart]);

    const handleQuantityChange = (itemId: string, quantity: number) => {
        const item = cartItems.find((i) => i.id === itemId);
        if (item && quantity > 0) {
            // Optimistically update UI for better UX
            updateCartItem({ ...item, quantity });
        }
    };

    const handleRemove = (itemId: string) => {
        removeFromCart(itemId);
    };

    if (loading) return <div className="p-8 text-center">Loading cart...</div>;
    if (error) return <div className="p-8 text-red-500 text-center">{error}</div>;

    // Remove forced re-render logic; Zustand store updates should trigger re-render

    return (
        <div className="max-w-3xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <div className="text-center text-gray-500">
                    Your cart is empty. <Link to="/" className="text-blue-600 underline">Continue shopping</Link>
                </div>
            ) : (
                <div>
                    <ul className="divide-y">
                        {cartItems.map((item) => (
                            <li key={item.id} className="flex items-center py-4">
                                {item.image && (
                                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded mr-4" />
                                )}
                                <div className="flex-1">
                                    <div className="font-semibold">{item.name}</div>
                                    <div className="text-gray-600">₹{item.price}</div>
                                    <div className="flex items-center mt-2">
                                        <button
                                            className="px-2 py-1 border rounded-l"
                                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                            disabled={item.quantity <= 1}
                                        >-</button>
                                        <span className="px-3">{item.quantity}</span>
                                        <button
                                            className="px-2 py-1 border rounded-r"
                                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                        >+</button>
                                    </div>
                                </div>
                                <div className="w-24 text-right font-semibold">
                                    ₹{item.price * item.quantity}
                                </div>
                                <button
                                    className="ml-4 text-red-500 hover:underline"
                                    onClick={() => handleRemove(item.id)}
                                    title="Remove"
                                >Remove</button>
                            </li>
                        ))}
                    </ul>
                    <div className="flex justify-between items-center mt-8 border-t pt-4">
                        <button
                            className="text-sm text-gray-500 underline"
                            onClick={() => clearCart()}
                        >
                            Clear Cart
                        </button>
                        <div className="text-xl font-bold">
                            Total: ₹{total}
                        </div>
                    </div>
                    <div className="mt-6 text-right">
                        <Link
                            to="/checkout"
                            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                        >
                            Proceed to Checkout
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;