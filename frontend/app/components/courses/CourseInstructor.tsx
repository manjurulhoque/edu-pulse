"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface CourseInstructorProps {
    course: Course;
}

const fetchCourseInstructor = async (courseId: number) => {
    const response = await fetch(
        `${process.env.BACKEND_BASE_URL}/course/${courseId}/instructor`
    );
    return response.json();
};

const CourseInstructor: React.FC<CourseInstructorProps> = ({ course }) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["course-instructor", course.id],
        queryFn: () => fetchCourseInstructor(course.id),
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const instructor = data?.instructor || {};

    const getAvatarUrl = (avatar: string) => {
        return `${process.env.BACKEND_DOCKER_BASE_URL}/${avatar}`;
    };

    return (
        <div id="instructor" className="pt-60 lg:pt-40">
            <h2 className="text-20 fw-500">Instructor</h2>

            <div className="mt-30">
                <div className="d-flex x-gap-20 y-gap-20 items-center flex-wrap">
                    <div className="size-120">
                        <Image
                            width={100}
                            height={100}
                            className="object-cover"
                            src={getAvatarUrl(instructor.avatar)}
                            alt="Instructor Avatar"
                        />
                    </div>

                    <div className="">
                        <h5 className="text-17 lh-14 fw-500">
                            <Link href={`/profile/${instructor.name}`}>
                                {instructor.name}
                            </Link>
                        </h5>
                        <p className="mt-5">{instructor.bio || "No bio available"}</p>

                        <div className="d-flex x-gap-20 y-gap-10 flex-wrap items-center pt-10">
                            <div className="d-flex items-center">
                                <div className="d-flex items-center mr-8">
                                    <div className="icon-star text-11 text-yellow-1"></div>
                                    <div className="text-14 lh-12 text-yellow-1 ml-5">
                                        4.5
                                    </div>
                                </div>
                                <div className="text-13 lh-1">
                                    Instructor Rating
                                </div>
                            </div>

                            <div className="d-flex items-center text-light-1">
                                <div className="icon-comment text-13 mr-8"></div>
                                <div className="text-13 lh-1">
                                    0 Reviews
                                </div>
                            </div>

                            <div className="d-flex items-center text-light-1">
                                <div className="icon-person-3 text-13 mr-8"></div>
                                <div className="text-13 lh-1">{data?.total_students} Students</div>
                            </div>

                            <div className="d-flex items-center text-light-1">
                                <div className="icon-wall-clock text-13 mr-8"></div>
                                <div className="text-13 lh-1">{data?.total_published_courses} Courses</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-30">
                    <p>{instructor.bio || "No bio available"}</p>
                </div>
            </div>
        </div>
    );
}

export default CourseInstructor;
