"use client";

import { useGetEnrolledCoursesQuery } from "@/app/store/reducers/courses/api";
import { Container, Row } from "react-bootstrap";
import { Grid } from "react-loader-spinner";
import Pagination from "@/app/components/common/Pagination";
import { useState } from "react";
import CourseCard from "@/app/components/dashboard/courses/CourseCard";

const MyCourses = () => {
    const [pageNumber, setPageNumber] = useState(1);
    const pageSize = 8;

    const { data, isLoading, error } = useGetEnrolledCoursesQuery({
        page: pageNumber ?? 1,
        page_size: pageSize,
    });

    let courses = data?.results;

    return (
        <div className="dashboard__main">
            <div className="dashboard__content bg-light-4">
                <div className="row pb-50 mb-10">
                    <div className="col-auto">
                        <h1 className="text-30 lh-12 fw-700">My Courses</h1>
                        <div className="mt-10">Here you can see all the courses you have enrolled in.</div>
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
                                height="200"
                                width="200"
                                color="#4fa94d"
                                ariaLabel="grid-loading"
                                radius="12.5"
                                wrapperStyle={{}}
                                wrapperClass="grid-wrapper"
                            />
                        </div>

                        {error && (
                            <div className="text-center">
                                <h4>Error loading courses</h4>
                            </div>
                        )}

                        {!isLoading && courses && courses.length === 0 && (
                            <div className="text-center">
                                <h4>You haven't enrolled in any courses yet.</h4>
                            </div>
                        )}

                        {!isLoading && (
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

export default MyCourses;
