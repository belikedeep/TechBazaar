// User Management API Routes

import { Router } from "express";
import { authenticateJWT, requireRole } from "../../middleware/authMiddleware";
import {
    getUserProfileHandler,
    updateUserProfileHandler,
    getAllUsersHandler,
    updateUserRoleHandler
} from "../../services/user/user-handlers";

const router = Router();

// GET /api/users/profile - Get user profile
router.get("/profile", authenticateJWT, getUserProfileHandler);

// PUT /api/users/profile - Update user profile
router.put("/profile", authenticateJWT, updateUserProfileHandler);

// GET /api/admin/users - Get all users (Admin)
router.get("/admin/users", authenticateJWT, requireRole("admin"), getAllUsersHandler);

// PUT /api/admin/users/:id/role - Update user role (Admin)
router.put("/admin/users/:id/role", authenticateJWT, requireRole("admin"), updateUserRoleHandler);

export default router;