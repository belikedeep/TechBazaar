
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AdminLayout from "./pages/AdminLayout";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import ProductManagementPage from "./pages/ProductManagementPage";
import ProductFormPage from "./pages/ProductFormPage";
import OrderManagementPage from "./pages/OrderManagementPage";
import UserManagementPage from "./pages/UserManagementPage";
import { useAuthStore } from "./store/authStore";
import type { ReactNode } from "react";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import Navbar from "./components/Navbar";
import CheckoutPage from "./pages/CheckoutPage";
import UserDashboardPage from "./pages/UserDashboardPage";

const PublicRoute = ({ children }: { children: ReactNode }) => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  return isAuthenticated ? <Navigate to="/" replace /> : <>{children}</>;
};

const AdminRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, user, loading } = useAuthStore();
  if (loading) return null;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!user || user.role !== "admin") return <Navigate to="/" replace />;
  return <>{children}</>;
};

import { useEffect } from "react";
import Footer from "./components/Footer";
import BackgroundBlobs from "./components/BackgroundBlobs";

const App = () => {
  const token = useAuthStore((s) => s.token);
  const setToken = useAuthStore((s) => s.setToken);
  const fetchProfile = useAuthStore((s) => s.fetchProfile);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken && !token) {
      setToken(storedToken);
      fetchProfile();
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-x-hidden">
      {/* Purple blob accent */}
      {/* Modern blurred gradient blobs */}
      <BackgroundBlobs />
      <BrowserRouter>
        <Navbar />
        <div className="relative z-10">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <LoginPage />
                </PublicRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <PublicRoute>
                  <SignupPage />
                </PublicRoute>
              }
            />

            {/* Admin nested routes */}
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminLayout />
                </AdminRoute>
              }
            >
              <Route index element={<AdminDashboardPage />} />
              <Route path="products" element={<ProductManagementPage />} />
              <Route path="products/new" element={<ProductFormPage />} />
              <Route path="products/:id/edit" element={<ProductFormPage />} />
              <Route path="orders" element={<OrderManagementPage />} />
              <Route path="users" element={<UserManagementPage />} />
              <Route path="analytics" element={<div>Analytics (coming soon)</div>} />
            </Route>
            {/* Product detail route */}
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/profile" element={<UserDashboardPage />} />
          </Routes>
        </div>
      </BrowserRouter>
      <Footer />
    </div>
  );
};

export default App