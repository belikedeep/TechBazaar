import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET environment variable is not set");
}

export interface AuthRequest extends Request {
    user?: any;
}

export function authenticateJWT(req: AuthRequest, res: Response, next: NextFunction) {
    // Support both JWT in Authorization header and session cookie
    let token: string | undefined;

    // 1. Try Authorization header (Bearer)
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
    }

    // 2. Try cookie (e.g. req.cookies.token or req.signedCookies.token)
    if (!token && req.cookies && req.cookies.token) {
        token = req.cookies.token;
    }

    if (!token) {
        return res.status(401).json({ error: "No token provided" });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET as string);
        req.user = decoded;
        return next();
    } catch (err) {
        return res.status(401).json({ error: "Invalid token" });
    }
}

export function requireRole(...roles: string[]) {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        if (
            !req.user ||
            typeof req.user !== "object" ||
            !("role" in req.user) ||
            !roles.includes((req.user as any).role)
        ) {
            return res.status(403).json({ error: "Forbidden: insufficient role" });
        }
        return next();
    };
}