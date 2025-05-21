"use client";

import { useState } from "react";
import {
    useAdminGetCategoriesQuery,
    useAdminUpdateCategoryMutation,
    useAdminDeleteCategoryMutation,
    useAdminCreateCategoryMutation,
} from "@/app/store/reducers/admin/api";
import { Grid } from "react-loader-spinner";
import { Container, Table, Button, Modal, Form } from "react-bootstrap";
import Pagination from "@/app/components/common/Pagination";
import { toast } from "react-toastify";
import { Category } from "@/app/models/category.interface";

const AdminAllCategories = () => {
    const [pageNumber, setPageNumber] = useState(1);
    const pageSize = 10;
    const [showEditModal, setShowEditModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    const { data, isLoading } = useAdminGetCategoriesQuery({ page: pageNumber, page_size: pageSize });
    const [updateCategory] = useAdminUpdateCategoryMutation();
    const [deleteCategory] = useAdminDeleteCategoryMutation();
    const [createCategory] = useAdminCreateCategoryMutation();

    const handleEdit = (category: Category) => {
        setSelectedCategory(category);
        setShowEditModal(true);
    };

    const handleDelete = async (categoryId: number) => {
        if (window.confirm("Are you sure you want to delete this category?")) {
            try {
                await deleteCategory(categoryId).unwrap();
                toast.success("Category deleted successfully");
            } catch (error) {
                toast.error("Failed to delete category");
            }
        }
    };

    const handleUpdateCategory = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedCategory) return;

        try {
            await updateCategory({
                id: selectedCategory.id,
                formData: {
                    name: selectedCategory.name,
                    description: selectedCategory.description,
                },
            }).unwrap();
            toast.success("Category updated successfully");
            setShowEditModal(false);
        } catch (error) {
            toast.error("Failed to update category");
        }
    };

    const handleCreateCategory = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedCategory) return;

        try {
            await createCategory({
                name: selectedCategory.name,
                description: selectedCategory.description,
            }).unwrap();
            toast.success("Category created successfully");
            setShowCreateModal(false);
            setSelectedCategory(null);
        } catch (error) {
            toast.error("Failed to create category");
        }
    };

    const filteredCategories = data?.results.filter(
        (category) =>
            category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            category.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="dashboard__main">
            <div className="dashboard__content bg-light-4">
                <div className="row pb-50 mb-10">
                    <div className="col-auto">
                        <h1 className="text-30 lh-12 fw-700">All Categories</h1>
                        <div className="mt-10">Manage platform categories</div>
                    </div>
                </div>

                <div className="row y-gap-30">
                    <Container>
                        <div className="d-flex justify-content-between mb-4">
                            <Form.Control
                                type="text"
                                placeholder="Search categories..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-auto"
                            />
                            <Button
                                variant="secondary"
                                onClick={() => {
                                    setSelectedCategory({
                                        id: 0,
                                        name: "",
                                        description: "",
                                        slug: "",
                                    });
                                    setShowCreateModal(true);
                                }}
                            >
                                Create Category
                            </Button>
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

                        {!isLoading && filteredCategories && filteredCategories.length === 0 && (
                            <div className="text-center">
                                <h4>No categories found.</h4>
                            </div>
                        )}

                        {!isLoading && (
                            <>
                                <Table striped bordered hover responsive>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Description</th>
                                            <th>Slug</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredCategories?.map((category) => (
                                            <tr key={category.id}>
                                                <td>{category.id}</td>
                                                <td>{category.name}</td>
                                                <td>{category.description}</td>
                                                <td>{category.slug}</td>
                                                <td>
                                                    <Button
                                                        variant="secondary"
                                                        size="sm"
                                                        className="me-2"
                                                        onClick={() => handleEdit(category)}
                                                    >
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        variant="danger"
                                                        size="sm"
                                                        onClick={() => handleDelete(category.id)}
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

            {/* Edit Category Modal */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedCategory && (
                        <Form onSubmit={handleUpdateCategory}>
                            <Form.Group className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    className="border"
                                    value={selectedCategory.name}
                                    onChange={(e) => setSelectedCategory({ ...selectedCategory, name: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    className="border"
                                    value={selectedCategory.description}
                                    onChange={(e) =>
                                        setSelectedCategory({ ...selectedCategory, description: e.target.value })
                                    }
                                />
                            </Form.Group>
                            <div className="d-flex gap-2 justify-content-end">
                                <Button variant="primary" type="submit">
                                    Save
                                </Button>
                                <Button variant="secondary" type="button" onClick={() => setShowEditModal(false)}>
                                    Close
                                </Button>
                            </div>
                        </Form>
                    )}
                </Modal.Body>
            </Modal>

            {/* Create Category Modal */}
            <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedCategory && (
                        <Form onSubmit={handleCreateCategory}>
                            <Form.Group className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    className="border"
                                    value={selectedCategory.name}
                                    onChange={(e) => setSelectedCategory({ ...selectedCategory, name: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    className="border"
                                    value={selectedCategory.description}
                                    onChange={(e) =>
                                        setSelectedCategory({ ...selectedCategory, description: e.target.value })
                                    }
                                />
                            </Form.Group>
                            <div className="d-flex gap-2 justify-content-end">
                                <Button variant="primary" type="submit">
                                    Create
                                </Button>
                                <Button variant="secondary" type="button" onClick={() => setShowCreateModal(false)}>
                                    Close
                                </Button>
                            </div>
                        </Form>
                    )}
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default AdminAllCategories;
