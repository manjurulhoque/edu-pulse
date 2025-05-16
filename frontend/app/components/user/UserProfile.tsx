"use client";

import { Form, Button, Card, Alert } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useMeQuery, useUpdateProfileMutation } from "@/app/store/reducers/user/api";
import { User } from "@/app/models/user.interface";

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
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");

    const { data: user, isLoading: isLoadingUser } = useMeQuery();
    const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

    useEffect(() => {
        if (user) {
            setFormData(user);
        }
    }, [user]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateProfile({ ...formData })
            .unwrap()
            .then(() => {
                setSuccess("Profile updated successfully!");
                setError("");
            })
            .catch((error) => setError(error.message));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    if (isLoadingUser) {
        return <div>Loading...</div>;
    }

    return (
        <Card className="p-4">
            <Card.Title className="mb-4">Update Profile</Card.Title>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
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

                <Form.Group className="mb-3">
                    <Form.Label>Avatar URL</Form.Label>
                    <Form.Control
                        type="url"
                        name="avatar"
                        value={formData.avatar}
                        onChange={handleChange}
                        placeholder="https://example.com/avatar.png"
                    />
                </Form.Group>

                <Button variant="primary" type="submit" disabled={isUpdating}>
                    {isUpdating ? "Updating..." : "Update Profile"}
                </Button>
            </Form>
        </Card>
    );
};

export default UserProfile;
