import mongoose from 'mongoose';

export async function connectDB(): Promise<void> {
    try {
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log("MongoDB Connected");
    } catch (err) {
        console.log("MongoDb Connection issue");
        throw err;
    }
}