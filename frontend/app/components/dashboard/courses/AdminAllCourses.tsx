"use client";

import { useAdminGetCoursesQuery } from "@/app/store/reducers/admin/api";
import { Grid } from "react-loader-spinner";
import { Container, Row } from "react-bootstrap";
import AdminCourseCard from "./AdminCourseCard";
import Pagination from "@/app/components/common/Pagination";
import { useState } from "react";

const AdminAllCourses = () => {
    const [pageNumber, setPageNumber] = useState(1);
    const pageSize = 8;
    const { data, isLoading: isCoursesLoading } = useAdminGetCoursesQuery(
        { page: pageNumber, page_size: pageSize }
    );
    let courses = data?.results;

    return (
        <div className="dashboard__main">
            <div className="dashboard__content bg-light-4">
                <div className="row pb-50 mb-10">
                    <div className="col-auto">
                        <h1 className="text-30 lh-12 fw-700">All Courses</h1>
                        <div className="mt-10">Track your admin activities and manage the platform</div>
                    </div>
                </div>

                <div className="row y-gap-30">
                    <Container>
                        <div
                            style={{
                                display: isCoursesLoading ? "flex" : "none",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "100vh",
                            }}
                        >
                            <Grid
                                visible={isCoursesLoading}
                                height="60"
                                width="60"
                                color="#4fa94d"
                                ariaLabel="grid-loading"
                                radius="12.5"
                                wrapperStyle={{}}
                                wrapperClass="grid-wrapper"
                            />
                        </div>

                        {!isCoursesLoading && courses && courses.length === 0 && (
                            <div className="text-center">
                                <h4>No courses found.</h4>
                            </div>
                        )}

                        {!isCoursesLoading && (
                            <>
                                <Row className="g-4">
                                    {courses?.map((course) => (
                                        <AdminCourseCard key={course.id} course={course} />
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

export default AdminAllCourses;
