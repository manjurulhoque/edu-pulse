"use client";

import { Col, Card, Modal, Button, Form } from "react-bootstrap";
import { getCourseImagePath } from "@/app/utils/image-path";
import { PlayCircle, MoreVertical, Star, StarOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import { Course } from "@/app/models/course.interface";
import { useCreateReviewMutation, useGetMyReviewForCourseQuery } from "@/app/store/reducers/reviews/api";
import { toast } from "react-toastify";
import { useGetCourseProgressQuery } from "@/app/store/reducers/courses/api";

const CourseCard = ({ course }: { course: Course }) => {
    const [openMenuId, setOpenMenuId] = useState<null | number>(null);
    const menuRef = useRef<HTMLDivElement | null>(null);
    const [showRatingModal, setShowRatingModal] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [createReview, { isLoading }] = useCreateReviewMutation();
    const { data: courseProgressResponse, isLoading: isCourseProgressLoading } = useGetCourseProgressQuery({ course_id: course.id });
    const { data: myReview, isLoading: isMyReviewLoading, refetch: refetchMyReview } = useGetMyReviewForCourseQuery({ courseId: course.id });
    const isMyReview = myReview?.data;
    const { rating: myReviewRating = 0 } = isMyReview || {};
    const courseProgress = courseProgressResponse?.data || 0;

    const handleRatingClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setShowRatingModal(true);
    };

    const handleSubmitRating = async () => {
        try {
            await createReview({ courseId: course.id, review: { rating, comment } }).unwrap();
            toast.success("Rating submitted successfully");
            setShowRatingModal(false);
            refetchMyReview();
        } catch (error) {
            toast.error("Failed to submit rating");
        }
    };

    return (
        <Col key={course.id} xs={12} md={6} lg={3}>
            <Link href={`/courses/${course.slug}/learn/`} className="text-decoration-none">
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
                                style={{ width: `${courseProgress}%` }}
                                aria-valuenow={0}
                                aria-valuemin={0}
                                aria-valuemax={100}
                            />
                        </div>
                        <div style={{ fontSize: 13, marginBottom: 8 }}>{courseProgress}% complete</div>
                        <div
                            style={{ display: "flex", alignItems: "center", gap: 4 }}
                            onClick={isMyReview ? undefined : handleRatingClick}
                        >
                            {[1, 2, 3, 4, 5].map((star) =>
                                isMyReview ? (
                                    <Star key={star} size={16} color="#f5c518" fill={myReviewRating >= star ? "#f5c518" : "none"} />
                                ) : 0 >= star ? (
                                    <Star key={star} size={16} color="#f5c518" fill="#f5c518" />
                                ) : (
                                    <StarOff key={star} size={16} color="#f5c518" />
                                )
                            )}
                            <span style={{ fontSize: 13, marginLeft: 6 }}>
                                {isMyReview ? "Your rating" : "Leave a rating"}
                            </span>
                        </div>
                    </Card.Body>
                </Card>
            </Link>
            {/* Rating Modal */}
            <Modal show={showRatingModal} onHide={() => setShowRatingModal(false)} centered size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Rate this Course</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span key={star} style={{ cursor: "pointer" }} onClick={() => setRating(star)}>
                                {rating >= star ? (
                                    <Star size={24} color="#f5c518" fill="#f5c518" />
                                ) : (
                                    <StarOff size={24} color="#f5c518" />
                                )}
                            </span>
                        ))}
                    </div>
                    <Form.Group>
                        <Form.Label>Comment (Optional)</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Share your thoughts about this course..."
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowRatingModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSubmitRating} disabled={rating === 0 || isLoading}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </Col>
    );
};

export default CourseCard;
