import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { productService } from "../services/productService";
import { useCartStore } from "../store/cartStore";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router";
import type { Product } from "../types/product";
import ImageGallery from "../components/ImageGallery";

const ProductDetailPage: React.FC = () => {
    const { id } = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    // const [quantity, setQuantity] = useState(1);
    const { addToCart, loading: cartLoading } = useCartStore();
    const { isAuthenticated } = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        productService
            .getProductById(id!)
            .then(setProduct)
            .catch((e) => setError(e.message || "Failed to load product"))
            .finally(() => setLoading(false));
    }, [id]);

    const handleAddToCart = async () => {
        if (!isAuthenticated) {
            navigate("/login");
            return;
        }
        if (!product) return;
        // Backend expects { product, quantity }, but CartItem type expects productId.
        // Use type assertion to bypass TS error for this call.
        await addToCart({
            // @ts-expect-error: backend expects 'product', not 'productId'
            product: product.id,
            quantity: 1,
        });
    };

    if (loading) return <div className="p-8">Loading...</div>;
    if (error || !product) return <div className="p-8 text-red-600">{error || "Product not found"}</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                <div className="flex items-center justify-center">
                    <div
                        className="w-full rounded-lg overflow-hidden relative flex items-center justify-center"
                        style={{ aspectRatio: "1/1", width: "min(80vw, 600px)", height: "min(80vw, 600px)", background: "#222", display: "flex" }}
                    >
                        <ImageGallery images={product.images && product.images.length > 0 ? product.images : (product.image ? [product.image] : [])} />
                    </div>
                </div>
                <div className="flex flex-col items-start">
                    <h1 className="text-4xl font-bold mb-2 text-white">{product.name}</h1>
                    <div className="mb-2">
                        <span className="text-2xl font-bold text-white">₹{product.price}</span>
                    </div>
                    <p className="text-gray-200 mb-4">{product.description}</p>
                    {/*
                    <div className="mb-2 text-gray-300">
                        <span className="font-semibold">Category:</span>{" "}
                        {typeof product.category === "object"
                            ? (product.category as { name: string }).name
                            : product.category}
                    </div>
                    <div className="mb-2 text-gray-300">
                        <span className="font-semibold">Stock:</span> {product.stock}
                    </div>
                    <div className="flex items-center gap-2 my-4">
                        <label htmlFor="qty" className="font-semibold text-gray-300">
                            Quantity:
                        </label>
                        <input
                            id="qty"
                            type="number"
                            min={1}
                            max={product.stock}
                            value={quantity}
                            onChange={(e) => setQuantity(Math.max(1, Math.min(product.stock, Number(e.target.value))))}
                            className="w-16 border rounded px-2 py-1 bg-gray-900 text-white border-gray-600"
                        />
                    </div>
                    */}
                    <button
                        className="px-7 py-2 bg-purple-700 text-white rounded font-semibold hover:bg-purple-800 disabled:opacity-60 transition-colors"
                        disabled={cartLoading || product.stock === 0}
                        onClick={handleAddToCart}
                    >
                        {product.stock === 0 ? "Out of Stock" : cartLoading ? "Adding..." : "Add to Cart"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;