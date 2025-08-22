// Product and Category type definitions

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    images: string[];
    image?: string; // for backward compatibility
    category: string;
    color?: string;
    size?: string;
    stock: number;
}

export interface Category {
    id: string;
    name: string;
    description?: string;
}