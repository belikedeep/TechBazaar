import mongoose, { Document, Schema } from "mongoose";

export interface IProduct extends Document {
    name: string;
    description: string;
    price: number;
    image: string;
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' };
    stock: number;
    createdAt: Date;
}

const ProductSchema: Schema = new Schema<IProduct>({
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    image: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    stock: { type: Number, required: true, min: 0 },
    createdAt: { type: Date, default: Date.now }
})

const Product = mongoose.model<IProduct>('Product', ProductSchema);

export default Product;
