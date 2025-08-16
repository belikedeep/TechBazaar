import { Request, Response } from "express";
import * as authService from "./auth-service";

export const signup = async (req: Request, res: Response) => {
    try {
        const { name, email, password, role } = req.body;
        const user = await authService.signup({ name, email, password, role });
        res.status(201).json({ user });
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const { token, user } = await authService.login({ email, password });
        res.status(200).json({ token, user });
    } catch (err: any) {
        res.status(401).json({ error: err.message });
    }
};

export const getProfile = async (req: any, res: Response) => {
    try {
        const user = await authService.getProfile(req.user.id);
        res.status(200).json({ user });
    } catch (err: any) {
        res.status(404).json({ error: err.message });
    }
};

export const updateProfile = async (req: any, res: Response) => {
    try {
        const updated = await authService.updateProfile(req.user.id, req.body);
        res.status(200).json({ user: updated });
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};

export const logout = async (req: Request, res: Response) => {
    // For JWT, logout is handled client-side. This endpoint is a no-op.
    res.status(200).json({ message: "Logged out" });
};