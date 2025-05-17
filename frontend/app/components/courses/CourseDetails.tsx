"use client";

import React from "react";
import { useCourseDetailsQuery } from "@/app/store/reducers/courses/api";
import { Grid } from "react-loader-spinner";
import NotFound from "@/app/components/NotFound";
import { useParams } from "next/navigation";
import PinContent from "@/app/components/courses/PinContent";
import CourseOverview from "@/app/components/courses/CourseOverview";
import CourseContent from "@/app/components/courses/CourseContent";
import Star from "@/app/components/common/Star";
import CourseInstructor from "./CourseInstructor";
import { Course } from "@/app/models/course.interface";
import { getCourseAuthorImagePath, getCourseImagePath } from "@/app/utils/image-path";

const menuItems = [
    { id: 1, href: "#overview", text: "Overview", isActive: true },
    { id: 2, href: "#course-content", text: "Course Content", isActive: false },
    { id: 3, href: "#instructor", text: "Instructor", isActive: false },
    { id: 4, href: "#reviews", text: "Reviews", isActive: false },
];

const CourseDetails = () => {
    const params = useParams();
    const { data: course, isLoading: isCourseLoading } = useCourseDetailsQuery({ slug: params.slug as string });

    return (
        <>
            <div id="js-pin-container" className="js-pin-container relative">
                <div
                    style={{
                        display: isCourseLoading ? "flex" : "none",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100vh",
                    }}
                >
                    <Grid
                        visible={true}
                        height="300"
                        width="300"
                        color="#4fa94d"
                        ariaLabel="grid-loading"
                        radius="12.5"
                        wrapperStyle={{}}
                        wrapperClass="grid-wrapper"
                    />
                </div>
                {!isCourseLoading && !course && <NotFound />}
                {!isCourseLoading && course && (
                    <>
                        <section className="page-header -type-6" style={{ marginTop: "10px" }}>
                            <div className="page-header__bg bg-purple-1"></div>
                            <div className="container">
                                <div className="page-header__content">
                                    <div className="row y-gap-30 relative">
                                        <div className="col-xl-7 col-lg-8">
                                            <div className="d-flex x-gap-15 y-gap-10 pb-20">
                                                {course?.is_featured && (
                                                    <div>
                                                        <div className="badge px-15 py-8 text-11 bg-green-1 text-dark-1 fw-400">
                                                            BEST SELLER
                                                        </div>
                                                    </div>
                                                )}
                                                {course?.is_popular && (
                                                    <div>
                                                        <div className="badge px-15 py-8 text-11 bg-orange-1 text-white fw-400">
                                                            POPULAR
                                                        </div>
                                                    </div>
                                                )}
                                                {/* <div>
                                                    <div className="badge px-15 py-8 text-11 bg-orange-1 text-white fw-400">
                                                        NEW
                                                    </div>
                                                </div> */}
                                            </div>

                                            <div>
                                                <h1 className="text-30 lh-14 text-white pr-60 lg:pr-0">
                                                    {course?.title}
                                                </h1>
                                            </div>

                                            <p className="col-xl-9 mt-20 text-white">{course?.short_description}</p>

                                            <div className="d-flex x-gap-30 y-gap-10 items-center flex-wrap pt-20">
                                                <div className="d-flex items-center text-white">
                                                    <div className="text-14 lh-1 text-green-1 mr-10">4.9</div>
                                                    <div className="d-flex x-gap-10 items-center">
                                                        <Star star={4} textColor={"text-green-1"} />
                                                    </div>
                                                    <div className="text-14 lh-1 ml-10">(567)</div>
                                                </div>

                                                <div className="d-flex items-center text-white">
                                                    <div className="icon icon-person-3 text-13"></div>
                                                    <div className="text-14 ml-8">853 enrolled on this course</div>
                                                </div>

                                                <div className="d-flex items-center text-white">
                                                    <div className="icon icon-wall-clock text-13"></div>
                                                    <div className="text-14 ml-8">
                                                        Last updated {new Date(course?.updated_at).toLocaleDateString()}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="d-flex items-center pt-20">
                                                <div
                                                    className="bg-image size-30 rounded-full js-lazy"
                                                    style={{
                                                        backgroundImage: `url(${getCourseImagePath(course as Course)})`,
                                                    }}
                                                    data-bg={getCourseAuthorImagePath(course as Course)}
                                                ></div>
                                                <div className="text-14 lh-1 ml-10 text-white">
                                                    Created by {course?.user.name}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <PinContent course={course as Course} />

                        <section className="layout-pt-md layout-pb-md">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-8">
                                        <div className="page-nav-menu -line">
                                            <div className="d-flex x-gap-30">
                                                {menuItems.map((item) => (
                                                    <div key={item.id}>
                                                        <a
                                                            href={item.href}
                                                            className={`pb-12 page-nav-menu__link ${
                                                                item.isActive ? "is-active" : ""
                                                            }`}
                                                        >
                                                            {item.text}
                                                        </a>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <CourseOverview course={course} />
                                        <CourseContent course={course} />
                                        <CourseInstructor course={course} />
                                        {/*<Reviews/>*/}
                                    </div>
                                </div>
                            </div>
                        </section>
                    </>
                )}
            </div>
        </>
    );
};

export default CourseDetails;
