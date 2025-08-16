import { Router } from "express";
import { login, signup, getProfile, updateProfile, logout } from "../../services/auth/auth-handlers";
import { authenticateJWT } from "../../middleware/authMiddleware";
const router = Router();

router.post("/signup", signup);
router.post("/login", login);

router.get("/profile", authenticateJWT, getProfile);
router.put("/profile", authenticateJWT, updateProfile);
router.post("/logout", authenticateJWT, logout);

export default router;