// Product Management API Routes

import { Router } from "express";
import { authenticateJWT, requireRole } from "../../middleware/authMiddleware";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import {
    getAllProductsHandler,
    getProductByIdHandler,
    createProductHandler,
    updateProductHandler,
    deleteProductHandler,
    searchProductsHandler,
    filterProductsHandler,
    uploadProductImageHandler
} from "../../services/product/product-handlers";
import "../../lib/cloudinary";

const router = Router();

const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => ({
        folder: "products",
        allowed_formats: ["jpg", "jpeg", "png", "webp"],
        transformation: [{ width: 600, height: 600, crop: "limit" }]
    })
});
const upload = multer({ storage });

import Color from "../../db/schemas/colors";
import Size from "../../db/schemas/sizes";

// Color and Size endpoints
// GET /api/products/colors - List all colors
router.get("/colors", async (req, res) => {
    try {
        const colors = await Color.find().sort({ name: 1 });
        res.json(colors.map(c => ({
            _id: c._id,
            name: c.name,
            createdAt: c.createdAt,
            __v: c.__v
        })));
    } catch (e) {
        console.error("GET /colors error:", e);
        res.status(500).json({ error: "Failed to fetch color" });
    }
});

// GET /api/products/sizes - List all sizes
router.get("/sizes", async (req, res) => {
    try {
        const sizes = await Size.find().sort({ name: 1 });
        res.json(sizes.map(s => ({
            _id: s._id,
            name: s.name,
            createdAt: s.createdAt,
            __v: s.__v
        })));
    } catch (e) {
        console.error("GET /sizes error:", e);
        res.status(500).json({ error: "Failed to fetch size" });
    }
});

// POST /api/products/colors - Add a new color
router.post("/colors", authenticateJWT, requireRole("admin"), async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) return res.status(400).json({ error: "Name required" });
        const color = await Color.create({ name });
        return res.json({ id: color._id, name: color.name });
    } catch (e) {
        return res.status(400).json({ error: "Color already exists" });
    }
});

// POST /api/products/sizes - Add a new size
router.post("/sizes", authenticateJWT, requireRole("admin"), async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) return res.status(400).json({ error: "Name required" });
        const size = await Size.create({ name });
        return res.json({ id: size._id, name: size.name });
    } catch (e) {
        return res.status(400).json({ error: "Size already exists" });
    }
});

// GET /api/products - Get all products with pagination
router.get("/", getAllProductsHandler);

// GET /api/products/search - Search products
router.get("/search", searchProductsHandler);

// GET /api/products/filter - Filter by category/price
router.get("/filter", filterProductsHandler);

// GET /api/products/:id - Get single product details
router.get("/:id", getProductByIdHandler);

// POST /api/products - Create product (Admin only)
router.post("/", authenticateJWT, requireRole("admin"), createProductHandler);

// PUT /api/products/:id - Update product (Admin only)
router.put("/:id", authenticateJWT, requireRole("admin"), updateProductHandler);

// DELETE /api/products/:id - Delete product (Admin only)
router.delete("/:id", authenticateJWT, requireRole("admin"), deleteProductHandler);

// POST /api/products/upload - Upload product image (Admin only)
router.post("/upload", authenticateJWT, requireRole("admin"), upload.single("image"), uploadProductImageHandler);

export default router;
