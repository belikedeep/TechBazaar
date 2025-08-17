import React from "react";
import { Link, Outlet } from "react-router";

const AdminLayout: React.FC = () => {
    return (
        <div className="min-h-screen flex bg-gray-50">
            <aside className="w-64 bg-white border-r">
                <div className="p-6 border-b">
                    <h2 className="text-lg font-bold text-gray-800">Admin</h2>
                    <p className="text-sm text-gray-500">TechBazar control</p>
                </div>

                <nav className="p-4">
                    <ul className="space-y-2">
                        <li>
                            <Link to="/admin" className="block px-3 py-2 rounded hover:bg-gray-100">
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/products" className="block px-3 py-2 rounded hover:bg-gray-100">
                                Product Management
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/orders" className="block px-3 py-2 rounded hover:bg-gray-100">
                                Order Management
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/users" className="block px-3 py-2 rounded hover:bg-gray-100">
                                User Management
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/analytics" className="block px-3 py-2 rounded hover:bg-gray-100">
                                Analytics (placeholder)
                            </Link>
                        </li>
                    </ul>
                </nav>
            </aside>

            <main className="flex-1 p-6">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;