"use client";

import { useState } from "react";
import { Container } from "react-bootstrap";
import { Grid } from "react-loader-spinner";
import StatsCards from "@/app/components/dashboard/student/StatsCards";
import EnrolledCourses from "@/app/components/dashboard/student/EnrolledCourses";
import RecentActivity from "@/app/components/dashboard/student/RecentActivity";
import { useGetEnrolledCoursesQuery } from "@/app/store/reducers/courses/api";

// Fake data for demonstration
const fakeEnrolledCourses = [
    {
        id: 1,
        title: "Complete Python Bootcamp",
        instructor: "John Doe",
        progress: 75,
        thumbnail: "/assets/img/courses/1.jpg",
        lastAccessed: "2024-03-15",
    },
    {
        id: 2,
        title: "Web Development Masterclass",
        instructor: "Jane Smith",
        progress: 45,
        thumbnail: "/assets/img/courses/2.jpg",
        lastAccessed: "2024-03-14",
    },
    {
        id: 3,
        title: "Data Science Fundamentals",
        instructor: "Mike Johnson",
        progress: 30,
        thumbnail: "/assets/img/courses/3.jpg",
        lastAccessed: "2024-03-13",
    },
];

const fakeStats = {
    enrolledCourses: 3,
    completedCourses: 1,
    certificates: 1,
    totalHours: 45,
};

const fakeRecentActivity = [
    {
        id: 1,
        type: "course_progress" as const,
        course: "Complete Python Bootcamp",
        description: "Completed Module 3: Advanced Functions",
        time: "2 hours ago",
    },
    {
        id: 2,
        type: "certificate" as const,
        course: "Web Development Masterclass",
        description: "Earned a certificate of completion",
        time: "1 day ago",
    },
    {
        id: 3,
        type: "enrollment" as const,
        course: "Data Science Fundamentals",
        description: "Enrolled in a new course",
        time: "2 days ago",
    },
];

const StudentDashboardHome = () => {
    const [isLoading] = useState(false);
    const {
        data,
        isLoading: isEnrolledCoursesLoading,
        error,
    } = useGetEnrolledCoursesQuery({
        page: 1,
        page_size: 3,
    });

    let courses = data?.results;

    return (
        <div className="dashboard__main">
            <div className="dashboard__content bg-light-4">
                <div className="row pb-50 mb-10">
                    <div className="col-auto">
                        <h1 className="text-30 lh-12 fw-700">Student Dashboard</h1>
                        <div className="mt-10">Track your learning progress and manage your courses</div>
                    </div>
                </div>

                <div className="row y-gap-30">
                    <Container>
                        {isLoading ? (
                            <div
                                className="d-flex justify-content-center align-items-center"
                                style={{ height: "50vh" }}
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
                        ) : (
                            <>
                                <StatsCards stats={fakeStats} />
                                <EnrolledCourses
                                    courses={courses ?? []}
                                    loading={isEnrolledCoursesLoading}
                                    error={error}
                                />
                                {/* <RecentActivity activities={fakeRecentActivity} /> */}
                            </>
                        )}
                    </Container>
                </div>
            </div>
        </div>
    );
};

export default StudentDashboardHome;
