"use client";

import { Form, Button, Card, Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useMeQuery, useUpdateProfileMutation } from "@/app/store/reducers/user/api";
import { User } from "@/app/models/user.interface";
import { toast } from "react-toastify";

const UserProfile = () => {
    const [formData, setFormData] = useState<
        Omit<User, "id" | "created_at" | "is_admin" | "is_instructor" | "is_active">
    >({
        name: "",
        email: "",
        bio: "",
        website: "",
        avatar: "",
    });

    const { data: userResponse, isLoading: isLoadingUser } = useMeQuery();
    const user = userResponse?.data;
    const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name,
                email: user.email,
                bio: user.bio,
                website: user.website,
                avatar: user.avatar,
            });
        }
    }, [user]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateProfile(formData)
            .unwrap()
            .then(() => {
                toast.success("Profile updated successfully!");
            })
            .catch((error) => {
                toast.error(error.message || "Failed to update profile");
            });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    if (isLoadingUser) {
        return (
            <Container style={{ marginTop: "100px" }}>
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </Container>
        );
    }

    return (
        <Container style={{ marginTop: "100px" }}>
            <Card className="p-4">
                <Card.Title className="mb-4">Update Profile</Card.Title>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name="name" className="border" value={formData.name} onChange={handleChange} required />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            className="border"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Bio</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            placeholder="Tell us about yourself"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Website</Form.Label>
                        <Form.Control
                            type="url"
                            name="website"
                            value={formData.website}
                            onChange={handleChange}
                            placeholder="https://your-website.com"
                        />
                    </Form.Group>

                    {/* <Form.Group className="mb-3">
                        <Form.Label>Avatar URL</Form.Label>
                        <Form.Control
                            type="url"
                            name="avatar"
                            value={formData.avatar}
                            onChange={handleChange}
                            placeholder="https://example.com/avatar.png"
                        />
                    </Form.Group> */}
                    <div className="d-flex justify-content-end">
                        <Button variant="primary" type="submit" disabled={isUpdating}>
                            {isUpdating ? "Updating..." : "Update Profile"}
                        </Button>
                    </div>
                </Form>
            </Card>
        </Container>
    );
};

export default UserProfile;
