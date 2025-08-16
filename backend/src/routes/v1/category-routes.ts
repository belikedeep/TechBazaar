// Category API Routes

import { Router } from "express";
import { getAllCategoriesHandler } from "../../services/category/category-handlers";

const router = Router();

// GET /api/categories - Get all categories
router.get("/", getAllCategoriesHandler);

export default router;
