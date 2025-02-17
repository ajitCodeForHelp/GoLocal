import React, { useState } from 'react';
import { GrNext, GrPrevious } from "react-icons/gr";

const Pagination = ({ totalPages }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const createPagination = () => {
        let liTags = [];
        let beforePage = currentPage - 1;
        let afterPage = currentPage + 1;

        // Previous button
        if (currentPage > 1) {
            liTags.push(
                <li
                    className="btn prev"
                    key="prev"
                    onClick={() => setCurrentPage(currentPage - 1)}
                >
                    <span>
                        <GrPrevious /> Prev
                    </span>
                </li>
            );
        }

        // Show first page and starting dots if needed
        if (currentPage > 2) {
            liTags.push(
                <li
                    className="first numb"
                    key="first"
                    onClick={() => setCurrentPage(1)}
                >
                    <span>1</span>
                </li>
            );
            if (currentPage > 3) {
                liTags.push(
                    <li className="dots" key="start-dots">
                        <span>...</span>
                    </li>
                );
            }
        }

        // Adjust beforePage and afterPage depending on where we are in the list
        if (currentPage === totalPages) {
            beforePage = currentPage - 3;
        } else if (currentPage === totalPages - 1) {
            beforePage = currentPage - 2;
        }
        if (currentPage === 1) {
            afterPage = currentPage + 3;
        } else if (currentPage === 2) {
            afterPage = currentPage + 2;
        }

        // Ensure the page numbers stay within bounds
        beforePage = Math.max(beforePage, 1);
        afterPage = Math.min(afterPage, totalPages);

        // Generate page number buttons
        for (let i = beforePage; i <= afterPage; i++) {
            liTags.push(
                <li
                    className={`numb ${currentPage === i ? 'active' : ''}`}
                    key={i}
                    onClick={() => setCurrentPage(i)}
                >
                    <span>{i}</span>
                </li>
            );
        }

        // Show ending dots and last page if needed
        if (currentPage < totalPages - 1) {
            if (currentPage < totalPages - 2) {
                liTags.push(
                    <li className="dots" key="end-dots">
                        <span>...</span>
                    </li>
                );
            }
            liTags.push(
                <li
                    className="last numb"
                    key="last"
                    onClick={() => setCurrentPage(totalPages)}
                >
                    <span>{totalPages}</span>
                </li>
            );
        }

        // Next button
        if (currentPage < totalPages) {
            liTags.push(
                <li
                    className="btn next"
                    key="next"
                    onClick={() => setCurrentPage(currentPage + 1)}
                >
                    <span>
                        Next <GrNext />
                    </span>
                </li>
            );
        }

        return liTags;
    };

    return (
        <div class="pagination mt-3 d-flex justify-content-between align-items-center">
            <div className="d-flex justify-content-start align-items-center gap-3">
                <p className='mb-0'>Showing 1 to 10 of 40 entries</p>
                <div className="d-flex justify-content-start align-items-center gap-3">
                    <input type="number" className='w-25'  />
                    <button className='border border-0 p-1 rounded' role='button'>Go</button>
                </div>
            </div>
            <ul className='mb-0'>{createPagination()}</ul>
        </div>
    )
};

export default Pagination;
