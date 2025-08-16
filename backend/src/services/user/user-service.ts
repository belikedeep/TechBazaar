import User from "../../db/schemas/users";
import bcrypt from "bcryptjs";

export async function getUserProfile(userId: string) {
    return User.findById(userId).select("-password");
}

export async function updateUserProfile(userId: string, data: any) {
    const update: any = {};
    if (data.name) update.name = data.name;
    if (data.email) update.email = data.email;
    if (data.password) update.password = await bcrypt.hash(data.password, 10);
    return User.findByIdAndUpdate(userId, { $set: update }, { new: true }).select("-password");
}

export async function getAllUsers() {
    return User.find().select("-password");
}

export async function updateUserRole(userId: string, role: string) {
    if (!["customer", "admin"].includes(role)) throw new Error("Invalid role");
    return User.findByIdAndUpdate(userId, { role }, { new: true }).select("-password");
}