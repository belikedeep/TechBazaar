import mongoose, { Document, Schema } from "mongoose";

export interface ISize extends Document {
    name: string;
    createdAt: Date;
}

const SizeSchema: Schema = new Schema<ISize>({
    name: { type: String, required: true, unique: true, trim: true }
}, { timestamps: true });

const Size = mongoose.model<ISize>("Size", SizeSchema);

export default Size;