"use client";

import { Card, Row, Col } from "react-bootstrap";

interface Activity {
    id: number;
    type: "course_progress" | "certificate" | "enrollment";
    course: string;
    description: string;
    time: string;
}

interface RecentActivityProps {
    activities: Activity[];
}

const RecentActivity = ({ activities }: RecentActivityProps) => {
    const getActivityIcon = (type: Activity["type"]) => {
        switch (type) {
            case "course_progress":
                return "bi-book";
            case "certificate":
                return "bi-award";
            case "enrollment":
                return "bi-plus-circle";
            default:
                return "bi-circle";
        }
    };

    return (
        <Row>
            <Col>
                <Card>
                    <Card.Header className="bg-white">
                        <h5 className="mb-0">Recent Activity</h5>
                    </Card.Header>
                    <Card.Body>
                        {activities.map((activity) => (
                            <div key={activity.id} className="d-flex align-items-center mb-3 pb-3 border-bottom">
                                <div className="flex-shrink-0">
                                    <div
                                        className="rounded-circle d-flex align-items-center justify-content-center"
                                        style={{
                                            width: "40px",
                                            height: "40px",
                                            backgroundColor: "#e9ecef",
                                        }}
                                    >
                                        <i className={`bi ${getActivityIcon(activity.type)}`}></i>
                                    </div>
                                </div>
                                <div className="flex-grow-1 ms-3">
                                    <h6 className="mb-1">{activity.course}</h6>
                                    <p className="mb-0 text-muted small">{activity.description}</p>
                                </div>
                                <div className="text-muted small">{activity.time}</div>
                            </div>
                        ))}
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
};

export default RecentActivity;
