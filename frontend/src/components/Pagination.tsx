// Pagination: Controls for paginated lists

import React from "react";

type Props = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

const Pagination: React.FC<Props> = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <nav className="flex items-center justify-center gap-2 mt-6">
            <button
                className="px-3 py-1 rounded-l bg-gray-100 hover:bg-blue-100 text-gray-700 font-medium border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            >
                Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
                <button
                    key={i + 1}
                    className={`px-3 py-1 border border-gray-300 font-medium ${currentPage === i + 1
                            ? "bg-blue-500 text-white"
                            : "bg-white text-gray-700 hover:bg-blue-100"
                        }`}
                    onClick={() => onPageChange(i + 1)}
                    disabled={currentPage === i + 1}
                >
                    {i + 1}
                </button>
            ))}
            <button
                className="px-3 py-1 rounded-r bg-gray-100 hover:bg-blue-100 text-gray-700 font-medium border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
            >
                Next
            </button>
        </nav>
    );
};

export default Pagination;