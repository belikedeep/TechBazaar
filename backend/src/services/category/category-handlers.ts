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