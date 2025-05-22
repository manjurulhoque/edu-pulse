"use client";

import { useState } from "react";
import { Container, Row } from "react-bootstrap";
import { Grid } from "react-loader-spinner";
import CourseCard from "../courses/CourseCard";
import Pagination from "@/app/components/common/Pagination";
import { useGetWishlistQuery } from "@/app/store/reducers/wishlist/api";

const Wishlist = () => {
    const [search, setSearch] = useState("");
    const [pageNumber, setPageNumber] = useState(1);

    const {
        data,
        isLoading: isLoadingCourses,
        error: errorCourses,
    } = useGetWishlistQuery(undefined, {
        skip: !pageNumber,
    });
    const courses = data?.data;

    return (
        <div className="dashboard__main">
            <div className="dashboard__content bg-light-4">
                <div className="row pb-50 mb-10">
                    <div className="col-auto">
                        <h1 className="text-30 lh-12 fw-700">Wishlist</h1>
                        <div className="mt-10">Here you can see all the courses you have added to your wishlist.</div>
                    </div>
                </div>

                <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
                    <div>
                        <input
                            type="text"
                            className="form-control d-inline-block w-auto"
                            placeholder="Search my courses"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            style={{ minWidth: 200, marginRight: 8 }}
                        />
                        <button className="btn btn-primary">
                            <i className="icon icon-search" />
                        </button>
                    </div>
                </div>

                <div className="row y-gap-30">
                    <Container>
                        <div
                            style={{
                                display: isLoadingCourses ? "flex" : "none",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "100vh",
                            }}
                        >
                            <Grid
                                visible={isLoadingCourses}
                                height="200"
                                width="200"
                                color="#4fa94d"
                                ariaLabel="grid-loading"
                                radius="12.5"
                                wrapperStyle={{}}
                                wrapperClass="grid-wrapper"
                            />
                        </div>

                        {errorCourses && (
                            <div className="text-center">
                                <h4>Error loading courses</h4>
                            </div>
                        )}

                        {!isLoadingCourses && courses && courses.length === 0 && (
                            <div className="text-center">
                                <h4>You haven't enrolled in any courses yet.</h4>
                            </div>
                        )}

                        {!isLoadingCourses && (
                            <>
                                <Row className="g-4">
                                    {courses?.map((course) => (
                                        <CourseCard key={course.id} course={course} />
                                    ))}
                                </Row>

                                <div className="row justify-center pt-90 lg:pt-50">
                                    <div className="col-auto">
                                        <Pagination
                                            pageNumber={pageNumber ?? 1}
                                            setPageNumber={setPageNumber}
                                            data={data as any}
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

export default Wishlist;
