import React, { useState } from "react";
import { useCartStore } from "../store/cartStore";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router";
import { orderService } from "../services/orderService";
import type { CartItem } from "../types/cart";

const CheckoutPage: React.FC = () => {
    const { cartItems, total } = useCartStore();
    const { isAuthenticated } = useAuthStore();
    const navigate = useNavigate();

    // Redirect to login if not authenticated
    React.useEffect(() => {
        if (!isAuthenticated) navigate("/login");
    }, [isAuthenticated, navigate]);

    // Address state
    const [address, setAddress] = useState({
        name: "",
        street: "",
        city: "",
        state: "",
        postalCode: "",
        phone: "",
    });
    const [payment, setPayment] = useState("cod");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddress({ ...address, [e.target.name]: e.target.value });
    };

    const handlePlaceOrder = async () => {
        setLoading(true);
        setError(null);
        setSuccess(null);
        try {
            // Prepare order payload
            const orderPayload = {
                items: cartItems.map((item) => ({
                    productId: item.productId,
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price,
                })),
                total,
                shippingAddress: `${address.name}, ${address.street}, ${address.city}, ${address.state}, ${address.postalCode}, ${address.phone}`,
            };
            await orderService.createOrder(orderPayload as Partial<import("../types/order").Order>);
            setSuccess("Order placed successfully! Thank you for shopping.");
            setLoading(false);
            // Clear cart in store
            useCartStore.getState().setCart([]);
        } catch (err: unknown) {
            if (err && typeof err === "object" && "message" in err) {
                setError((err as { message?: string }).message || "Failed to place order");
            } else {
                setError("Failed to place order");
            }
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Checkout</h1>
            <div className="mb-8">
                <h2 className="text-lg font-semibold mb-2">Cart Summary</h2>
                <ul className="divide-y">
                    {cartItems.map((item: CartItem) => (
                        <li key={item.productId} className="flex justify-between py-2">
                            <span>
                                {item.name} x {item.quantity}
                            </span>
                            <span>₹{item.price * item.quantity}</span>
                        </li>
                    ))}
                </ul>
                <div className="text-right font-bold mt-2">Total: ₹{total}</div>
            </div>
            <div className="mb-8">
                <h2 className="text-lg font-semibold mb-2">Shipping Address</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input name="name" placeholder="Full Name" value={address.name} onChange={handleInput} className="border rounded px-3 py-2" required />
                    <input name="phone" placeholder="Phone" value={address.phone} onChange={handleInput} className="border rounded px-3 py-2" required />
                    <input name="street" placeholder="Street Address" value={address.street} onChange={handleInput} className="border rounded px-3 py-2 md:col-span-2" required />
                    <input name="city" placeholder="City" value={address.city} onChange={handleInput} className="border rounded px-3 py-2" required />
                    <input name="state" placeholder="State" value={address.state} onChange={handleInput} className="border rounded px-3 py-2" required />
                    <input name="postalCode" placeholder="Postal Code" value={address.postalCode} onChange={handleInput} className="border rounded px-3 py-2" required />
                </div>
            </div>
            <div className="mb-8">
                <h2 className="text-lg font-semibold mb-2">Payment Method</h2>
                <label className="flex items-center gap-2 mb-2">
                    <input
                        type="radio"
                        name="payment"
                        value="cod"
                        checked={payment === "cod"}
                        onChange={() => setPayment("cod")}
                    />
                    Cash on Delivery
                </label>
                <label className="flex items-center gap-2 mb-2">
                    <input
                        type="radio"
                        name="payment"
                        value="card"
                        checked={payment === "card"}
                        onChange={() => setPayment("card")}
                        disabled
                    />
                    Credit/Debit Card (Coming Soon)
                </label>
            </div>
            {error && <div className="text-red-600 mb-4">{error}</div>}
            {success && <div className="text-green-600 mb-4">{success}</div>}
            <button
                className="bg-blue-700 text-white px-6 py-2 rounded font-semibold hover:bg-blue-800 disabled:opacity-60"
                disabled={
                    loading ||
                    !address.name ||
                    !address.street ||
                    !address.city ||
                    !address.state ||
                    !address.postalCode ||
                    !address.phone ||
                    cartItems.length === 0
                }
                onClick={handlePlaceOrder}
            >
                {loading ? "Placing Order..." : "Place Order"}
            </button>
        </div>
    );
};

export default CheckoutPage;