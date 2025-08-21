// ProductCard: Displays a single product (image shown as a square)

import React from "react";
import { Link } from "react-router";
import type { Product } from "../types/product";

type Props = {
    product: Product;
};


const ProductCard: React.FC<Props> = ({ product }) => {
    return (
        <Link to={`/products/${product.id}`} className="block">
            <div className="flex flex-col items-center w-full h-full group">
                <div className="w-full rounded-lg overflow-hidden mb-2 relative flex items-center justify-center" style={{ aspectRatio: "2/3", minHeight: "280px", maxHeight: "400px", background: "#222" }}>
                    <img
                        src={product.images && product.images.length > 0 ? product.images[0] : (product.image || "")}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                        }}
                    />
                </div>
                <div className="w-full flex flex-col items-start px-1">
                    <h3 className="font-semibold text-base md:text-lg mb-1 truncate text-white">{product.name}</h3>
                    <span className="font-bold text-lg text-white">₹{product.price}</span>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;