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
        <div className="max-w-7xl mx-auto p-4">
            <h1 className="text-3xl font-bold my-10 text-white tracking-tight">Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <div className="text-center text-gray-400">
                    Your cart is empty. <Link to="/" className="text-purple-400 underline">Continue shopping</Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Left: Cart Items */}
                    <div className="md:col-span-2 flex flex-col gap-6">
                        <ul className="flex flex-col gap-6">
                            {cartItems.map((item) => (
                                <li key={item.id} className="flex items-center gap-6 bg-white/5 rounded-xl p-4 shadow-sm">
                                    {item.image && (
                                        <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg flex-shrink-0" />
                                    )}
                                    <div className="flex-1 flex flex-col justify-between h-full">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <div className="font-semibold text-white text-lg">{item.name}</div>
                                                <div className="text-purple-300 text-base">₹{item.price}</div>
                                            </div>
                                            {/* <div className="w-28 text-right font-bold text-white text-lg">
                                                ₹{item.price * item.quantity}
                                            </div> */}
                                        </div>
                                        <div className="text-xs text-green-300 mt-2">Ship within 1 week</div>
                                    </div>
                                    <div className="flex flex-col items-end justify-between h-full gap-2 ml-4">
                                        <div className="flex items-center gap-2">
                                            <button
                                                className="px-3 py-1 bg-purple-700 text-white rounded-l hover:bg-purple-800 transition"
                                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                                disabled={item.quantity <= 1}
                                            >-</button>
                                            <span className="px-4 text-white text-lg">{item.quantity}</span>
                                            <button
                                                className="px-3 py-1 bg-purple-700 text-white rounded-r hover:bg-purple-800 transition"
                                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                            >+</button>
                                        </div>
                                        <button
                                            className="text-red-400 hover:underline text-sm mt-2"
                                            onClick={() => handleRemove(item.id)}
                                            title="Remove"
                                        >Remove</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="flex justify-between items-center mt-8 border-t border-white/10 pt-6">
                            <button
                                className="text-sm text-gray-400 underline hover:text-red-400 transition"
                                onClick={() => clearCart()}
                            >
                                Clear Cart
                            </button>
                        </div>
                    </div>
                    {/* Right: Order Summary */}
                    <div className="bg-white/10 backdrop-blur rounded-2xl p-8 flex flex-col gap-6 shadow-lg h-fit border border-white/10">
                        <h2 className="text-2xl font-bold mb-2 text-white">Order Summary</h2>
                        <div className="flex justify-between text-lg text-white/90">
                            <span>Subtotal</span>
                            <span>₹{total}</span>
                        </div>
                        <div className="flex justify-between text-lg text-white/90">
                            <span>Shipping</span>
                            <span>₹90</span>
                        </div>
                        <div className="flex justify-between text-xl font-bold text-white mt-2 pt-2 border-t border-white/10">
                            <span>Total</span>
                            <span>₹{total + 90}</span>
                        </div>
                        <div className="mt-6">
                            <Link
                                to="/checkout"
                                className="w-full block text-center bg-purple-700 text-white px-8 py-3 rounded-xl hover:bg-purple-800 font-semibold shadow transition"
                            >
                                Proceed to Checkout
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;