"use client";

import { useGetEnrolledCoursesQuery } from "@/app/store/reducers/courses/api";
import { Card, Container, Row, Col, Spinner } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";

const MyCourses = () => {
    const {
        data: courses,
        isLoading,
        error,
    } = useGetEnrolledCoursesQuery(null);

    if (isLoading) {
        return (
            <div
                className="d-flex justify-content-center align-items-center"
                style={{ minHeight: "400px" }}
            >
                <Spinner animation="border" variant="primary" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-danger">
                Error loading courses. Please try again later.
            </div>
        );
    }

    if (!courses || courses.length === 0) {
        return (
            <div className="text-center">
                <h4>You haven't enrolled in any courses yet.</h4>
                <Link href="/courses" className="btn btn-primary mt-3">
                    Browse Courses
                </Link>
            </div>
        );
    }

    return (
        <Container>
            <Row className="g-4">
                {courses.map((course) => (
                    <Col key={course.id} xs={12} md={6} lg={4}>
                        <Link
                            href={`/course/${course.slug}`}
                            className="text-decoration-none"
                        >
                            <Card className="h-100">
                                <div
                                    style={{
                                        position: "relative",
                                        height: "200px",
                                    }}
                                >
                                    <Image
                                        src={
                                            course.preview_image ||
                                            "/placeholder-course.jpg"
                                        }
                                        alt={course.title}
                                        fill
                                        style={{ objectFit: "cover" }}
                                    />
                                </div>
                                <Card.Body>
                                    <Card.Title>{course.title}</Card.Title>
                                    <Card.Text className="text-muted">
                                        {course.description?.slice(0, 100)}...
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default MyCourses;
