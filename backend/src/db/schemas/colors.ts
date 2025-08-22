import mongoose, { Document, Schema } from "mongoose";

export interface IColor extends Document {
    name: string;
    createdAt: Date;
}

const ColorSchema: Schema = new Schema<IColor>({
    name: { type: String, required: true, unique: true, trim: true }
}, { timestamps: true });

const Color = mongoose.model<IColor>("Color", ColorSchema);

export default Color;