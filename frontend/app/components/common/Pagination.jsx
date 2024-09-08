import React from "react";

export default function Pagination({
                                          pageNumber,
                                          setPageNumber,
                                          data,
                                          pageCapacity,
                                      }) {
    const handlePrevious = () => {
        if (pageNumber === 1) {
        } else {
            setPageNumber((pre) => pre - 1);
        }
    };
    const handleNext = () => {
        if (Math.ceil(data.length / pageCapacity) > pageNumber) {
            setPageNumber((pre) => pre + 1);
        }
    };

    return (
        <div className="pagination -buttons">
            <button className="pagination__button -prev " onClick={handlePrevious}>
                <i className="icon icon-chevron-right"></i>
            </button>

            <div className="pagination__count px-10">
                <a
                    onClick={() => setPageNumber(1)}
                    className={pageNumber == 1 ? "-count-is-active" : ""}
                    href="#"
                >
                    1
                </a>
                {data.length > pageCapacity ? (
                    <a
                        onClick={() => setPageNumber(2)}
                        className={pageNumber == 2 ? "-count-is-active" : ""}
                        href="#"
                    >
                        2
                    </a>
                ) : (
                    ""
                )}
                {data.length > pageCapacity * 2 ? (
                    <a
                        onClick={() => setPageNumber(3)}
                        className={pageNumber == 3 ? "-count-is-active" : ""}
                        href="#"
                    >
                        3
                    </a>
                ) : (
                    ""
                )}

                {data.length > pageCapacity * 4 && pageNumber != 4 && <span>...</span>}

                {pageNumber > 3 &&
                    Math.ceil(data.length / pageCapacity) != pageNumber && (
                        <a href="#" className="-count-is-active">
                            {pageNumber}
                        </a>
                    )}
                {data.length > pageCapacity * 4 &&
                    pageNumber < Math.ceil(data.length / pageCapacity) - 1 &&
                    pageNumber > 3 && <span className="">...</span>}
                {data.length > pageCapacity * 3 + 1 ? (
                    <a
                        className={
                            pageNumber == Math.ceil(data.length / pageCapacity)
                                ? "-count-is-active"
                                : ""
                        }
                        onClick={() => setPageNumber(Math.ceil(data.length / pageCapacity))}
                    >
                        {Math.ceil(data.length / pageCapacity)}
                    </a>
                ) : (
                    ""
                )}
            </div>

            <button onClick={handleNext} className="pagination__button -next">
                <i className="icon icon-chevron-left"></i>
            </button>
        </div>
    );
}
