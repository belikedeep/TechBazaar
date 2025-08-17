import { Request, Response } from "express";
import * as userService from "./user-service";

export async function getUserProfileHandler(req: any, res: Response) {
    try {
        const user = await userService.getUserProfile(req.user.id);
        if (!user) return res.status(404).json({ error: "User not found" });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch profile" });
    }
}

export async function updateUserProfileHandler(req: any, res: Response) {
    try {
        const user = await userService.updateUserProfile(req.user.id, req.body);
        if (!user) return res.status(404).json({ error: "User not found" });
        res.json(user);
    } catch (err) {
        res.status(400).json({ error: "Failed to update profile" });
    }
}

export async function getAllUsersHandler(req: Request, res: Response) {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch users" });
    }
}

export async function updateUserRoleHandler(req: Request, res: Response) {
    try {
        const user = await userService.updateUserRole(req.params.id!, req.body.role);
        if (!user) return res.status(404).json({ error: "User not found" });
        res.json(user);
    } catch (err) {
        res.status(400).json({ error: "Failed to update user role" });
    }
}

/**
 * Delete user handler (admin only)
 */
export async function deleteUserHandler(req: Request, res: Response) {
    try {
        const user = await userService.deleteUser(req.params.id!);
        if (!user) return res.status(404).json({ error: "User not found" });
        res.json({ message: "User deleted", user });
    } catch (err) {
        res.status(400).json({ error: "Failed to delete user" });
    }
}