"use client";

import { Col, Card } from "react-bootstrap";
import { getCourseImagePath } from "@/app/utils/image-path";
import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Course } from "@/app/models/course.interface";
import { Wishlist } from "@/app/models/wishlist.interface";
import { useRemoveFromWishlistMutation } from "@/app/store/reducers/wishlist/api";
import { toast } from "react-toastify";

const WishlistCourseCard = ({
    course,
    wishlist,
    refetchWishlist,
}: {
    course: Course;
    wishlist: Wishlist;
    refetchWishlist: () => void;
}) => {
    const [removeFromWishlist] = useRemoveFromWishlistMutation();

    const handleRemoveFromWishlist = async () => {
        try {
            await removeFromWishlist({ course_id: wishlist.course_id }).unwrap();
            refetchWishlist();
            toast.success("Course removed from wishlist");
        } catch (error) {
            toast.error("Failed to remove course from wishlist");
        }
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
                                handleRemoveFromWishlist();
                            }}
                        >
                            <Heart size={24} />
                        </div>
                    </div>
                    <Card.Body>
                        <Card.Title>{course.title}</Card.Title>
                        <div className="text-muted" style={{ fontSize: 14, marginBottom: 4 }}>
                            {course.user.name}
                        </div>
                    </Card.Body>
                </Card>
            </Link>
        </Col>
    );
};

export default WishlistCourseCard;
