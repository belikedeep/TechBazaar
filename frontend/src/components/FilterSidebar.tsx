// FilterSidebar: Filtering options for products

import React from "react";

type Props = {
    categories: string[];
    onFilter: (filters: Record<string, unknown>) => void;
};

const FilterSidebar: React.FC<Props> = ({ categories, onFilter }) => {
    return (
        <aside>
            <h3>Categories</h3>
            <ul>
                {categories.map((cat) => (
                    <li key={cat}>
                        <button onClick={() => onFilter({ category: cat })}>{cat}</button>
                    </li>
                ))}
            </ul>
            {/* TODO: Add more filters (price, etc.) */}
        </aside>
    );
};

export default FilterSidebar;