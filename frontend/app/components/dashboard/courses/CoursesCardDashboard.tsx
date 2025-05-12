"use client";

import React from "react";
import {useState, useEffect} from "react";
import {Button, Modal} from "react-bootstrap";
import {usePublishCourseMutation} from "@/app/store/reducers/courses/api";
import {toast} from "react-toastify";
import {redirect} from "next/navigation";
import Link from "next/link";
import { Course } from "@/app/models/course.interface";

export default function CoursesCardDashboard({course}: { course: Course }) {
    const [activeShare, setActiveShare] = useState(false);
    const [rating, setRating] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [publishCourse] = usePublishCourseMutation();

    useEffect(() => {
        // for (let i = Math.floor(data.rating); i >= 1; i--) {
        //     setRating((pre): any => [...pre, "star"]);
        // }
    }, []);

    const getImageSrc = () => {
        return `${process.env.BACKEND_BASE_URL}/${course.preview_image}`;
    }

    const onPublishCourse = async () => {
        const formData = new FormData();
        formData.append("course_id", JSON.stringify(course.id));
        const result: any = await publishCourse(formData);
        if (result?.data) {
            toast.success("Course published successfully");
            redirect(`/instructor/dashboard/my-created-courses`);
        } else {
            toast.warning(result?.data?.message || "Something went wrong. Please try again later");
        }
        setShowModal(false);
    }

    return (
        <>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <p>Are your sure you want to publish this course?</p>
                </Modal.Header>
                <Modal.Footer>
                    <Button onClick={() => onPublishCourse()}>Confirm</Button>
                    <Button onClick={() => setShowModal(false)} variant={"secondary"}>Close</Button>
                </Modal.Footer>
            </Modal>
            <div className="w-1/5 xl:w-1/3 lg:w-1/2 sm:w-1/1">
                <div className="relative">
                    {/* <Image
                        width={560}
                        height={325}
                        className="rounded-8 w-1/1"
                        src={getImageSrc()}
                        alt="image"
                        priority={true}
                    /> */}
                    <img src={getImageSrc()} alt="image" className="rounded-8 w-1/1" />

                    <button
                        onClick={() => setActiveShare((pre) => !pre)}
                        className="absolute-button"
                        data-el-toggle=".js-more-1-toggle"
                    >
                        <span className="d-flex items-center justify-center size-35 bg-white shadow-1 rounded-8">
                            <i className="icon-menu-vertical"></i>
                        </span>
                    </button>

                    <div
                        className={`toggle-element -dshb-more js-more-1-toggle ${
                            activeShare ? "-is-el-visible" : ""
                        } `}
                    >
                        <div className="px-25 py-25 bg-white -dark-bg-dark-2 shadow-1 border-light rounded-8">
                            <Link
                                href={`/instructor/dashboard/edit-course/${course.slug}`}
                                className="d-flex items-center"
                            >
                                <div className="icon-share"></div>
                                <div className="text-17 lh-1 fw-500 ml-12">Edit</div>
                            </Link>

                            <Link href={`/instructor/dashboard/edit-course/${course.slug}/curriculum`} className="d-flex items-center mt-20">
                                <div className="icon-bookmark"></div>
                                <div className="text-17 lh-1 fw-500 ml-12">Edit Curriculum</div>
                            </Link>

                            <a href="#" className="d-flex items-center mt-20">
                                <div className="icon-bookmark"></div>
                                <div className="text-17 lh-1 fw-500 ml-12">Favorite</div>
                            </a>

                            {
                                !course.is_published && (
                                    <a href="javascript:void(0)" className="d-flex items-center mt-20"
                                       onClick={() => setShowModal(true)}>
                                        <div className="icon-access"></div>
                                        <div className="text-17 lh-1 fw-500 ml-12">Publish</div>
                                    </a>
                                )
                            }
                        </div>
                    </div>
                </div>

                <div className="pt-15">
                    <div className="d-flex y-gap-10 justify-between items-center">
                        <div className="text-14 lh-1">Me</div>

                        <div className="d-flex items-center">
                            <div className="text-14 lh-1 text-yellow-1 mr-10">
                                5
                            </div>
                            <div className="d-flex x-gap-5 items-center">
                                {rating.map((itm, i) => (
                                    <div key={i} className="icon-star text-9 text-yellow-1"></div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <h3 className="text-16 fw-500 lh-15 mt-10">
                        <Link href={`/courses/${course.slug}`} target={"_blank"}>
                            {course.title}
                        </Link>
                    </h3>

                    <div className="progress-bar mt-10">
                        <div className="progress-bar__bg bg-light-3"></div>
                        <div className="progress-bar__bar bg-purple-1 w-1/5"></div>
                    </div>
                </div>
            </div>
        </>
    );
}
