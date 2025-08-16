// ProductCard: Displays a single product

import React from "react";
import type { Product } from "../types/product";

type Props = {
    product: Product;
};

const ProductCard: React.FC<Props> = ({ product }) => {
    return (
        <div>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <span>₹{product.price}</span>
            {/* TODO: Add to cart button */}
        </div>
    );
};

export default ProductCard;