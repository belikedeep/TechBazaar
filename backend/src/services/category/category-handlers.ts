import { Request, Response } from "express";
import * as categoryService from "./category-service";

export async function getAllCategoriesHandler(req: Request, res: Response) {
    try {
        const categories = await categoryService.getAllCategories();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch categories" });
    }
}

export async function createCategoryHandler(req: Request, res: Response) {
    try {
        const category = await categoryService.createCategory(req.body);
        res.status(201).json(category);
    } catch (err) {
        res.status(400).json({ error: "Failed to create category" });
    }
}