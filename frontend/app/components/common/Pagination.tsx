import React from "react";

interface PaginationProps<T> {
    pageNumber: number;
    setPageNumber: (pageNumber: number) => void;
    data: PaginatedResponse<T>;
}

const Pagination = <T,>({ pageNumber, setPageNumber, data }: PaginationProps<T>) => {
    const { total_pages, next_page, previous_page } = data || {total_pages: 1, next_page: false, previous_page: false};

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

    return (
        <div className="pagination -buttons">
            <button className="pagination__button -prev" onClick={handlePrevious} disabled={!previous_page}>
                <i className="icon icon-chevron-left"></i>
            </button>

            <div className="pagination__count px-10">
                <a
                    onClick={() => setPageNumber(1)}
                    className={pageNumber === 1 ? "-count-is-active" : ""}
                    href="#"
                >
                    1
                </a>
                {pageNumber > 2 && <span>...</span>}
                {pageNumber > 1 && pageNumber < total_pages && (
                    <a href="#" className="-count-is-active">
                        {pageNumber}
                    </a>
                )}
                {pageNumber < total_pages - 1 && <span>...</span>}
                {total_pages > 1 && (
                    <a
                        onClick={() => setPageNumber(total_pages)}
                        className={pageNumber === total_pages ? "-count-is-active" : ""}
                        href="#"
                    >
                        {total_pages}
                    </a>
                )}
            </div>

            <button onClick={handleNext} className="pagination__button -next" disabled={!next_page}>
                <i className="icon icon-chevron-right"></i>
            </button>
        </div>
    );
};

export default Pagination;
