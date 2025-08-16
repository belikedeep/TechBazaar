// Category API Routes

import { Router } from "express";
import Category from "../../db/schemas/categories";

const router = Router();

// GET /api/categories - Get all categories
router.get("/", async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch categories" });
    }
});

export default router;