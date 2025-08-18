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
            <div className="bg-white rounded-xl shadow-md p-4 flex flex-col w-full h-full border border-gray-100 hover:shadow-xl hover:border-blue-400 transition-all duration-200 group">
                <div
                    className="w-full rounded-lg overflow-hidden mb-4 bg-gray-50 relative aspect-square flex items-center justify-center"
                >
                    <img
                        src={product.image || ""}
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

                <div className="flex-1 flex flex-col">
                    <h3 className="font-semibold text-base md:text-lg mb-1 truncate">{product.name}</h3>
                    <p className="text-xs md:text-sm text-gray-500 mb-2 line-clamp-2">{product.description}</p>
                    <div className="mt-auto flex items-center justify-between">
                        <span className="font-bold text-blue-600 text-lg">₹{product.price}</span>
                        <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full ml-2">View</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;