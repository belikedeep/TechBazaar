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
            <div className="bg-white rounded shadow p-3 flex flex-col w-full hover:shadow-lg transition">
                <div
                    className="w-full rounded overflow-hidden mb-3"
                    style={{ paddingTop: "100%", position: "relative" }}
                >
                    <img
                        src={product.image || ""}
                        alt={product.name}
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

                <div>
                    <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                    <div className="font-bold">₹{product.price}</div>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;