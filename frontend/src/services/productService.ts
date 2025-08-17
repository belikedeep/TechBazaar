// Product API service

import type { Product, Category } from "../types/product";

// Use explicit backend base to avoid dev proxy issues
const API_BASE = "http://localhost:3000/api";

type PaginatedProducts = {
    products: Product[];
    page: number;
    totalPages: number;
    total: number;
};

function normalizeProduct(p: unknown): Product {
    const obj = p as Record<string, unknown>;
    const id = ((obj.id ?? obj._id) as string) ?? "";
    return {
        id,
        name: (obj.name as string) ?? "",
        description: (obj.description as string) ?? "",
        price: (obj.price as number) ?? 0,
        image: (obj.image as string) ?? "",
        category:
            typeof obj.category === "string"
                ? (obj.category as string)
                : ((obj.category as Record<string, unknown>)?.id ??
                    (obj.category as Record<string, unknown>)?._id ??
                    "") as string,
        stock: (obj.stock as number) ?? 0,
    };
}

export const productService = {
    async getProducts(params?: Record<string, unknown>): Promise<PaginatedProducts> {
        let url = `${API_BASE}/products`;
        if (params) {
            const query = new URLSearchParams(params as Record<string, string>).toString();
            url += `?${query}`;
        }
        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        const products = (data.products || []).map((p: unknown) => normalizeProduct(p));
        return {
            products,
            page: data.page ?? 1,
            totalPages: data.totalPages ?? 1,
            total: data.total ?? products.length,
        };
    },

    async getProductById(id: string): Promise<Product> {
        const res = await fetch(`${API_BASE}/products/${id}`);
        if (!res.ok) throw new Error("Failed to fetch product");
        const data = await res.json();
        return normalizeProduct(data);
    },

    async searchProducts(query: string): Promise<Product[]> {
        const res = await fetch(`${API_BASE}/products/search?q=${encodeURIComponent(query)}`);
        if (!res.ok) throw new Error("Failed to search products");
        const data = await res.json();
        return (data || []).map((p: unknown) => normalizeProduct(p));
    },

    async filterProducts(params: Record<string, unknown>): Promise<Product[]> {
        let url = `${API_BASE}/products/filter`;
        if (params) {
            const query = new URLSearchParams(params as Record<string, string>).toString();
            url += `?${query}`;
        }
        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to filter products");
        const data = await res.json();
        return (data || []).map((p: unknown) => normalizeProduct(p));
    },

    async getCategories(): Promise<Category[]> {
        const res = await fetch(`${API_BASE}/categories`);
        if (!res.ok) throw new Error("Failed to fetch categories");
        const data = await res.json();
        return (data || []).map((c: any) => ({
            id: (c.id ?? c._id) as string,
            name: (c.name as string) ?? "",
            description: (c.description as string) ?? undefined,
        }));
    },

    async createCategory(data: { name: string; description?: string }): Promise<Category> {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_BASE}/categories`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token ?? ""}`,
            },
            body: JSON.stringify(data),
        });
        if (!res.ok) {
            const text = await res.text();
            throw new Error(text || "Failed to create category");
        }
        const json = await res.json();
        return {
            id: (json.id ?? json._id) as string,
            name: (json.name as string) ?? "",
            description: (json.description as string) ?? undefined,
        };
    },

    async uploadProductImage(file: File): Promise<{ url: string; filename: string }> {
        const token = localStorage.getItem("token");
        const fd = new FormData();
        fd.append("image", file);

        const res = await fetch(`${API_BASE}/products/upload`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token ?? ""}`,
            },
            body: fd,
        });
        if (!res.ok) {
            const text = await res.text();
            throw new Error(text || "Failed to upload image");
        }
        return res.json();
    },

    async createProduct(data: {
        name: string;
        description: string;
        price: number;
        image: string;
        category: string;
        stock: number;
    }): Promise<Product> {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_BASE}/products`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token ?? ""}`,
            },
            body: JSON.stringify(data),
        });
        if (!res.ok) {
            const text = await res.text();
            throw new Error(text || "Failed to create product");
        }
        const json = await res.json();
        return normalizeProduct(json);
    },

    async updateProduct(id: string, data: Partial<{
        name: string;
        description: string;
        price: number;
        image: string;
        category: string;
        stock: number;
    }>): Promise<Product> {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_BASE}/products/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token ?? ""}`,
            },
            body: JSON.stringify(data),
        });
        if (!res.ok) {
            const text = await res.text();
            throw new Error(text || "Failed to update product");
        }
        const json = await res.json();
        return normalizeProduct(json);
    },

    async deleteProduct(id: string): Promise<void> {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_BASE}/products/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token ?? ""}`,
            },
        });
        if (!res.ok) {
            const text = await res.text();
            throw new Error(text || "Failed to delete product");
        }
    },
};