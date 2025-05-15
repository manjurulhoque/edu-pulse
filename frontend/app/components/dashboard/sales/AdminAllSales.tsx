"use client";

import { useAdminGetSalesQuery } from "@/app/store/reducers/admin/api";
import { useState } from "react";
import { Course } from "@/app/models/course.interface";

const AdminAllSales = () => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const { data: salesData, isLoading } = useAdminGetSalesQuery({
        page,
        page_size: pageSize,
    });

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(price);
    };

    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    return (
        <div className="container py-4">
            <h1 className="h2 mb-4">Sales Overview</h1>

            {isLoading ? (
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <>
                    <div className="table-responsive">
                        <table className="table table-striped table-hover">
                            <thead className="table-light">
                                <tr>
                                    <th>Course</th>
                                    <th>Price</th>
                                    <th>Date</th>
                                    <th>Instructor</th>
                                </tr>
                            </thead>
                            <tbody>
                                {salesData?.results.map((course: Course) => (
                                    <tr key={course.id}>
                                        <td>{course.title}</td>
                                        <td>{formatPrice(course.actual_price)}</td>
                                        <td>{formatDate(course.created_at)}</td>
                                        <td>{course.user?.name || "N/A"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {salesData && salesData.results.length > 0 && (
                        <nav aria-label="Page navigation" className="mt-4">
                            <ul className="pagination justify-content-center">
                                <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                                    <button
                                        className="page-link"
                                        onClick={() => setPage(page - 1)}
                                        disabled={page === 1}
                                    >
                                        Previous
                                    </button>
                                </li>
                                {Array.from({ length: salesData.total_pages }, (_, i) => i + 1).map((pageNum) => (
                                    <li key={pageNum} className={`page-item ${page === pageNum ? "active" : ""}`}>
                                        <button className="page-link" onClick={() => setPage(pageNum)}>
                                            {pageNum}
                                        </button>
                                    </li>
                                ))}
                                <li className={`page-item ${page >= salesData.total_pages ? "disabled" : ""}`}>
                                    <button
                                        className="page-link"
                                        onClick={() => setPage(page + 1)}
                                        disabled={page >= salesData.total_pages}
                                    >
                                        Next
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    )}
                </>
            )}
        </div>
    );
};

export default AdminAllSales;
