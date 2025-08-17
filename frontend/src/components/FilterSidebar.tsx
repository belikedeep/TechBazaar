// FilterSidebar: Filtering options for products

import React from "react";
import type { Category } from "../types/product";

type Props = {
    categories: Category[];
    onFilter: (filters: Record<string, unknown>) => void;
};

const FilterSidebar: React.FC<Props> = ({ categories, onFilter }) => {
    return (
        <aside>
            <h3 className="font-semibold mb-2">Categories</h3>
            <ul>
                {categories.map((cat) => (
                    <li key={cat.id} className="mb-1">
                        {/* pass category id to the filter handler so backend filter works */}
                        <button
                            className="text-sm text-gray-700 hover:underline"
                            onClick={() => onFilter({ category: cat.id })}
                        >
                            {cat.name}
                        </button>
                    </li>
                ))}
            </ul>
            {/* TODO: Add more filters (price, etc.) */}
        </aside>
    );
};

export default FilterSidebar;