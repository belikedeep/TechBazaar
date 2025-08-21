// FilterSidebar: Filtering options for products

import React, { useState } from "react";
import type { Category } from "../types/product";
import FormCheckbox from "./FormCheckbox";

type Props = {
    categories: Category[];
    onFilter: (filters: Record<string, unknown>) => void;
};

const FilterSidebar: React.FC<Props> = ({ categories, onFilter }) => {
    const [selected, setSelected] = useState<string[]>([]);

    // Expose a method to clear selection from parent via window event
    React.useEffect(() => {
        const handler = () => {
            setSelected([]);
            onFilter({ category: [] });
        };
        window.addEventListener("clear-categories", handler);
        return () => window.removeEventListener("clear-categories", handler);
    }, [onFilter]);

    const handleCheck = (catId: string, checked: boolean) => {
        let updated: string[];
        if (checked) {
            updated = [...selected, catId];
        } else {
            updated = selected.filter(id => id !== catId);
        }
        setSelected(updated);
        onFilter({ category: updated.length > 0 ? updated : undefined });
    };

    return (
        <aside>
            <h3 className="font-semibold mb-2 text-white">Categories</h3>
            <ul>
                {categories.map((cat) => (
                    <li key={cat.id} className="mb-1">
                        <FormCheckbox
                            label={<span style={{ color: "white" }}>{cat.name}</span>}
                            checked={selected.includes(cat.id)}
                            onChange={checked => handleCheck(cat.id, checked)}
                        />
                    </li>
                ))}
            </ul>
            {/* TODO: Add more filters (price, etc.) */}
        </aside>
    );
};

export default FilterSidebar;