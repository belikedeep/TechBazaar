import mongoose, { Document, Schema } from "mongoose";

export interface ICategory extends Document {
    name: string;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
}

const CategorySchema: Schema = new Schema<ICategory>({
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, trim: true }
}, { timestamps: true });

const Category = mongoose.model<ICategory>('Category', CategorySchema);

export default Category;