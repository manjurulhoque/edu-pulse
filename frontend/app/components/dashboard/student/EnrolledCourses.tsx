"use client";

import { Card, Row, Col } from "react-bootstrap";
import { Course } from "@/app/models/course.interface";
import EnrolledCourseCard from "./EnrolledCourseCard";

interface EnrolledCoursesProps {
    courses: Course[];
    loading: boolean;
    error: any;
}

const EnrolledCourses = ({ courses, loading, error }: EnrolledCoursesProps) => {
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
                                    <EnrolledCourseCard key={course.id} course={course} />
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
