// Product and Category type definitions

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    stock: number;
}

export interface Category {
    id: string;
    name: string;
    description?: string;
}