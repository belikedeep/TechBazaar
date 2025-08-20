// SearchBar: Input with suggestions/autocomplete

import React from "react";

type Props = {
    onSearch: (query: string) => void;
};

const SearchBar: React.FC<Props> = ({ onSearch }) => {
    return (
        <div>
            <input
                type="text"
                placeholder="Search products..."
                onChange={(e) => onSearch(e.target.value)}
                className="text-white bg-transparent placeholder-white border border-gray-400 px-3 py-2 rounded"
            />
            {/* TODO: Suggestions/autocomplete */}
        </div>
    );
};

export default SearchBar;