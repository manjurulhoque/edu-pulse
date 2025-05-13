"use client";

import { useAdminGetCoursesQuery } from "@/app/store/reducers/admin/api";
import { Grid } from "react-loader-spinner";
import { Container, Row } from "react-bootstrap";
import AdminCourseCard from "./AdminCourseCard";
import Pagination from "@/app/components/common/Pagination";
import { useState } from "react";

const AdminAllCourses = () => {
    const [pageNumber, setPageNumber] = useState(1);
    const [sortBy, setSortBy] = useState("recent");
    const [category, setCategory] = useState("");
    const [instructor, setInstructor] = useState("");
    const [status, setStatus] = useState("");
    const [price, setPrice] = useState("");
    const [date, setDate] = useState("");
    const [search, setSearch] = useState("");
    const pageSize = 8;
    const { data, isLoading: isCoursesLoading } = useAdminGetCoursesQuery({
        page: pageNumber,
        page_size: pageSize,
        sort_by: sortBy,
        category: category,
        instructor: instructor,
        status: status,
        price: price,
    });
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

                <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
                    <div className="d-flex gap-3 flex-wrap">
                        <div>
                            <label className="fw-bold me-2">Sort by</label>
                            <select
                                className="form-select d-inline-block w-auto"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                <option value="recent">Recently Added</option>
                                <option value="title">Title (A-Z)</option>
                                <option value="title_desc">Title (Z-A)</option>
                                <option value="enrollments">Most Enrolled</option>
                                <option value="rating">Highest Rated</option>
                            </select>
                        </div>
                        <div>
                            <label className="fw-bold me-2">Category</label>
                            <select
                                className="form-select d-inline-block w-auto"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="">All Categories</option>
                                <option value="dev">Development</option>
                                <option value="cloud">Cloud Computing</option>
                                <option value="data">Data Science</option>
                                <option value="design">Design</option>
                                <option value="business">Business</option>
                            </select>
                        </div>
                        <div>
                            <label className="fw-bold me-2">Status</label>
                            <select
                                className="form-select d-inline-block w-auto"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="">All Status</option>
                                <option value="published">Published</option>
                                <option value="draft">Draft</option>
                                <option value="archived">Archived</option>
                                <option value="flagged">Flagged</option>
                            </select>
                        </div>
                        <div>
                            <label className="fw-bold me-2">Price</label>
                            <select
                                className="form-select d-inline-block w-auto"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            >
                                <option value="">All Prices</option>
                                <option value="free">Free</option>
                                <option value="paid">Paid</option>
                                <option value="low">Under $20</option>
                                <option value="medium">$20 - $50</option>
                                <option value="high">Over $50</option>
                            </select>
                        </div>
                        <div>
                            <label className="fw-bold me-2">Date</label>
                            <select
                                className="form-select d-inline-block w-auto"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            >
                                <option value="">All Time</option>
                                <option value="today">Today</option>
                                <option value="week">This Week</option>
                                <option value="month">This Month</option>
                                <option value="quarter">Last 3 Months</option>
                                <option value="year">This Year</option>
                            </select>
                        </div>
                        <div>
                            <label className="fw-bold me-2">Instructor</label>
                            <select
                                className="form-select d-inline-block w-auto"
                                value={instructor}
                                onChange={(e) => setInstructor(e.target.value)}
                            >
                                <option value="">All Instructors</option>
                                <option value="stephen">Stephen Grider</option>
                                <option value="trevor">Trevor Sawler</option>
                                <option value="angela">Angela Yu</option>
                                <option value="jonas">Jonas Schmedtmann</option>
                            </select>
                        </div>
                        <button
                            className="btn btn-outline-secondary"
                            onClick={() => {
                                setSortBy("recent");
                                setCategory("");
                                setStatus("");
                                setPrice("");
                                setDate("");
                                setInstructor("");
                                setSearch("");
                            }}
                        >
                            Reset Filters
                        </button>
                    </div>
                    <div>
                        <input
                            type="text"
                            className="form-control d-inline-block w-auto"
                            placeholder="Search courses"
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
