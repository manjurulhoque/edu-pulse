"use client";

import { Card, Row, Col, ProgressBar } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";

interface Course {
    id: number;
    title: string;
    instructor: string;
    progress: number;
    thumbnail: string;
    lastAccessed: string;
}

interface EnrolledCoursesProps {
    courses: Course[];
}

const EnrolledCourses = ({ courses }: EnrolledCoursesProps) => {
    return (
        <Row className="mb-4">
            <Col>
                <Card>
                    <Card.Header className="bg-white">
                        <h5 className="mb-0">My Courses</h5>
                    </Card.Header>
                    <Card.Body>
                        <Row className="g-4">
                            {courses.map((course) => (
                                <Col md={4} key={course.id}>
                                    <Card className="h-100">
                                        <div className="position-relative" style={{ height: "200px" }}>
                                            <Image
                                                src={course.thumbnail}
                                                alt={course.title}
                                                fill
                                                style={{ objectFit: "cover" }}
                                            />
                                        </div>
                                        <Card.Body>
                                            <h6 className="card-title">{course.title}</h6>
                                            <p className="text-muted small mb-2">Instructor: {course.instructor}</p>
                                            <div className="mb-2">
                                                <small className="text-muted">Progress</small>
                                                <ProgressBar
                                                    now={course.progress}
                                                    label={`${course.progress}%`}
                                                    variant="success"
                                                />
                                            </div>
                                            <small className="text-muted">Last accessed: {course.lastAccessed}</small>
                                        </Card.Body>
                                        <Card.Footer className="bg-white">
                                            <Link
                                                href={`/student/courses/${course.id}`}
                                                className="btn btn-primary btn-sm w-100"
                                            >
                                                Continue Learning
                                            </Link>
                                        </Card.Footer>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
};

export default EnrolledCourses;
