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