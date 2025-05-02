"use client";

import { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface CheckoutFormProps {
    courseIds: number[];
    totalPrice: number;
}

const CheckoutForm = ({ courseIds, totalPrice }: CheckoutFormProps) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        address: "",
        city: "",
        country: "",
        zipCode: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch("/api/checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    courseIds,
                    ...formData,
                }),
            });

            if (!response.ok) {
                throw new Error("Checkout failed");
            }

            const data = await response.json();
            toast.success("Courses purchased successfully!");
            router.push("/dashboard/my-courses");
        } catch (error) {
            toast.error("Failed to complete checkout. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="mb-4">
            <Card.Header>
                <h3>Checkout Information</h3>
            </Card.Header>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <div className="row">
                        <div className="col-md-6">
                            <Form.Group className="mb-3">
                                <Form.Label>City</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </div>
                        <div className="col-md-6">
                            <Form.Group className="mb-3">
                                <Form.Label>Country</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="country"
                                    value={formData.country}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </div>
                    </div>

                    <Form.Group className="mb-3">
                        <Form.Label>ZIP Code</Form.Label>
                        <Form.Control
                            type="text"
                            name="zipCode"
                            value={formData.zipCode}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Button
                        variant="primary"
                        type="submit"
                        disabled={isLoading}
                        className="w-100"
                    >
                        {isLoading ? "Processing..." : "Complete Purchase"}
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default CheckoutForm;
