import React from "react";
import { Link, useNavigate } from "react-router";
import { useAuthStore } from "../store/authStore";

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const { user, logout, isAuthenticated } = useAuthStore();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <nav className="flex items-center justify-between px-6 py-4 bg-white shadow">
            <Link to="/" className="text-xl font-bold text-blue-700">
                TechBazar
            </Link>

            <div>
                {isAuthenticated && user ? (
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
                ) : (
                    <Link to="/login" className="text-base font-medium text-blue-700 hover:underline">
                        Login
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;