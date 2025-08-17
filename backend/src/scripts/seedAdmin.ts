import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { connectDB } from '../db/dbConnect';
import User from '../db/schemas/users';

async function seedAdmin() {
    await connectDB();

    const email = process.env.SEED_ADMIN_EMAIL || 'admin@techbazar.test';
    const password = process.env.SEED_ADMIN_PASSWORD || 'Admin123!';
    const name = process.env.SEED_ADMIN_NAME || 'Demo Admin';
    const role = 'admin';

    const existing = await User.findOne({ email });
    const hashed = await bcrypt.hash(password, 10);

    if (existing) {
        existing.name = name;
        existing.password = hashed;
        existing.role = role;
        await existing.save();
        console.log('Updated existing admin user:', email);
    } else {
        await User.create({ name, email, password: hashed, role });
        console.log('Created admin user:', email);
    }

    console.log('Admin credentials:');
    console.log('  email:', email);
    console.log('  password:', password);
    process.exit(0);
}

seedAdmin().catch((err) => {
    console.error('Seeding failed:', err);
    process.exit(1);
});