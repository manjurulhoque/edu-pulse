"use client";

import { Col, Card } from "react-bootstrap";
import { getCourseImagePath } from "@/app/utils/image-path";
import { PlayCircle, MoreVertical, Star, StarOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import { Course } from "@/app/models/course.interface";

const AdminCourseCard = ({ course }: { course: Course }) => {
    const [openMenuId, setOpenMenuId] = useState<null | number>(null);
    const menuRef = useRef<HTMLDivElement | null>(null);

    const approveCourse = async (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        // TODO: Implement approve course
        alert("Approve course");
    };
    return (
        <Col key={course.id} xs={12} md={6} lg={3}>
            <Link href={`/courses/${course.slug}`} className="text-decoration-none">
                <Card className="h-100 position-relative">
                    <div style={{ position: "relative", height: "200px" }}>
                        <Image
                            src={getCourseImagePath(course)}
                            alt={course.title}
                            fill
                            style={{ objectFit: "cover" }}
                        />
                        <div
                            style={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                zIndex: 2,
                            }}
                        >
                            <PlayCircle size={48} color="#fff" fill="#fff" strokeWidth={1.5} />
                        </div>
                        <div
                            style={{
                                position: "absolute",
                                top: 10,
                                right: 10,
                                zIndex: 2,
                                background: "rgba(255,255,255,0.8)",
                                borderRadius: "50%",
                                padding: 4,
                                cursor: "pointer",
                            }}
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setOpenMenuId(course.id === openMenuId ? null : course.id);
                            }}
                        >
                            <MoreVertical size={24} />
                            {openMenuId === course.id && (
                                <div
                                    ref={menuRef}
                                    style={{
                                        position: "absolute",
                                        top: 36,
                                        right: 0,
                                        minWidth: 220,
                                        background: "#fff",
                                        borderRadius: 12,
                                        boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
                                        padding: "12px 0",
                                        zIndex: 10,
                                    }}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    {
                                        !course.is_approved ? (
                                            <div
                                                style={{
                                                    padding: "8px 20px",
                                                    cursor: "pointer",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: 8,
                                                }}
                                                onClick={(e) => {
                                                    approveCourse(e);
                                                }}
                                            >
                                                <span>🔓</span> Approve
                                            </div>
                                        ) : null
                                    }
                                    <div
                                        style={{
                                            padding: "8px 20px",
                                            cursor: "pointer",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 8,
                                        }}
                                    >
                                        <span>★</span> Favorite
                                    </div>
                                    <div
                                        style={{
                                            padding: "8px 20px",
                                            cursor: "pointer",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 8,
                                        }}
                                    >
                                        <span>🗂️</span> Archive
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <Card.Body>
                        <Card.Title>{course.title}</Card.Title>
                        <div className="text-muted" style={{ fontSize: 14, marginBottom: 4 }}>
                            {course.user.name}
                            <p>
                                <small className="text-muted">Status: {course.status}</small>
                            </p>
                        </div>
                    </Card.Body>
                </Card>
            </Link>
        </Col>
    );
};

export default AdminCourseCard;
