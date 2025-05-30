import { Form, Button, Card, Container } from "react-bootstrap";

const UserProfileSkeleton = () => {
    return (
        <Container style={{ marginTop: "100px" }}>
            <Card className="p-4">
                <Card.Title className="mb-4">Update Profile</Card.Title>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter your name" disabled />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter your email" disabled />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Bio</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="Tell us about yourself" disabled />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Website</Form.Label>
                        <Form.Control type="url" placeholder="https://your-website.com" disabled />
                    </Form.Group>

                    <div className="d-flex justify-content-end">
                        <Button variant="primary" type="submit" disabled>
                            Update profile
                        </Button>
                    </div>
                </Form>
            </Card>
        </Container>
    );
};

export default UserProfileSkeleton;
