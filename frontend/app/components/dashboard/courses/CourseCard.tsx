"use client";

import { Col, Card } from "react-bootstrap";
import { getCourseImagePath } from "@/app/utils/image-path";
import { PlayCircle, MoreVertical, Star, StarOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import { Course } from "@/app/models/course.interface";

const CourseCard = ({ course }: { course: Course }) => {
    const [openMenuId, setOpenMenuId] = useState<null | number>(null);
    const menuRef = useRef<HTMLDivElement | null>(null);
    
    return (
        <Col key={course.id} xs={12} md={6} lg={3}>
            <Link href={`/courses/${course.slug}/learn/lesson/1`} className="text-decoration-none">
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
                                    <div
                                        style={{
                                            padding: "8px 20px",
                                            fontWeight: 600,
                                            color: "#888",
                                        }}
                                    >
                                        Lists
                                    </div>
                                    <div style={{ padding: "8px 20px", color: "#888" }}>You have no list</div>
                                    <hr style={{ margin: "8px 0" }} />
                                    <div
                                        style={{
                                            padding: "8px 20px",
                                            cursor: "pointer",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 8,
                                        }}
                                    >
                                        <span
                                            style={{
                                                color: "#a259ff",
                                                fontWeight: 700,
                                                fontSize: 18,
                                            }}
                                        >
                                            +
                                        </span>
                                        <span
                                            style={{
                                                color: "#a259ff",
                                                fontWeight: 500,
                                            }}
                                        >
                                            Create New List
                                        </span>
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
                                        <span>🔗</span> Share
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
                        </div>
                        <div className="progress" style={{ height: 6, marginBottom: 8 }}>
                            <div
                                className="progress-bar"
                                role="progressbar"
                                style={{ width: `${0}%` }}
                                aria-valuenow={0}
                                aria-valuemin={0}
                                aria-valuemax={100}
                            />
                        </div>
                        <div style={{ fontSize: 13, marginBottom: 8 }}>0% complete</div>
                        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                            {[1, 2, 3, 4, 5].map((star) =>
                                0 >= star ? (
                                    <Star key={star} size={16} color="#f5c518" fill="#f5c518" />
                                ) : (
                                    <StarOff key={star} size={16} color="#f5c518" />
                                )
                            )}
                            <span style={{ fontSize: 13, marginLeft: 6 }}>{0 ? "Your rating" : "Leave a rating"}</span>
                        </div>
                    </Card.Body>
                </Card>
            </Link>
        </Col>
    );
};

export default CourseCard;
