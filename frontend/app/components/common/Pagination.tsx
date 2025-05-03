import { PaginatedResponse } from "@/app/models/request.interface";
import React, { useMemo } from "react";

interface PaginationProps<T> {
    pageNumber: number;
    setPageNumber: (pageNumber: number) => void;
    data: PaginatedResponse<T>;
}

const Pagination = <T,>({ pageNumber, setPageNumber, data }: PaginationProps<T>) => {
    const { total_pages, next_page, previous_page } = data || {
        total_pages: 1,
        next_page: false,
        previous_page: false,
    };

    const handlePrevious = () => {
        if (previous_page) {
            setPageNumber(pageNumber - 1);
        }
    };

    const handleNext = () => {
        if (next_page) {
            setPageNumber(pageNumber + 1);
        }
    };

    const pageNumberLinks = useMemo(() => {
        const links = [];
        links.push(
            <a
                key={1}
                onClick={() => pageNumber !== 1 && setPageNumber(1)}
                className={pageNumber === 1 ? "-count-is-active" : ""}
                href="#"
                style={{ pointerEvents: pageNumber === 1 ? "none" : "auto" }}
            >
                1
            </a>
        );

        if (pageNumber > 2) {
            links.push(<span key="ellipsis-start">...</span>);
        }

        if (pageNumber > 1 && pageNumber < total_pages) {
            links.push(
                <a key={pageNumber} href="#" className="-count-is-active" style={{ pointerEvents: "none" }}>
                    {pageNumber}
                </a>
            );
        }

        if (pageNumber < total_pages - 1 && total_pages > 2) {
            links.push(<span key="ellipsis-end">...</span>);
        }

        if (total_pages > 1) {
            links.push(
                <a
                    key={total_pages}
                    onClick={() => pageNumber !== total_pages && setPageNumber(total_pages)}
                    className={pageNumber === total_pages ? "-count-is-active" : ""}
                    href="#"
                    style={{ pointerEvents: pageNumber === total_pages ? "none" : "auto" }}
                >
                    {total_pages}
                </a>
            );
        }
        return links;
    }, [pageNumber, total_pages, setPageNumber]);

    return (
        <div className="pagination -buttons">
            <button className="pagination__button -prev" onClick={handlePrevious} disabled={!previous_page}>
                <i className="icon icon-chevron-left"></i>
            </button>

            <div className="pagination__count px-10">{pageNumberLinks}</div>

            <button onClick={handleNext} className="pagination__button -next" disabled={!next_page}>
                <i className="icon icon-chevron-right"></i>
            </button>
        </div>
    );
};

export default Pagination;
