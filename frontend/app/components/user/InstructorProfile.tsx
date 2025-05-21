"use client";

import { User } from "@/app/models/user.interface";
import Image from "next/image";
import { Facebook, Linkedin, Youtube } from "lucide-react";
import { getCourseImagePath, getUserImagePath } from "@/app/utils/image-path";
import { useGetInstructorCoursesQuery, useGetInstructorStatsQuery } from "@/app/store/reducers/user/api";
import Link from "next/link";

interface InstructorProfileProps {
    user: User;
}

const InstructorProfile = ({ user }: InstructorProfileProps) => {
    const { data: response, isLoading } = useGetInstructorCoursesQuery({ user_id: user.id });
    const courses = response?.data;
    const { data: statsResponse } = useGetInstructorStatsQuery({ user_id: user.id });
    const stats = statsResponse?.data;

    return (
        <div className="container py-5" style={{ marginTop: "100px" }}>
            {/* Header */}
            <div
                className="row align-items-center mb-4"
                style={{
                    backgroundColor: "#f2efff",
                    borderRadius: 24,
                    padding: 24,
                }}
            >
                <div className="col-md-8">
                    <div className="text-uppercase fw-bold text-secondary mb-1" style={{ fontSize: "0.95rem" }}>
                        Instructor
                    </div>
                    <h1 className="fw-bold mb-1" style={{ fontSize: "2.5rem" }}>
                        {user.name}
                    </h1>
                    <div className="fw-semibold mb-2" style={{ fontSize: "1.1rem" }}>
                        Professional Programmer and Educator
                    </div>
                    <span className="badge bg-secondary mb-2" style={{ fontSize: "0.95rem" }}>
                        Instructor Partner
                    </span>
                </div>
                <div className="col-md-4 d-flex justify-content-md-end justify-content-center mt-3 mt-md-0">
                    <div
                        className="bg-white text-center shadow-sm"
                        style={{
                            borderRadius: 24,
                            minWidth: 320,
                            padding: "40px 32px 32px 32px",
                            boxShadow: "0 4px 24px 0 rgba(80, 80, 80, 0.08)",
                            border: "none",
                        }}
                    >
                        <Image
                            src={getUserImagePath(user)}
                            alt="Profile"
                            width={120}
                            height={120}
                            className="rounded-circle mx-auto mb-4"
                            style={{ objectFit: "cover", border: "2px solid #e5e5f7" }}
                        />
                        <div className="d-flex justify-content-center gap-4 mb-2">
                            <a
                                href="#"
                                style={{
                                    border: "2px solid #7c3aed",
                                    borderRadius: 12,
                                    width: 48,
                                    height: 48,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "#7c3aed",
                                    background: "#fff",
                                    transition: "background 0.2s, color 0.2s",
                                    fontSize: 24,
                                }}
                                className="me-2"
                            >
                                <Facebook size={24} stroke="#7c3aed" />
                            </a>
                            <a
                                href="#"
                                style={{
                                    border: "2px solid #7c3aed",
                                    borderRadius: 12,
                                    width: 48,
                                    height: 48,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "#7c3aed",
                                    background: "#fff",
                                    transition: "background 0.2s, color 0.2s",
                                    fontSize: 24,
                                }}
                                className="me-2"
                            >
                                <Linkedin size={24} stroke="#7c3aed" />
                            </a>
                            <a
                                href="#"
                                style={{
                                    border: "2px solid #7c3aed",
                                    borderRadius: 12,
                                    width: 48,
                                    height: 48,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "#7c3aed",
                                    background: "#fff",
                                    transition: "background 0.2s, color 0.2s",
                                    fontSize: 24,
                                }}
                            >
                                <Youtube size={24} stroke="#7c3aed" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="row mb-4">
                <div className="col-auto me-4">
                    <div className="fw-bold" style={{ fontSize: "1.3rem" }}>
                        {stats?.total_students || 0}
                    </div>
                    <div className="text-secondary" style={{ fontSize: "0.98rem" }}>
                        Total Students
                    </div>
                </div>
                <div className="col-auto me-4">
                    <div className="fw-bold" style={{ fontSize: "1.3rem" }}>
                        {stats?.total_reviews || 0}
                    </div>
                    <div className="text-secondary" style={{ fontSize: "0.98rem" }}>
                        Total Reviews
                    </div>
                </div>
            </div>

            {/* About Me */}
            {user.bio && (
                <div className="mb-5">
                    <h4 className="fw-bold mb-3">About me</h4>
                    <p>{user.bio}</p>
                </div>
            )}

            {/* My Courses */}
            {isLoading ? (
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <div>
                    <h4 className="fw-bold mb-4 mt-20">My courses ({courses?.length})</h4>
                    <div className="row g-4">
                        {courses?.map((course, i) => (
                            <div key={i} className="col-12 col-sm-6 col-md-4 col-lg-3">
                                <div className="card h-100 shadow-sm position-relative">
                                    {course.is_popular && (
                                        <span
                                            className="badge bg-warning text-dark position-absolute"
                                            style={{ top: 10, left: 10, fontSize: "0.9rem" }}
                                        >
                                            Bestseller
                                        </span>
                                    )}
                                    <Image
                                        src={getCourseImagePath(course)}
                                        alt={course.title}
                                        width={300}
                                        height={180}
                                        className="card-img-top"
                                        style={{
                                            objectFit: "cover",
                                            borderTopLeftRadius: 12,
                                            borderTopRightRadius: 12,
                                            height: "200px",
                                        }}
                                    />
                                    <Link href={`/courses/${course.slug}`} target="_blank">
                                        <div className="card-body">
                                            <div className="fw-semibold" style={{ fontSize: "1.05rem" }}>
                                                {course.title}
                                            </div>
                                            <div
                                                className="text-secondary"
                                                style={{
                                                    fontSize: "0.98rem",
                                                    display: "-webkit-box",
                                                    WebkitLineClamp: 2,
                                                    WebkitBoxOrient: "vertical",
                                                    overflow: "hidden",
                                                }}
                                            >
                                                <p dangerouslySetInnerHTML={{ __html: course.description }}></p>
                                            </div>
                                            <br />
                                            <div className="course-price">
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
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default InstructorProfile;
