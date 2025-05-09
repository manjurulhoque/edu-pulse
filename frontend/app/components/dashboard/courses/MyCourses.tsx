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
    const [sortBy, setSortBy] = useState("recent");
    const [category, setCategory] = useState("");
    const [progress, setProgress] = useState("");
    const [instructor, setInstructor] = useState("");
    const [search, setSearch] = useState("");

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

                <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
                    <div className="d-flex gap-3 flex-wrap">
                        <div>
                            <label className="fw-bold me-2">Sort by</label>
                            <select
                                className="form-select d-inline-block w-auto"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                <option value="recent">Recently Accessed</option>
                                <option value="title">Title</option>
                                <option value="progress">Progress</option>
                            </select>
                        </div>
                        <div>
                            <label className="fw-bold me-2">Filter by</label>
                            <select
                                className="form-select d-inline-block w-auto"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="">Categories</option>
                                <option value="dev">Development</option>
                                <option value="cloud">Cloud</option>
                            </select>
                        </div>
                        <select
                            className="form-select d-inline-block w-auto"
                            value={progress}
                            onChange={(e) => setProgress(e.target.value)}
                        >
                            <option value="">Progress</option>
                            <option value="completed">Completed</option>
                            <option value="incomplete">Incomplete</option>
                        </select>
                        <select
                            className="form-select d-inline-block w-auto"
                            value={instructor}
                            onChange={(e) => setInstructor(e.target.value)}
                        >
                            <option value="">Instructor</option>
                            <option value="stephen">Stephen Grider</option>
                            <option value="trevor">Trevor Sawler</option>
                        </select>
                        <button
                            className="btn btn-link"
                            onClick={() => {
                                setSortBy("recent");
                                setCategory("");
                                setProgress("");
                                setInstructor("");
                            }}
                        >
                            Reset
                        </button>
                    </div>
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
