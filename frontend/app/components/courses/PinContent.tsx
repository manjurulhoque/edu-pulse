"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useAddToCartMutation } from "@/app/store/reducers/cart/api";
import { toast } from "react-toastify";
import { Course } from "@/app/models/course.interface";
import { useIsAlreadyEnrolledQuery } from "@/app/store/reducers/courses/api";

export default function PinContent({ course }: { course: Course }) {
    const { data: isAlreadyEnrolledResponse } = useIsAlreadyEnrolledQuery({ course_id: course.id });
    const isAlreadyEnrolled = isAlreadyEnrolledResponse?.data?.enrolled || false;
    const enrolledAt = isAlreadyEnrolledResponse?.data?.enrolled_at || null;
    const [isOpen, setIsOpen] = useState(false);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const { data: session } = useSession();
    const [addToCart, { isLoading }] = useAddToCartMutation();

    // useEffect hook to update the screen width when the window is resized
    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        // Cleanup the event listener when the component is unmounted
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const getImageSrc = () => {
        return `${process.env.BACKEND_DOCKER_BASE_URL}/${course?.preview_image}`;
    };

    const handleAddToCart = async () => {
        if (!session?.user) {
            toast.error("Please login to add courses to cart");
            return;
        }

        try {
            await addToCart(course.id).unwrap();
            toast.success("Course added to cart successfully");
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to add course to cart");
        }
    };

    return (
        <>
            <div
                id="js-pin-content"
                style={
                    screenWidth < 991
                        ? { height: "fit-content", left: "0%" }
                        : { height: "100%", paddingTop: "80px", right: "7%" }
                }
                className="courses-single-info js-pin-content"
            >
                <div
                    style={{ position: "sticky", top: "100px" }}
                    className="bg-white shadow-2 rounded-8 border-light py-10 px-10"
                >
                    <div className="relative">
                        <Image width={368} height={238} className="w-1/1" src={getImageSrc()} alt="image" />
                        <div className="absolute-full-center d-flex justify-center items-center">
                            <div
                                onClick={() => setIsOpen(true)}
                                className="d-flex justify-center items-center size-60 rounded-full bg-white js-gallery cursor"
                                data-gallery="gallery1"
                            >
                                <div className="icon-play text-18"></div>
                            </div>
                        </div>
                    </div>

                    <div className="courses-single-info__content scroll-bar-1 pt-30 pb-20 px-20">
                        <div className="d-flex justify-between items-center mb-30">
                            {!course.is_free ? (
                                <>
                                    <div className="text-24 lh-1 text-dark-1 fw-500">${course.discounted_price}</div>
                                    <div className="lh-1 line-through">${course.actual_price}</div>
                                </>
                            ) : (
                                <>
                                    <div className="text-24 lh-1 text-dark-1 fw-500">Free</div>
                                    <div></div>
                                </>
                            )}
                        </div>

                        {isAlreadyEnrolled ? (
                            <>
                                <button className="button -md -outline-dark-1 text-dark-1 w-1/1 mt-10">
                                    Enrolled on {new Date(enrolledAt || "").toLocaleDateString()}
                                </button>
                                <button className="button -md -outline-dark-1 text-dark-1 w-1/1 mt-10">
                                    View Course
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={handleAddToCart}
                                    disabled={isLoading}
                                    className="button -md -purple-1 text-white w-1/1"
                                >
                                    {isLoading ? "Adding..." : "Add To Cart"}
                                </button>
                                <button className="button -md -outline-dark-1 text-dark-1 w-1/1 mt-10">Buy Now</button>
                            </>
                        )}

                        <div className="text-14 lh-1 text-center mt-30">30-Day Money-Back Guarantee</div>

                        <div className="mt-25">
                            <div className="d-flex justify-between py-8 ">
                                <div className="d-flex items-center text-dark-1">
                                    <div className="icon-video-file"></div>
                                    <div className="ml-10">Lessons</div>
                                </div>
                                <div>10</div>
                            </div>

                            <div className="d-flex justify-between py-8 border-top-light">
                                <div className="d-flex items-center text-dark-1">
                                    <div className="icon-puzzle"></div>
                                    <div className="ml-10">Quizzes</div>
                                </div>
                                <div>3</div>
                            </div>

                            <div className="d-flex justify-between py-8 border-top-light">
                                <div className="d-flex items-center text-dark-1">
                                    <div className="icon-clock-2"></div>
                                    <div className="ml-10">Duration</div>
                                </div>
                                <div>13 Hours</div>
                            </div>

                            <div className="d-flex justify-between py-8 border-top-light">
                                <div className="d-flex items-center text-dark-1">
                                    <div className="icon-bar-chart-2"></div>
                                    <div className="ml-10">Skill level</div>
                                </div>
                                <div
                                    style={{
                                        textTransform: "capitalize",
                                    }}
                                >
                                    {course.level}
                                </div>
                            </div>

                            <div className="d-flex justify-between py-8 border-top-light">
                                <div className="d-flex items-center text-dark-1">
                                    <div className="icon-badge"></div>
                                    <div className="ml-10">Certificate</div>
                                </div>
                                <div>Yes</div>
                            </div>

                            <div className="d-flex justify-between py-8 border-top-light">
                                <div className="d-flex items-center text-dark-1">
                                    <div className="icon-infinity"></div>
                                    <div className="ml-10">Full lifetime access</div>
                                </div>
                                <div>Yes</div>
                            </div>
                        </div>

                        <div className="d-flex justify-center pt-15">
                            <a href="#" className="d-flex justify-center items-center size-40 rounded-full">
                                <i className="fa fa-facebook"></i>
                            </a>

                            <a href="#" className="d-flex justify-center items-center size-40 rounded-full">
                                <i className="fa fa-twitter"></i>
                            </a>

                            <a href="#" className="d-flex justify-center items-center size-40 rounded-full">
                                <i className="fa fa-instagram"></i>
                            </a>

                            <a href="#" className="d-flex justify-center items-center size-40 rounded-full">
                                <i className="fa fa-linkedin"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            {/*<ModalVideoComponent*/}
            {/*    videoId={"LlCwHnp3kL4"}*/}
            {/*    isOpen={isOpen}*/}
            {/*    setIsOpen={setIsOpen}*/}
            {/*/>*/}
        </>
    );
}
