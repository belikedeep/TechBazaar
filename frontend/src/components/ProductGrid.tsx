// ProductGrid: Displays a grid of ProductCard components (3 columns x 5 rows -> up to 15 items)

import React from "react";
import type { Product } from "../types/product";
import ProductCard from "./ProductCard";

type Props = {
    products: Product[];
};

const ProductGrid: React.FC<Props> = ({ products }) => {
    // Limit to 15 items (3 columns x 5 rows)
    const visible = products.slice(0, 15);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {visible.map((product) => (
                <div key={product.id} className="flex flex-col h-full">
                    <ProductCard product={product} />
                </div>
            ))}
        </div>
    );
};

export default ProductGrid;