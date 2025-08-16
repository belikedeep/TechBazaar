// ProductCarousel: Displays a carousel of products

import React from "react";
import type { Product } from "../types/product";
import ProductCard from "./ProductCard";

type Props = {
    products: Product[];
};

const ProductCarousel: React.FC<Props> = ({ products }) => {
    return (
        <div>
            {/* TODO: Carousel controls */}
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};

export default ProductCarousel;