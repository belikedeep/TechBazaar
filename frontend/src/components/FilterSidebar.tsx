// FilterSidebar: Filtering options for products

import React, { useState } from "react";
import type { Category } from "../types/product";
import FormCheckbox from "./FormCheckbox";

import type { Color, Size } from "../services/productService";

type Props = {
    categories: Category[];
    colors: Color[];
    sizes: Size[];
    onFilter: (filters: Record<string, unknown>) => void;
};

const FilterSidebar: React.FC<Props> = ({ categories, colors, sizes, onFilter }) => {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedColors, setSelectedColors] = useState<string[]>([]);
    const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

    // Expose a method to clear selection from parent via window event
    React.useEffect(() => {
        const handler = () => {
            setSelectedCategories([]);
            setSelectedColors([]);
            setSelectedSizes([]);
            onFilter({ category: [], color: [], size: [] });
        };
        window.addEventListener("clear-categories", handler);
        return () => window.removeEventListener("clear-categories", handler);
    }, [onFilter]);

    const handleCheck = (
        type: "category" | "color" | "size",
        id: string,
        checked: boolean
    ) => {
        let updated: string[];
        let setter: React.Dispatch<React.SetStateAction<string[]>>;
        let key: string;
        if (type === "category") {
            updated = checked ? [...selectedCategories, id] : selectedCategories.filter(i => i !== id);
            setter = setSelectedCategories;
            key = "category";
        } else if (type === "color") {
            updated = checked ? [...selectedColors, id] : selectedColors.filter(i => i !== id);
            setter = setSelectedColors;
            key = "color";
        } else {
            updated = checked ? [...selectedSizes, id] : selectedSizes.filter(i => i !== id);
            setter = setSelectedSizes;
            key = "size";
        }
        setter(updated);
        onFilter({
            category: type === "category" ? updated : selectedCategories,
            color: type === "color" ? updated : selectedColors,
            size: type === "size" ? updated : selectedSizes,
        });
    };

    return (
        <aside>
            <h3 className="font-semibold mb-2 text-white">Categories</h3>
            <ul>
                {categories.map((cat) => (
                    <li key={cat.id} className="mb-1">
                        <FormCheckbox
                            label={<span style={{ color: "white" }}>{cat.name}</span>}
                            checked={selectedCategories.includes(cat.id)}
                            onChange={checked => handleCheck("category", cat.id, checked)}
                        />
                    </li>
                ))}
            </ul>
            <h3 className="font-semibold mt-4 mb-2 text-white">Colors</h3>
            <ul>
                {colors.map((color) => (
                    <li key={color.id} className="mb-1">
                        <FormCheckbox
                            label={<span style={{ color: "white" }}>{color.name}</span>}
                            checked={selectedColors.includes(color.name)}
                            onChange={checked => handleCheck("color", color.name, checked)}
                        />
                    </li>
                ))}
            </ul>
            <h3 className="font-semibold mt-4 mb-2 text-white">Sizes</h3>
            <ul>
                {sizes.map((size) => (
                    <li key={size.id} className="mb-1">
                        <FormCheckbox
                            label={<span style={{ color: "white" }}>{size.name}</span>}
                            checked={selectedSizes.includes(size.name)}
                            onChange={checked => handleCheck("size", size.name, checked)}
                        />
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default FilterSidebar;