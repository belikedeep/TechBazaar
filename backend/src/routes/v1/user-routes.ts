// User Management API Routes

import { Router } from "express";
import User from "../../db/schemas/users";
import { authenticateJWT, requireRole } from "../../middleware/authMiddleware";
import bcrypt from "bcryptjs";

const router = Router();

// GET /api/users/profile - Get user profile
router.get("/profile", authenticateJWT, async (req: any, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) return res.status(404).json({ error: "User not found" });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch profile" });
    }
});

// PUT /api/users/profile - Update user profile
router.put("/profile", authenticateJWT, async (req: any, res) => {
    try {
        const { name, email, password } = req.body;
        const update: any = {};
        if (name) update.name = name;
        if (email) update.email = email;
        if (password) update.password = await bcrypt.hash(password, 10);

        const user = await User.findByIdAndUpdate(
            req.user.id,
            { $set: update },
            { new: true }
        ).select("-password");
        if (!user) return res.status(404).json({ error: "User not found" });
        res.json(user);
    } catch (err) {
        res.status(400).json({ error: "Failed to update profile" });
    }
});

// GET /api/admin/users - Get all users (Admin)
router.get("/admin/users", authenticateJWT, requireRole("admin"), async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch users" });
    }
});

// PUT /api/admin/users/:id/role - Update user role (Admin)
router.put("/admin/users/:id/role", authenticateJWT, requireRole("admin"), async (req, res) => {
    try {
        const { role } = req.body;
        if (!["customer", "admin"].includes(role)) {
            return res.status(400).json({ error: "Invalid role" });
        }
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { role },
            { new: true }
        ).select("-password");
        if (!user) return res.status(404).json({ error: "User not found" });
        res.json(user);
    } catch (err) {
        res.status(400).json({ error: "Failed to update user role" });
    }
});

export default router;