// Order type definitions

export interface OrderItem {
    product: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
}

export interface Order {
    id: string;
    user: string;
    items: OrderItem[];
    total: number;
    status: string;
    shippingAddress: string;
    createdAt: string;
    updatedAt: string;
}