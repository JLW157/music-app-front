import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Pagination.css";

interface IPagionationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: IPagionationProps) => {
    const location = useLocation();

    const calculatePageRange = (currentPageL: number, totalPages: number) => {
        const range = 3;
        let start = Math.max(1, currentPage - range);
        let end = Math.min(totalPages, currentPage + range);

        // Adjust the page range if it exceeds the total page count
        if (end - start + 1 < range * 2) {
            if (start === 1) {
                end = Math.min(end + range * 2 - (end - start + 1), totalPages);
            } else {
                start = Math.max(start - (range * 2 - (end - start + 1)), 1);
            }
        }

        return [start, end];
    };

    const [pageRange, setPageRange] = useState(calculatePageRange(currentPage, totalPages));


    const handlePageClick = (page: number) => {
        onPageChange(page);
    };

    return (
        <div className="pagination">

            <Link className="pagination-item" to="#" onClick={() => handlePageClick(currentPage - 1)}>
                Prev
            </Link>

            {Array.from({ length: totalPages }, (x, i) => {
                i += 1;
                return <Link
                    to="#"
                    key={i}
                    className={i === currentPage ? "pagination-item active" : "pagination-item"}
                    onClick={() => handlePageClick(i)}
                >
                    {i}
                </Link>
            })}

            <Link to="#" className="pagination-item" onClick={() => handlePageClick(currentPage + 1)}>
                Next
            </Link>
        </div>
    );
};

export default Pagination;
