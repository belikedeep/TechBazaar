import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './schemas/users';

export async function connectDB(): Promise<void> {
    try {
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log("MongoDB Connected");

        const adminEmail = process.env.SEED_ADMIN_EMAIL;
        const adminPassword = process.env.SEED_ADMIN_PASSWORD;
        const adminName = process.env.SEED_ADMIN_NAME;

        if (!adminEmail || !adminPassword || !adminName) {
            throw new Error("SEED_ADMIN_EMAIL, SEED_ADMIN_PASSWORD, and SEED_ADMIN_NAME must be set in environment variables.");
        }

        try {
            const existing = await User.findOne({ email: adminEmail });
            if (!existing) {
                const hashed = await bcrypt.hash(adminPassword, 10);
                await User.create({ name: adminName, email: adminEmail, password: hashed, role: 'admin' });
                console.log(`Created demo admin user: ${adminEmail}`);
            } else {
                console.log(`Demo admin already exists: ${adminEmail}`);
            }
        } catch (seedErr) {
            console.warn("Failed to ensure demo admin user:", seedErr);
        }
    } catch (err) {
        console.log("MongoDb Connection issue");
        throw err;
    }
}