// ProductGrid: Displays a grid of ProductCard components

import React from "react";
import type { Product } from "../types/product";
import ProductCard from "./ProductCard";

type Props = {
    products: Product[];
};

const ProductGrid: React.FC<Props> = ({ products }) => {
    return (
        <div>
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};

export default ProductGrid;