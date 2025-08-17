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
        <nav className="flex items-center justify-between px-6 py-4 bg-white shadow">
            <Link to="/" className="text-xl font-bold text-blue-700">
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
                            <ShoppingCart className="w-6 h-6 text-gray-700" />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full px-1.5 py-0.5 font-bold">
                                    {cartCount}
                                </span>
                            )}
                        </button>
                        <div className="flex items-center gap-4">
                            {user.role === "admin" && (
                                <Link to="/admin" className="text-sm font-medium text-gray-700 hover:underline">
                                    Admin
                                </Link>
                            )}
                            <span className="text-base text-gray-700">Hello, {user.name || user.email}</span>
                            <button
                                onClick={handleLogout}
                                className="text-base font-medium text-blue-700 hover:underline"
                            >
                                Logout
                            </button>
                        </div>
                        <Link to="/profile" className="text-base font-medium text-blue-700 hover:underline">
                            Profile
                        </Link>
                    </>
                )}
                {!(isAuthenticated && user) && (
                    <Link to="/login" className="text-base font-medium text-blue-700 hover:underline">
                        Login
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;