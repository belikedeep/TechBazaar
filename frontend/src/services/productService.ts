// Product API service

import type { Product, Category } from "../types/product";

const API_BASE = "/api";

export const productService = {
    async getProducts(params?: Record<string, unknown>): Promise<Product[]> {
        let url = `${API_BASE}/products`;
        if (params) {
            const query = new URLSearchParams(params as Record<string, string>).toString();
            url += `?${query}`;
        }
        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
    },

    async getProductById(id: string): Promise<Product> {
        const res = await fetch(`${API_BASE}/products/${id}`);
        if (!res.ok) throw new Error("Failed to fetch product");
        return res.json();
    },

    async searchProducts(query: string): Promise<Product[]> {
        const res = await fetch(`${API_BASE}/products/search?q=${encodeURIComponent(query)}`);
        if (!res.ok) throw new Error("Failed to search products");
        return res.json();
    },

    async filterProducts(params: Record<string, unknown>): Promise<Product[]> {
        let url = `${API_BASE}/products/filter`;
        if (params) {
            const query = new URLSearchParams(params as Record<string, string>).toString();
            url += `?${query}`;
        }
        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to filter products");
        return res.json();
    },

    async getCategories(): Promise<Category[]> {
        const res = await fetch(`${API_BASE}/categories`);
        if (!res.ok) throw new Error("Failed to fetch categories");
        return res.json();
    },
};