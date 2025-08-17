import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { productService } from "../services/productService";
import { useCartStore } from "../store/cartStore";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router";
import type { Product } from "../types/product";

const ProductDetailPage: React.FC = () => {
    const { id } = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [quantity, setQuantity] = useState(1);
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
            quantity,
        });
    };

    if (loading) return <div className="p-8">Loading...</div>;
    if (error || !product) return <div className="p-8 text-red-600">{error || "Product not found"}</div>;

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1 flex items-center justify-center">
                    <img
                        src={product.image || "/placeholder.png"}
                        alt={product.name}
                        className="w-full max-w-xs aspect-square object-cover rounded shadow"
                    />
                </div>
                <div className="flex-1">
                    <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                    <p className="text-gray-600 mb-4">{product.description}</p>
                    <div className="mb-2">
                        <span className="font-semibold">Category:</span>{" "}
                        {typeof product.category === "object"
                            ? (product.category as { name: string }).name
                            : product.category}
                    </div>
                    <div className="mb-2">
                        <span className="font-semibold">Price:</span>{" "}
                        <span className="text-xl font-bold text-blue-700">₹{product.price}</span>
                    </div>
                    <div className="mb-2">
                        <span className="font-semibold">Stock:</span> {product.stock}
                    </div>
                    <div className="flex items-center gap-2 my-4">
                        <label htmlFor="qty" className="font-semibold">
                            Quantity:
                        </label>
                        <input
                            id="qty"
                            type="number"
                            min={1}
                            max={product.stock}
                            value={quantity}
                            onChange={(e) => setQuantity(Math.max(1, Math.min(product.stock, Number(e.target.value))))}
                            className="w-16 border rounded px-2 py-1"
                        />
                    </div>
                    <button
                        className="px-6 py-2 bg-blue-700 text-white rounded font-semibold hover:bg-blue-800 disabled:opacity-60"
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