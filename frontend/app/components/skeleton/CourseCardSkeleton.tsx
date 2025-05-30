import { Col, Card, Placeholder } from "react-bootstrap";

const CourseCardSkeleton = () => {
    return (
        <Col xs={12} md={6} lg={3}>
            <Card className="h-100 position-relative">
                {/* Image Placeholder */}
                <div style={{ position: "relative", height: "200px", backgroundColor: "#eee" }} />

                <Card.Body>
                    <Card.Title>
                        <Placeholder as="span" animation="wave">
                            <Placeholder xs={8} />
                        </Placeholder>
                    </Card.Title>

                    <div className="text-muted mb-2" style={{ fontSize: 14 }}>
                        <Placeholder as="span" animation="wave">
                            <Placeholder xs={5} />
                        </Placeholder>
                    </div>

                    {/* Progress bar skeleton */}
                    <div className="progress mb-2" style={{ height: 6 }}>
                        <div
                            className="progress-bar bg-secondary"
                            role="progressbar"
                            style={{ width: `50%` }}
                            aria-valuenow={0}
                            aria-valuemin={0}
                            aria-valuemax={100}
                        />
                    </div>

                    <div style={{ fontSize: 13, marginBottom: 8 }}>
                        <Placeholder xs={4} animation="wave" />
                    </div>

                    {/* Rating Placeholder */}
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div
                                key={i}
                                style={{
                                    width: 16,
                                    height: 16,
                                    borderRadius: "50%",
                                    backgroundColor: "#ccc",
                                }}
                            />
                        ))}
                        <Placeholder xs={4} animation="wave" />
                    </div>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default CourseCardSkeleton;
