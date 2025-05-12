"use client";

import { Card, Row, Col } from "react-bootstrap";

interface StatsData {
    enrolledCourses: number;
    completedCourses: number;
    certificates: number;
    totalHours: number;
}

interface StatsCardsProps {
    stats: StatsData;
}

const StatsCards = ({ stats }: StatsCardsProps) => {
    return (
        <Row className="g-4 mb-4">
            <Col md={3}>
                <Card className="h-100">
                    <Card.Body>
                        <h6 className="text-muted mb-2">Enrolled Courses</h6>
                        <h3 className="mb-0">{stats.enrolledCourses}</h3>
                    </Card.Body>
                </Card>
            </Col>
            <Col md={3}>
                <Card className="h-100">
                    <Card.Body>
                        <h6 className="text-muted mb-2">Completed Courses</h6>
                        <h3 className="mb-0">{stats.completedCourses}</h3>
                    </Card.Body>
                </Card>
            </Col>
            <Col md={3}>
                <Card className="h-100">
                    <Card.Body>
                        <h6 className="text-muted mb-2">Certificates</h6>
                        <h3 className="mb-0">{stats.certificates}</h3>
                    </Card.Body>
                </Card>
            </Col>
            <Col md={3}>
                <Card className="h-100">
                    <Card.Body>
                        <h6 className="text-muted mb-2">Total Hours</h6>
                        <h3 className="mb-0">{stats.totalHours}</h3>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
};

export default StatsCards;
