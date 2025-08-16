// Product Management API Routes

import { Router } from "express";
import { authenticateJWT, requireRole } from "../../middleware/authMiddleware";
import {
    getAllProductsHandler,
    getProductByIdHandler,
    createProductHandler,
    updateProductHandler,
    deleteProductHandler,
    searchProductsHandler,
    filterProductsHandler
} from "../../services/product/product-handlers";

const router = Router();

// GET /api/products - Get all products with pagination
router.get("/", getAllProductsHandler);

// GET /api/products/:id - Get single product details
router.get("/:id", getProductByIdHandler);

// POST /api/products - Create product (Admin only)
router.post("/", authenticateJWT, requireRole("admin"), createProductHandler);

// PUT /api/products/:id - Update product (Admin only)
router.put("/:id", authenticateJWT, requireRole("admin"), updateProductHandler);

// DELETE /api/products/:id - Delete product (Admin only)
router.delete("/:id", authenticateJWT, requireRole("admin"), deleteProductHandler);

// GET /api/products/search - Search products
router.get("/search", searchProductsHandler);

// GET /api/products/filter - Filter by category/price
router.get("/filter", filterProductsHandler);

export default router;
