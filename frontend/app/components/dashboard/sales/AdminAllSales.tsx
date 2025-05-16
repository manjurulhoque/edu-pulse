"use client";

import { useAdminGetSalesQuery } from "@/app/store/reducers/admin/api";
import { useState } from "react";
import Pagination from "@/app/components/common/Pagination";
import { Button, Modal, Table, Container } from "react-bootstrap";
import { Grid } from "react-loader-spinner";
import { Checkout } from "@/app/models/checkout.interface";
const AdminAllSales = () => {
    const [pageNumber, setPageNumber] = useState(1);
    const [showCourseModal, setShowCourseModal] = useState(false);
    const [selectedSale, setSelectedSale] = useState<Checkout | null>(null);
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

    const handleShowCourseDetails = (sale: any) => {
        setSelectedSale(sale);
        setShowCourseModal(true);
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
                                <h4>No sales found.</h4>
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
                                                <td>{sale.created_at}</td>
                                                <td>
                                                    <Button
                                                        variant="primary"
                                                        size="sm"
                                                        onClick={() => handleShowCourseDetails(sale)}
                                                    >
                                                        View Courses
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

            <Modal show={showCourseModal} onHide={() => setShowCourseModal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Course Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedSale && (
                        <>
                            <div className="mb-4">
                                <h5>Customer Information</h5>
                                <p>
                                    <strong>Name:</strong> {selectedSale.full_name}
                                </p>
                                <p>
                                    <strong>Email:</strong> {selectedSale.email}
                                </p>
                                <p>
                                    <strong>Purchase Date:</strong> {selectedSale.created_at}
                                </p>
                            </div>

                            <h5>Purchased Courses</h5>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Course Name</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedSale.items?.map((item: any) => (
                                        <tr key={item.id}>
                                            <td>{item.course.title}</td>
                                            <td>{formatPrice(item.course.actual_price)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowCourseModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AdminAllSales;
