"use client";

import { useState } from "react";
import { Tabs, Tab, Card, Form, Table, Button, InputGroup } from "react-bootstrap";
import { useAdminRedirect } from "@/app/hooks/useAdminRedirect";

// Mock data - Replace with actual API calls
const mockUsers = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "student", status: "active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "instructor", status: "pending" },
];

const mockCourses = [
    { id: 1, title: "Introduction to Python", instructor: "John Doe", status: "pending" },
    { id: 2, title: "Advanced React", instructor: "Jane Smith", status: "approved" },
];

const mockReports = [
    { id: 1, type: "course", title: "Introduction to Python", reason: "Inappropriate content", status: "pending" },
    { id: 2, type: "user", title: "John Doe", reason: "Spam behavior", status: "resolved" },
];

export default function AdminDashboard() {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState("users");
    const { session, status } = useAdminRedirect();

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    return (
        <div className="container py-4">
            <h1 className="mb-4">Admin Dashboard</h1>

            <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k || "users")} className="mb-4">
                <Tab eventKey="users" title="User Management">
                    <Card>
                        <Card.Header>
                            <Card.Title>User Management</Card.Title>
                            <div className="d-flex gap-3">
                                <Form.Control
                                    type="text"
                                    placeholder="Search users..."
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    className="w-25"
                                />
                                <Form.Select className="w-25">
                                    <option value="all">All Roles</option>
                                    <option value="student">Students</option>
                                    <option value="instructor">Instructors</option>
                                </Form.Select>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {mockUsers.map((user) => (
                                        <tr key={user.id}>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.role}</td>
                                            <td>{user.status}</td>
                                            <td>
                                                <Button variant="outline-primary" size="sm" className="me-2">
                                                    Edit
                                                </Button>
                                                <Button variant="outline-danger" size="sm">
                                                    Delete
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Tab>

                <Tab eventKey="courses" title="Course Moderation">
                    <Card>
                        <Card.Header>
                            <Card.Title>Course Moderation</Card.Title>
                            <div className="d-flex gap-3">
                                <Form.Control
                                    type="text"
                                    placeholder="Search courses..."
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    className="w-25"
                                />
                                <Form.Select className="w-25">
                                    <option value="all">All Status</option>
                                    <option value="pending">Pending</option>
                                    <option value="approved">Approved</option>
                                    <option value="rejected">Rejected</option>
                                </Form.Select>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Instructor</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {mockCourses.map((course) => (
                                        <tr key={course.id}>
                                            <td>{course.title}</td>
                                            <td>{course.instructor}</td>
                                            <td>{course.status}</td>
                                            <td>
                                                <Button variant="outline-primary" size="sm" className="me-2">
                                                    Review
                                                </Button>
                                                <Button variant="outline-danger" size="sm">
                                                    Reject
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Tab>

                <Tab eventKey="reports" title="Reported Content">
                    <Card>
                        <Card.Header>
                            <Card.Title>Reported Content</Card.Title>
                            <div className="d-flex gap-3">
                                <Form.Control
                                    type="text"
                                    placeholder="Search reports..."
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    className="w-25"
                                />
                                <Form.Select className="w-25">
                                    <option value="all">All Types</option>
                                    <option value="course">Courses</option>
                                    <option value="user">Users</option>
                                </Form.Select>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Type</th>
                                        <th>Title</th>
                                        <th>Reason</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {mockReports.map((report) => (
                                        <tr key={report.id}>
                                            <td>{report.type}</td>
                                            <td>{report.title}</td>
                                            <td>{report.reason}</td>
                                            <td>{report.status}</td>
                                            <td>
                                                <Button variant="outline-primary" size="sm" className="me-2">
                                                    Review
                                                </Button>
                                                <Button variant="outline-danger" size="sm">
                                                    Dismiss
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Tab>
            </Tabs>
        </div>
    );
}
