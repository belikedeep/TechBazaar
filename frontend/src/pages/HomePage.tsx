// HomePage: Hero, Featured Products, Category Showcase, Recently Added Products

import React from "react";

const HomePage: React.FC = () => {
    return (
        <div>
            <section>
                <h1>Welcome to TechBazaar</h1>
                <p>Discover the best tech products!</p>
            </section>
            <section>
                <h2>Featured Products</h2>
                {/* TODO: Featured products grid */}
            </section>
            <section>
                <h2>Categories</h2>
                {/* TODO: Category showcase */}
            </section>
            <section>
                <h2>Recently Added</h2>
                {/* TODO: Recently added products */}
            </section>
        </div>
    );
};

export default HomePage;