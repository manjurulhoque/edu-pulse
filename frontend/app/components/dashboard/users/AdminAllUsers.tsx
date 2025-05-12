"use client";

import { useState } from "react";
import {
    useAdminGetUsersQuery,
    useAdminUpdateUserMutation,
    useAdminDeleteUserMutation,
} from "@/app/store/reducers/admin/api";
import { Grid } from "react-loader-spinner";
import { Container, Table, Button, Modal, Form } from "react-bootstrap";
import Pagination from "@/app/components/common/Pagination";
import { toast } from "react-toastify";

const AdminAllUsers = () => {
    const [pageNumber, setPageNumber] = useState(1);
    const pageSize = 10;
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [searchQuery, setSearchQuery] = useState("");

    const { data, isLoading } = useAdminGetUsersQuery({ page: pageNumber, page_size: pageSize });
    const [updateUser] = useAdminUpdateUserMutation();
    const [deleteUser] = useAdminDeleteUserMutation();

    const handleEdit = (user: any) => {
        setSelectedUser(user);
        setShowEditModal(true);
    };

    const handleDelete = async (userId: number) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                await deleteUser(userId).unwrap();
                toast.success("User deleted successfully");
            } catch (error) {
                toast.error("Failed to delete user");
            }
        }
    };

    const handleUpdateUser = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await updateUser({
                id: selectedUser.id,
                formData: {
                    name: selectedUser.name,
                    email: selectedUser.email,
                    is_active: selectedUser.is_active,
                    is_admin: selectedUser.is_admin,
                    is_instructor: selectedUser.is_instructor,
                },
            }).unwrap();
            toast.success("User updated successfully");
            setShowEditModal(false);
        } catch (error) {
            toast.error("Failed to update user");
        }
    };

    const filteredUsers = data?.results.filter(
        (user) =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="dashboard__main">
            <div className="dashboard__content bg-light-4">
                <div className="row pb-50 mb-10">
                    <div className="col-auto">
                        <h1 className="text-30 lh-12 fw-700">All Users</h1>
                        <div className="mt-10">Manage platform users and their permissions</div>
                    </div>
                </div>

                <div className="row y-gap-30">
                    <Container>
                        <div className="mb-4">
                            <Form.Control
                                type="text"
                                placeholder="Search users..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-auto"
                            />
                        </div>

                        <div
                            style={{
                                display: isLoading ? "flex" : "none",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "100vh",
                            }}
                        >
                            <Grid
                                visible={isLoading}
                                height="60"
                                width="60"
                                color="#4fa94d"
                                ariaLabel="grid-loading"
                                radius="12.5"
                                wrapperStyle={{}}
                                wrapperClass="grid-wrapper"
                            />
                        </div>

                        {!isLoading && filteredUsers && filteredUsers.length === 0 && (
                            <div className="text-center">
                                <h4>No users found.</h4>
                            </div>
                        )}

                        {!isLoading && (
                            <>
                                <Table striped bordered hover responsive>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Role</th>
                                            <th>Status</th>
                                            <th>Created At</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredUsers?.map((user) => (
                                            <tr key={user.id}>
                                                <td>{user.id}</td>
                                                <td>{user.name}</td>
                                                <td>{user.email}</td>
                                                <td>
                                                    {user.is_admin
                                                        ? "Admin"
                                                        : user.is_instructor
                                                        ? "Instructor"
                                                        : "Student"}
                                                </td>
                                                <td>
                                                    <span
                                                        className={`badge ${
                                                            user.is_active ? "bg-success" : "bg-danger"
                                                        }`}
                                                    >
                                                        {user.is_active ? "Active" : "Inactive"}
                                                    </span>
                                                </td>
                                                <td>{new Date(user.created_at).toLocaleDateString()}</td>
                                                <td>
                                                    <Button
                                                        variant="primary"
                                                        size="sm"
                                                        className="me-2"
                                                        onClick={() => handleEdit(user)}
                                                    >
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        variant="danger"
                                                        size="sm"
                                                        onClick={() => handleDelete(user.id)}
                                                    >
                                                        Delete
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>

                                <div className="row justify-center pt-90 lg:pt-50">
                                    <div className="col-auto">
                                        <Pagination
                                            pageNumber={pageNumber}
                                            setPageNumber={setPageNumber}
                                            data={data as any}
                                        />
                                    </div>
                                </div>
                            </>
                        )}
                    </Container>
                </div>
            </div>

            {/* Edit User Modal */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedUser && (
                        <Form onSubmit={handleUpdateUser}>
                            <Form.Group className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    className="border"
                                    value={selectedUser.name}
                                    onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    className="border"
                                    value={selectedUser.email}
                                    onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Label>Other</Form.Label>
                            <Form.Group className="mb-3">
                                <Form.Check
                                    type="checkbox"
                                    label="Active"
                                    checked={selectedUser.is_active}
                                    onChange={(e) => setSelectedUser({ ...selectedUser, is_active: e.target.checked })}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Check
                                    type="checkbox"
                                    label="Admin"
                                    checked={selectedUser.is_admin}
                                    onChange={(e) => setSelectedUser({ ...selectedUser, is_admin: e.target.checked })}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Check
                                    type="checkbox"
                                    label="Instructor"
                                    checked={selectedUser.is_instructor}
                                    onChange={(e) =>
                                        setSelectedUser({ ...selectedUser, is_instructor: e.target.checked })
                                    }
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Save Changes
                            </Button>
                        </Form>
                    )}
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default AdminAllUsers;
