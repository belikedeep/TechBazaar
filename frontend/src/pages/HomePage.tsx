// HomePage: Hero, Featured Products, Category Showcase, Recently Added Products

import React from "react";
import Navbar from "../components/Navbar";

const HomePage: React.FC = () => {
    return (
        <div>
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                <section className="mb-12">
                    <h1 className="text-4xl font-bold text-center mb-4">Welcome to TechBazaar</h1>
                    <p className="text-xl text-center text-gray-600">Discover the best tech products!</p>
                </section>
                <section className="mb-12">
                    <h2 className="text-3xl font-bold mb-6">Featured Products</h2>
                    {/* TODO: Featured products grid */}
                </section>
                <section className="mb-12">
                    <h2 className="text-3xl font-bold mb-6">Categories</h2>
                    {/* TODO: Category showcase */}
                </section>
                <section className="mb-12">
                    <h2 className="text-3xl font-bold mb-6">Recently Added</h2>
                    {/* TODO: Recently added products */}
                </section>
            </div>
        </div>
    );
};

export default HomePage;