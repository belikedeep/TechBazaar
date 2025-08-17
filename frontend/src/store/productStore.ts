// Zustand store for product catalog state

import { create } from "zustand";
import type { Product, Category } from "../types/product";
import { productService } from "../services/productService";

type State = {
    products: Product[];
    categories: Category[];
    filters: Record<string, unknown>;
    search: string;
    loading: boolean;
    error: string | null;
};

type Actions = {
    fetchProducts: (params?: Record<string, unknown>) => Promise<void>;
    fetchProductById: (id: string) => Promise<Product | null>;
    searchProducts: (query: string) => Promise<void>;
    filterProducts: (params: Record<string, unknown>) => Promise<void>;
    fetchCategories: () => Promise<void>;
};

export const useProductStore = create<State & Actions>((set) => ({
    products: [],
    categories: [],
    filters: {},
    search: "",
    loading: false,
    error: null,

    fetchProducts: async (params) => {
        set({ loading: true, error: null });
        try {
            const products = await productService.getProducts(params);
            set({ products: products.products, loading: false });
        } catch (err: unknown) {
            if (err && typeof err === "object" && "message" in err) {
                set({ error: (err as { message?: string }).message || "Failed to fetch products", loading: false });
            } else {
                set({ error: "Failed to fetch products", loading: false });
            }
        }
    },

    fetchProductById: async (id) => {
        set({ loading: true, error: null });
        try {
            const product = await productService.getProductById(id);
            set({ loading: false });
            return product;
        } catch (err: unknown) {
            if (err && typeof err === "object" && "message" in err) {
                set({ error: (err as { message?: string }).message || "Failed to fetch product", loading: false });
            } else {
                set({ error: "Failed to fetch product", loading: false });
            }
            return null;
        }
    },

    searchProducts: async (query) => {
        set({ loading: true, error: null, search: query });
        try {
            const products = await productService.searchProducts(query);
            set({ products, loading: false });
        } catch (err: unknown) {
            if (err && typeof err === "object" && "message" in err) {
                set({ error: (err as { message?: string }).message || "Failed to search products", loading: false });
            } else {
                set({ error: "Failed to search products", loading: false });
            }
        }
    },

    filterProducts: async (params) => {
        set({ loading: true, error: null, filters: params });
        try {
            const products = await productService.filterProducts(params);
            set({ products, loading: false });
        } catch (err: unknown) {
            if (err && typeof err === "object" && "message" in err) {
                set({ error: (err as { message?: string }).message || "Failed to filter products", loading: false });
            } else {
                set({ error: "Failed to filter products", loading: false });
            }
        }
    },

    fetchCategories: async () => {
        set({ loading: true, error: null });
        try {
            const categories = await productService.getCategories();
            set({ categories, loading: false });
        } catch (err: unknown) {
            if (err && typeof err === "object" && "message" in err) {
                set({ error: (err as { message?: string }).message || "Failed to fetch categories", loading: false });
            } else {
                set({ error: "Failed to fetch categories", loading: false });
            }
        }
    },
}));