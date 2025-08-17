// Category API Routes

import { Router } from "express";
import { authenticateJWT, requireRole } from "../../middleware/authMiddleware";
import {
    getAllCategoriesHandler,
    createCategoryHandler
} from "../../services/category/category-handlers";

const router = Router();

// GET /api/categories - Get all categories
router.get("/", getAllCategoriesHandler);

// POST /api/categories - Create category (Admin only)
router.post("/", authenticateJWT, requireRole("admin"), createCategoryHandler);

export default router;
