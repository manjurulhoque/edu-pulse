"use client";

import { useAdminGetSalesQuery } from "@/app/store/reducers/admin/api";
import { useState } from "react";
import Pagination from "@/app/components/common/Pagination";
import { Button } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Grid } from "react-loader-spinner";
import { Table } from "react-bootstrap";

const AdminAllSales = () => {
    const [pageNumber, setPageNumber] = useState(1);
    const pageSize = 10;
    const { data: salesData, isLoading } = useAdminGetSalesQuery({
        page: pageNumber,
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

    const sales = salesData?.results;

    return (
        <div className="dashboard__main">
            <div className="dashboard__content bg-light-4">
                <div className="row pb-50 mb-10">
                    <div className="col-auto">
                        <h1 className="text-30 lh-12 fw-700">All Sales</h1>
                        <div className="mt-10">Manage platform sales</div>
                    </div>
                </div>

                <div className="row y-gap-30">
                    <Container>
                        <div
                            style={{
                                display: isLoading ? "flex" : "none",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "100vh",
                            }}
                        >
                            <Grid
                                visible={isLoading}
                                height="60"
                                width="60"
                                color="#4fa94d"
                                ariaLabel="grid-loading"
                                radius="12.5"
                                wrapperStyle={{}}
                                wrapperClass="grid-wrapper"
                            />
                        </div>

                        {!isLoading && sales && sales.length === 0 && (
                            <div className="text-center">
                                <h4>No users found.</h4>
                            </div>
                        )}

                        {!isLoading && (
                            <>
                                <Table striped bordered hover responsive>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Created At</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sales?.map((sale) => (
                                            <tr key={sale.id}>
                                                <td>{sale.id}</td>
                                                <td>{sale.full_name}</td>
                                                <td>{sale.email}</td>
                                                <td>{new Date(sale.created_at).toLocaleDateString()}</td>
                                                <td>
                                                    <Button variant="success" size="sm" className="me-2">
                                                        Details
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>

                                <div className="row justify-center pt-90 lg:pt-50">
                                    <div className="col-auto">
                                        <Pagination
                                            pageNumber={pageNumber}
                                            setPageNumber={setPageNumber}
                                            data={salesData as any}
                                        />
                                    </div>
                                </div>
                            </>
                        )}
                    </Container>
                </div>
            </div>
        </div>
    );
};

export default AdminAllSales;
