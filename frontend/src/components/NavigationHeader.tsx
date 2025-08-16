// NavigationHeader: Site navigation with cart counter

import React from "react";

type Props = {
    cartCount: number;
};

const NavigationHeader: React.FC<Props> = ({ cartCount }) => {
    return (
        <header>
            <nav>
                <a href="/">TechBazaar</a>
                {/* TODO: Add navigation links */}
                <span>Cart: {cartCount}</span>
            </nav>
        </header>
    );
};

export default NavigationHeader;