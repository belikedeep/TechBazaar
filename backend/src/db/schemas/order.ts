import mongoose, { Document, Schema } from "mongoose";

export interface IOrderItem {
    product: mongoose.Schema.Types.ObjectId;
    quantity: number;
    price: number;
}

export interface IOrder extends Document {
    user: mongoose.Schema.Types.ObjectId;
    items: IOrderItem[];
    total: number;
    status: string;
    shippingAddress: string;
    createdAt: Date;
    updatedAt: Date;
}

const OrderItemSchema: Schema = new Schema<IOrderItem>({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true, min: 0 }
}, { _id: false });

const OrderSchema: Schema = new Schema<IOrder>({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: { type: [OrderItemSchema], required: true },
    total: { type: Number, required: true, min: 0 },
    status: { type: String, enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'], default: 'pending' },
    shippingAddress: { type: String, required: true }
}, { timestamps: true });

const Order = mongoose.model<IOrder>('Order', OrderSchema);

export default Order;