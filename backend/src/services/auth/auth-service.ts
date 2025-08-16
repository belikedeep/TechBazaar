import User, { IUser } from "../../db/schemas/users";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "changeme";

interface SignupInput {
    name: string;
    email: string;
    password: string;
    role?: string;
}

interface LoginInput {
    email: string;
    password: string;
}

export async function signup({ name, email, password, role }: SignupInput) {
    const existing = await User.findOne({ email });
    if (existing) throw new Error("Email already in use");
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed, role });
    const { password: _, ...userObj } = user.toObject();
    return userObj;
}

export async function login({ email, password }: LoginInput) {
    const user = await User.findOne({ email });
    if (!user) throw new Error("Invalid credentials");
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error("Invalid credentials");
    const token = jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: "7d" }
    );
    const { password: _, ...userObj } = user.toObject();
    return { token, user: userObj };
}