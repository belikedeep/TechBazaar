// Product Management API Routes

import { Router } from "express";
import { authenticateJWT, requireRole } from "../../middleware/authMiddleware";
import multer from "multer";
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

const router = Router();
const upload = multer({ dest: "uploads/" });

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
