"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

interface CourseInstructorProps {
    course: Course;
}

const CourseInstructor: React.FC<CourseInstructorProps> = ({ course }) => {
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
                            src="/assets/img/misc/verified/1.png"
                            alt="image"
                        />
                    </div>

                    <div className="">
                        <h5 className="text-17 lh-14 fw-500">
                            <Link href={`/profile/${course?.user.name}`}>
                                {course?.user.name}
                            </Link>
                        </h5>
                        <p className="mt-5">President of Sales</p>

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
                                    23,987 Reviews
                                </div>
                            </div>

                            <div className="d-flex items-center text-light-1">
                                <div className="icon-person-3 text-13 mr-8"></div>
                                <div className="text-13 lh-1">692 Students</div>
                            </div>

                            <div className="d-flex items-center text-light-1">
                                <div className="icon-wall-clock text-13 mr-8"></div>
                                <div className="text-13 lh-1">15 Course</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-30">
                    <p>
                        Back in 2010, I started brainspin with a desire to
                        design compelling and engaging apps. For over 7 years, I
                        have designed many high profile web and iPhone
                        applications. The applications range from 3D medical
                        aided web applications to project management
                        applications for niche industries.
                        <br />
                        <br />I am also the founder of a large local design
                        organization, Salt Lake Designers, where I and other
                        local influencers help cultivate the talents of up and
                        coming UX designers through workshops and panel
                        discussions.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default CourseInstructor;
