import { Express } from "express";
import authRoutes from "./v1/auth";

export function registerRoutes(app: Express) {
    app.use("/api/v1/auth", authRoutes);
    // Add other v1 routes here
}