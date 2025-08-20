import React from "react";
import { Link, useNavigate } from "react-router";
import { useAuthStore } from "../store/authStore";
import { useCartStore } from "../store/cartStore";
import { ShoppingCart } from "lucide-react";

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const { user, logout, isAuthenticated } = useAuthStore();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    const { cartItems } = useCartStore();
    const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <nav className="flex items-center justify-between px-8 py-4 bg-transparent/40 backdrop-blur-xl border-b border-white/10 shadow-lg z-30 rounded-b-2xl">
            <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
                <Link
                    to="/"
                    className="text-2xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-400 drop-shadow-[0_2px_12px_rgba(168,139,250,0.6)] hover:drop-shadow-[0_4px_24px_rgba(168,139,250,0.8)] transition"
                    style={{ letterSpacing: "0.03em" }}
                >
                    TechBazar
                </Link>

                <div className="flex items-center gap-6">
                    {isAuthenticated && user && (
                        <>
                            <button
                                className="relative group"
                                onClick={() => navigate("/cart")}
                                aria-label="Cart"
                            >
                                <ShoppingCart className="w-6 h-6 text-purple-200 group-hover:text-pink-400 transition drop-shadow-[0_2px_8px_rgba(168,139,250,0.5)]" />
                                {cartCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-gradient-to-tr from-pink-500 via-purple-500 to-fuchsia-400 text-white text-xs rounded-full px-1.5 py-0.5 font-bold shadow-lg">
                                        {cartCount}
                                    </span>
                                )}
                            </button>
                            <div className="flex items-center gap-4">
                                {user.role === "admin" && (
                                    <Link to="/admin" className="text-sm font-semibold text-purple-200 hover:text-pink-300 transition">
                                        Admin
                                    </Link>
                                )}
                                <span className="text-base text-gray-100/80 font-medium">Hello, {user.name || user.email}</span>
                                <button
                                    onClick={handleLogout}
                                    className="text-base font-semibold text-purple-200 hover:text-pink-300 transition"
                                >
                                    Logout
                                </button>
                            </div>
                            <Link to="/profile" className="text-base font-semibold text-purple-200 hover:text-pink-300 transition">
                                Profile
                            </Link>
                        </>
                    )}
                    {!(isAuthenticated && user) && (
                        <Link to="/login" className="text-base font-semibold text-purple-200 hover:text-pink-300 transition">
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;