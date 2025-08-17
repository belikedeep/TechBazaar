import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './schemas/users';

export async function connectDB(): Promise<void> {
    try {
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log("MongoDB Connected");

        // In development, ensure a demo admin account exists.
        const env = process.env.NODE_ENV || 'development';
        if (env === 'development') {
            const adminEmail = process.env.SEED_ADMIN_EMAIL || 'admin@techbazar.test';
            const adminPassword = process.env.SEED_ADMIN_PASSWORD || 'Admin123!';
            const adminName = process.env.SEED_ADMIN_NAME || 'Demo Admin';

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
        }
    } catch (err) {
        console.log("MongoDb Connection issue");
        throw err;
    }
}