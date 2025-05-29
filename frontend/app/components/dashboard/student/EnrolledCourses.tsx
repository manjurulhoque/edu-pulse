"use client";

import { Card, Row, Col, ProgressBar } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";
import { Course } from "@/app/models/course.interface";
import { getCourseImagePath } from "@/app/utils/image-path";

interface EnrolledCoursesProps {
    courses: Course[];
    loading: boolean;
    error: any;
}

const EnrolledCourses = ({ courses, loading, error }: EnrolledCoursesProps) => {
    let progress = 0;
    return (
        <Row className="mb-4">
            <Col>
                <Card>
                    <Card.Header className="bg-white">
                        <h5 className="mb-0">My Courses</h5>
                    </Card.Header>
                    <Card.Body>
                        {loading && (
                            <div className="d-flex justify-content-center">
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        )}
                        {error && (
                            <div className="d-flex justify-content-center">
                                <div className="alert alert-danger">
                                    {error.message}
                                </div>
                            </div>
                        )}
                        {!loading && (
                            <Row className="g-4">
                                {courses.map((course) => (
                                    <Col md={4} key={course.id}>
                                        <Card className="h-100">
                                            <div className="position-relative" style={{ height: "200px" }}>
                                                <Image
                                                    src={getCourseImagePath(course)}
                                                    alt={course.title}
                                                    fill
                                                    style={{ objectFit: "cover" }}
                                                />
                                            </div>
                                            <Card.Body>
                                                <h6 className="card-title">{course.title}</h6>
                                                <p className="text-muted small mb-2">Instructor: {course.user.name}</p>
                                                <div className="mb-2">
                                                    <small className="text-muted">Progress</small>
                                                    <ProgressBar
                                                        now={progress}
                                                        label={`${progress}%`}
                                                        variant="success"
                                                    />
                                                </div>
                                                {/* <small className="text-muted">Last accessed: {course.lastAccessed}</small> */}
                                            </Card.Body>
                                            <Card.Footer className="bg-white">
                                                <Link
                                                    href={`/courses/${course.slug}/learn`}
                                                    className="btn btn-primary text-white btn-sm w-100"
                                                >
                                                    Continue Learning
                                                </Link>
                                            </Card.Footer>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        )}
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
};

export default EnrolledCourses;
