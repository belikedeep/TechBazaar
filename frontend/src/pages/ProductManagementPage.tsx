// ProductManagementPage: Product List, CRUD, Add/Edit, Image Upload, Bulk Ops

import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { productService } from "../services/productService";
import type { Product } from "../types/product";
import Pagination from "../components/Pagination";

const ProductManagementPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [deleting, setDeleting] = useState<Record<string, boolean>>({});

    const fetchProducts = async (p = 1) => {
        setLoading(true);
        setError(null);
        try {
            const res = await productService.getProducts({ page: String(p), limit: "10" });
            setProducts(res.products);
            setPage(res.page);
            setTotalPages(res.totalPages);
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : String(err);
            setError(message || "Failed to load products");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts(page);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    const handleDelete = async (id: string) => {
        if (!id) return;
        const confirmed = window.confirm("Delete this product? This action cannot be undone.");
        if (!confirmed) return;

        setDeleting((s) => ({ ...s, [id]: true }));
        try {
            await productService.deleteProduct(id);
            // Re-fetch current page — if last item removed, backend pagination will adjust
            fetchProducts(page);
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : String(err);
            setError(message || "Failed to delete product");
        } finally {
            setDeleting((s) => ({ ...s, [id]: false }));
        }
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold">Product Management</h1>
                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => fetchProducts(1)}
                        className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200"
                    >
                        Refresh
                    </button>

                    <Link
                        to="/admin/products/new"
                        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Create Product
                    </Link>
                </div>
            </div>

            {loading && <div>Loading products...</div>}
            {error && <div className="text-red-600 mb-2">{error}</div>}

            {!loading && products.length === 0 && <div>No products found.</div>}

            {!loading && products.length > 0 && (
                <div className="overflow-x-auto">
                    <table className="w-full bg-white rounded shadow">
                        <thead>
                            <tr className="text-left border-b">
                                <th className="p-3">Image</th>
                                <th className="p-3">Name</th>
                                <th className="p-3">Price</th>
                                <th className="p-3">Category</th>
                                <th className="p-3">Stock</th>
                                <th className="p-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id} className="border-b">
                                    <td className="p-3">
                                        {product.image ? (
                                            // image may be a URL from backend /uploads/...
                                            // keep image small in list
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-20 h-20 object-cover rounded"
                                            />
                                        ) : (
                                            <div className="w-20 h-20 bg-gray-100 flex items-center justify-center text-sm text-gray-500">
                                                No Image
                                            </div>
                                        )}
                                    </td>
                                    <td className="p-3">{product.name}</td>
                                    <td className="p-3">₹{product.price}</td>
                                    <td className="p-3">{product.category}</td>
                                    <td className="p-3">{product.stock}</td>
                                    <td className="p-3 space-x-2">
                                        <button
                                            onClick={() => fetchProducts(page)}
                                            className="text-sm text-gray-600 hover:underline"
                                        >
                                            Refresh
                                        </button>

                                        <Link
                                            to={`/admin/products/${product.id}/edit`}
                                            className="text-sm px-2 py-1 rounded bg-yellow-600 text-white hover:bg-yellow-700"
                                        >
                                            Edit
                                        </Link>

                                        <button
                                            onClick={() => handleDelete(product.id)}
                                            disabled={!!deleting[product.id]}
                                            className={`text-sm px-2 py-1 rounded ${deleting[product.id]
                                                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                                : "bg-red-600 text-white hover:bg-red-700"
                                                }`}
                                        >
                                            {deleting[product.id] ? "Deleting..." : "Delete"}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="mt-4">
                        <Pagination
                            currentPage={page}
                            totalPages={totalPages}
                            onPageChange={(p) => setPage(p)}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductManagementPage;