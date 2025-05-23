"use client";

import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Course } from "@/app/models/course.interface";
import { getCourseAuthorImagePath, getCourseImagePath } from "@/app/utils/image-path";
import { BookOpen, CircleGauge } from "lucide-react";

export default function HomeCourseCard({ course, index }: { course: Course; index: number }) {
    const [rating, setRating] = useState<string[]>([]);
    useEffect(() => {
        // Reset rating array before adding new stars
        setRating([]);
        // Use course.rating or default to 0 if not available
        const ratingValue = 4;
        // Round to nearest whole number for full stars
        const fullStars = Math.round(ratingValue);

        for (let i = 0; i < fullStars; i++) {
            setRating((prev) => [...prev, "star"]);
        }
    }, [course]);

    return (
        <div className="col-lg-3 col-md-6">
            <div>
                <div className="coursesCard -type-1 -hover-shadow border-light rounded-8">
                    <div className="relative">
                        <div className="coursesCard__image overflow-hidden rounded-top-8">
                            <Image
                                width={600}
                                height={420}
                                className="w-1/1"
                                src={getCourseImagePath(course)}
                                alt="image"
                                priority={true}
                            />
                            <div className="coursesCard__image_overlay rounded-top-8"></div>
                        </div>
                        <div className="d-flex justify-between py-10 px-10 absolute-full-center z-3">
                            {course.is_featured && (
                                <div>
                                    <div className="px-15 rounded-200 bg-purple-1">
                                        <span className="text-11 lh-1 uppercase fw-500 text-white">Featured</span>
                                    </div>
                                </div>
                            )}

                            {course.is_popular && (
                                <div>
                                    <div className="px-15 rounded-200 bg-green-1">
                                        <span className="text-11 lh-1 uppercase fw-500 text-dark-1">Best sellers</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="h-100 pt-15 pb-10 px-20">
                        <div className="d-flex items-center">
                            <div className="text-14 lh-1 text-yellow-1 mr-10">4</div>
                            <div className="d-flex x-gap-5 items-center">
                                {rating.map((itm, i) => (
                                    <div key={i} className="icon-star text-9 text-yellow-1"></div>
                                ))}
                            </div>
                            <div className="text-13 lh-1 ml-10">(5)</div>
                        </div>

                        <div className="text-17 lh-15 fw-500 text-dark-1 mt-10">
                            <Link className="linkCustom" href={`/courses/${course.slug}`}>
                                {course.title}
                            </Link>
                        </div>

                        <div className="d-flex x-gap-10 items-center pt-10">
                            <div className="d-flex items-center">
                                <div className="mr-8">
                                    <BookOpen size={16} />
                                </div>
                                <div className="text-14 lh-1">{course.lessons_count} lessons</div>
                            </div>

                            {/* <div className="d-flex items-center">
                                <div className="mr-8">
                                    <Image
                                        width={16}
                                        height={17}
                                        src="/assets/img/coursesCards/icons/2.svg"
                                        alt="icon"
                                    />
                                </div>
                                <div className="text-14 lh-1">{`${Math.floor(343 / 60)}h ${Math.floor(
                                    33423 % 60
                                )}m`}</div>
                            </div> */}

                            <div className="d-flex items-center">
                                <div className="mr-8">
                                    <CircleGauge size={16} />
                                </div>
                                <div className="text-14 lh-1">{course.level.charAt(0).toUpperCase() + course.level.slice(1)}</div>
                            </div>
                        </div>

                        <div className="coursesCard-footer">
                            <Link href={`/user/${course.user?.username}`}>
                                <div className="coursesCard-footer__author">
                                    <Image width={30} height={30} src={getCourseAuthorImagePath(course)} alt="image" />
                                    <div>{course?.user?.name}</div>
                                </div>
                            </Link>

                            <div className="coursesCard-footer__price">
                                {!course.is_free ? (
                                    <>
                                        <div>${course.actual_price}</div>
                                        <div>${course.discounted_price}</div>
                                    </>
                                ) : (
                                    <>
                                        <div></div>
                                        <div>Free</div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
