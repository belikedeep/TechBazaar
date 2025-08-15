import mongoose, { Document, Schema } from "mongoose";

export interface ICartItem {
    product: mongoose.Schema.Types.ObjectId;
    quantity: number;
}

export interface ICart extends Document {
    user: mongoose.Schema.Types.ObjectId;
    items: ICartItem[];
    createdAt: Date;
    updatedAt: Date;
}

const CartItemSchema: Schema = new Schema<ICartItem>({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, min: 1 }
}, { _id: false });

const CartSchema: Schema = new Schema<ICart>({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    items: { type: [CartItemSchema], default: [] }
}, { timestamps: true });

const Cart = mongoose.model<ICart>('Cart', CartSchema);

export default Cart;