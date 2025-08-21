import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { productService } from "../services/productService";
import type { Product, Category } from "../types/product";

/**
 * Product create / edit form used by admin
 * Routes:
 * - /admin/products/new
 * - /admin/products/:id/edit
 */
const ProductFormPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState<number>(0);
    const [images, setImages] = useState<string[]>([]);
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState<number>(0);

    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        // load categories
        productService
            .getCategories()
            .then((c: Category[]) => setCategories(c))
            .catch((e: unknown) => {
                console.error(e);
            });

        if (id) {
            setLoading(true);
            productService
                .getProductById(id)
                .then((p: Product) => {
                    setName(p.name);
                    setDescription(p.description);
                    setPrice(p.price);
                    setImages(p.images ?? (p.image ? [p.image] : []));
                    setCategory(p.category);
                    setStock(p.stock);
                })
                .catch((e: unknown) => setError(e instanceof Error ? e.message : String(e)))
                .finally(() => setLoading(false));
        }
    }, [id]);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;
        setUploading(true);
        setError(null);
        try {
            const uploaded: string[] = [];
            for (let i = 0; i < files.length; i++) {
                const res = await productService.uploadProductImage(files[i]);
                uploaded.push(res.url);
            }
            setImages((prev) => [...prev, ...uploaded]);
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : String(err);
            setError(msg || "Failed to upload image");
        } finally {
            setUploading(false);
        }
    };

    const handleCreateCategoryInline = async () => {
        const name = window.prompt("New category name");
        if (!name) return;
        try {
            const cat = await productService.createCategory({ name });
            setCategories((s) => [...s, cat]);
            setCategory((cat as Category).id);
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : String(err);
            setError(msg || "Failed to create category");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setError(null);
        try {
            const payload = {
                name,
                description,
                price,
                images,
                category,
                stock,
            };
            if (id) {
                await productService.updateProduct(id, payload);
            } else {
                await productService.createProduct(payload);
            }
            navigate("/admin/products");
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : String(err);
            setError(msg || "Failed to save product");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold">{id ? "Edit Product" : "New Product"}</h1>
            </div>

            {loading && <div>Loading product...</div>}
            {error && <div className="text-red-600 mb-2">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
                <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border p-2 rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full border p-2 rounded"
                        rows={4}
                        required
                    />
                </div>

                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Price</label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(Number(e.target.value))}
                            className="w-full border p-2 rounded"
                            min={0}
                            step="0.01"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Stock</label>
                        <input
                            type="number"
                            value={stock}
                            onChange={(e) => setStock(Number(e.target.value))}
                            className="w-full border p-2 rounded"
                            min={0}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Category</label>
                        <div className="flex items-center space-x-2">
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="flex-1 border p-2 rounded"
                                required
                            >
                                <option value="">Select category</option>
                                {categories.map((c) => (
                                    <option key={c.id} value={c.id}>
                                        {c.name}
                                    </option>
                                ))}
                            </select>
                            <button
                                type="button"
                                onClick={handleCreateCategoryInline}
                                className="px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                                title="Create category"
                            >
                                +
                            </button>
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Images</label>
                    <div className="flex items-center space-x-4">
                        <input type="file" accept="image/*" multiple onChange={handleFileChange} />
                        {uploading && <span className="text-sm text-gray-500">Uploading...</span>}
                        {images.length > 0 && (
                            <div className="flex space-x-2">
                                {images.map((img, idx) => (
                                    <div key={idx} className="relative">
                                        <img src={img} alt={`preview ${idx + 1}`} className="w-16 h-16 object-cover rounded" />
                                        <button
                                            type="button"
                                            className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                                            onClick={() => setImages(images.filter((_, i) => i !== idx))}
                                            title="Remove"
                                        >×</button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    <button
                        type="submit"
                        disabled={saving}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-60"
                    >
                        {saving ? "Saving..." : "Save"}
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate("/admin/products")}
                        className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProductFormPage;