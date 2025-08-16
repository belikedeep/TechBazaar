// Pagination: Controls for paginated lists

import React from "react";

type Props = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

const Pagination: React.FC<Props> = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <nav>
            <button disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
                Prev
            </button>
            <span>
                Page {currentPage} of {totalPages}
            </span>
            <button disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>
                Next
            </button>
        </nav>
    );
};

export default Pagination;