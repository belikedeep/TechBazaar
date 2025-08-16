import { Express } from "express";
import authRoutes from "./v1/auth-routes";
import productRoutes from "./v1/product-routes";
import categoryRoutes from "./v1/category-routes";

export function registerRoutes(app: Express) {
    app.use("/api/v1/auth", authRoutes);
    app.use("/api/products", productRoutes);
    app.use("/api/categories", categoryRoutes);
    // Add other v1 routes here
}