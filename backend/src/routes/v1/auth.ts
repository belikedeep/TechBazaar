import { Router } from "express";
import { login, signup } from "../../services/auth/auth-handlers";
import { authenticateJWT } from "../../middleware/authMiddleware";
const router = Router();

router.post("/signup", signup);
router.post("/login", login);

router.get("/me", authenticateJWT, (req, res) => {
    res.json({ user: (req as any).user });
});

export default router;