import { Request, Response } from "express";
import * as productService from "./product-service";

/**
 * Product handlers - existing CRUD/search/filter
 */
export async function getAllProductsHandler(req: Request, res: Response) {
    try {
        const result = await productService.getAllProducts(req.query);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch products" });
    }
}

export async function getProductByIdHandler(req: Request, res: Response) {
    try {
        const product = await productService.getProductById(req.params.id!);
        if (!product) return res.status(404).json({ error: "Product not found" });
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch product" });
    }
}

export async function createProductHandler(req: Request, res: Response) {
    try {
        const product = await productService.createProduct(req.body);
        res.status(201).json(product);
    } catch (err: any) {
        console.error("createProductHandler error:", err);
        const message = err?.message ?? "Failed to create product";
        const details = err?.errors ? Object.keys(err.errors).map(k => ({ field: k, message: err.errors[k].message })) : undefined;
        res.status(400).json({ error: message, details });
    }
}

export async function updateProductHandler(req: Request, res: Response) {
    try {
        const product = await productService.updateProduct(req.params.id!, req.body);
        if (!product) return res.status(404).json({ error: "Product not found" });
        res.json(product);
    } catch (err) {
        res.status(400).json({ error: "Failed to update product" });
    }
}

export async function deleteProductHandler(req: Request, res: Response) {
    try {
        const product = await productService.deleteProduct(req.params.id!);
        if (!product) return res.status(404).json({ error: "Product not found" });
        res.json({ message: "Product deleted" });
    } catch (err) {
        res.status(400).json({ error: "Failed to delete product" });
    }
}

export async function searchProductsHandler(req: Request, res: Response) {
    try {
        const { q } = req.query;
        if (!q || typeof q !== "string") return res.status(400).json({ error: "Missing search query" });
        const products = await productService.searchProducts(q);
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: "Failed to search products" });
    }
}

export async function filterProductsHandler(req: Request, res: Response) {
    try {
        const products = await productService.filterProducts(req.query);
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: "Failed to filter products" });
    }
}

/**
 * Upload product image handler (expects multipart/form-data with field "image")
 * Stores file via multer and returns accessible URL.
 */
export async function uploadProductImageHandler(req: Request, res: Response) {
    try {
        // multer will place file on req.file
        const file = (req as any).file;
        if (!file) return res.status(400).json({ error: "No file uploaded" });

        // Build a public URL for the uploaded file
        const host = req.get("host");
        const protocol = req.protocol;
        const url = `${protocol}://${host}/uploads/${file.filename}`;

        res.status(201).json({ url, filename: file.filename });
    } catch (err) {
        res.status(500).json({ error: "Failed to upload image" });
    }
}