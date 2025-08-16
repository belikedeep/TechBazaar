// Product Management API Routes

import { Router } from "express";
import Product from "../../db/schemas/products";
import { authenticateJWT, requireRole } from "../../middleware/authMiddleware";
import mongoose from "mongoose";

const router = Router();

// GET /api/products - Get all products with pagination
router.get("/", async (req, res) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;

        const products = await Product.find()
            .skip(skip)
            .limit(limit)
            .populate("category");
        const total = await Product.countDocuments();

        res.json({
            products,
            page,
            totalPages: Math.ceil(total / limit),
            total
        });
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch products" });
    }
});

// GET /api/products/:id - Get single product details
router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate("category");
        if (!product) return res.status(404).json({ error: "Product not found" });
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch product" });
    }
});

// POST /api/products - Create product (Admin only)
router.post(
    "/",
    authenticateJWT,
    requireRole("admin"),
    async (req, res) => {
        try {
            const product = new Product(req.body);
            await product.save();
            res.status(201).json(product);
        } catch (err) {
            res.status(400).json({ error: "Failed to create product" });
        }
    }
);

// PUT /api/products/:id - Update product (Admin only)
router.put(
    "/:id",
    authenticateJWT,
    requireRole("admin"),
    async (req, res) => {
        try {
            const product = await Product.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );
            if (!product) return res.status(404).json({ error: "Product not found" });
            res.json(product);
        } catch (err) {
            res.status(400).json({ error: "Failed to update product" });
        }
    }
);

// DELETE /api/products/:id - Delete product (Admin only)
router.delete(
    "/:id",
    authenticateJWT,
    requireRole("admin"),
    async (req, res) => {
        try {
            const product = await Product.findByIdAndDelete(req.params.id);
            if (!product) return res.status(404).json({ error: "Product not found" });
            res.json({ message: "Product deleted" });
        } catch (err) {
            res.status(400).json({ error: "Failed to delete product" });
        }
    }
);

// GET /api/products/search - Search products
router.get("/search", async (req, res) => {
    try {
        const { q } = req.query;
        if (!q) return res.status(400).json({ error: "Missing search query" });
        const products = await Product.find({
            name: { $regex: q, $options: "i" }
        }).populate("category");
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: "Failed to search products" });
    }
});

// GET /api/products/filter - Filter by category/price
router.get("/filter", async (req, res) => {
    try {
        const { category, minPrice, maxPrice } = req.query;
        const filter: any = {};
        if (category && mongoose.Types.ObjectId.isValid(category as string)) {
            filter.category = category;
        }
        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = Number(minPrice);
            if (maxPrice) filter.price.$lte = Number(maxPrice);
        }
        const products = await Product.find(filter).populate("category");
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: "Failed to filter products" });
    }
});

export default router;