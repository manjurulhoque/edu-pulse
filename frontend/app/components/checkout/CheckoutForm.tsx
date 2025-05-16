"use client";

import { useEffect, useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import styles from "./CheckoutForm.module.css";
import { useCreateCheckoutMutation, useGetCartQuery } from "@/app/store/reducers/cart/api";
import { useAuthRedirect } from "@/app/hooks/useAuthRedirect";
import { getCourseImagePath } from "@/app/utils/image-path";
import Image from "next/image";

const CheckoutForm = () => {
    const { session } = useAuthRedirect();
    const { data: cart, isLoading } = useGetCartQuery(null);
    const [isMounted, setIsMounted] = useState(false);

    if (!session?.user) {
        return null;
    }

    const router = useRouter();
    const totalAmount =
        cart?.items.reduce((sum, item) => sum + (item.course?.is_free ? 0 : item.course?.discounted_price || 0), 0) ||
        0;

    const [formData, setFormData] = useState({
        fullName: "",
        email: session?.user?.email || "",
        address: "",
        city: "",
        country: "",
        zipCode: "",
    });
    const [createCheckout, { isLoading: isCheckoutLoading }] = useCreateCheckoutMutation();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await createCheckout({
                full_name: formData.fullName,
                address: formData.address,
                city: formData.city,
                country: formData.country,
                zip_code: formData.zipCode,
            }).unwrap();
            toast.success("Courses purchased successfully!");
            router.push("/student/dashboard/my-courses");
        } catch (error) {
            toast.error("Failed to complete checkout. Please try again.");
        } finally {
        }
    };

    return (
        <div className="main-content">
            <div className="content-wrapper js-content-wrapper overflow-hidden">
                <section className="page-header -type-1"></section>

                <section className="layout-pt-md layout-pb-lg">
                    <div className="container py-10 mt-20">
                        <div className="row">
                            <div className="col-lg-8">
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
                                                    className={`form-control-lg ${styles.formControl}`}
                                                    placeholder="Enter your full name"
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
                                                    disabled
                                                    className={`form-control-lg ${styles.formControl}`}
                                                    placeholder="Enter your email"
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
                                                    className={`form-control-lg ${styles.formControl}`}
                                                    placeholder="Enter your address"
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
                                                            className={`form-control-lg ${styles.formControl}`}
                                                            placeholder="Enter your city"
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
                                                            className={`form-control-lg ${styles.formControl}`}
                                                            placeholder="Enter your country"
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
                                                    className={`form-control-lg ${styles.formControl}`}
                                                    placeholder="Enter your ZIP code"
                                                />
                                            </Form.Group>

                                            <Button
                                                variant="primary"
                                                type="submit"
                                                disabled={isCheckoutLoading}
                                                className="w-100 btn-lg"
                                            >
                                                {isCheckoutLoading ? "Processing..." : "Complete Purchase"}
                                            </Button>
                                        </Form>
                                    </Card.Body>
                                </Card>
                            </div>
                            <div className="col-lg-4">
                                <div className="card">
                                    <div className="card-header">
                                        <h3>Order Summary</h3>
                                    </div>
                                    <div className="card-body">
                                        {cart?.items.map((item) => (
                                            <div key={item.id} className="mb-3">
                                                <div className="d-flex align-items-center">
                                                    <Image
                                                        src={getCourseImagePath(item.course)}
                                                        alt={item.course.title}
                                                        className="rounded"
                                                        width={60}
                                                        height={40}
                                                        style={{
                                                            objectFit: "cover",
                                                            height: "auto",
                                                        }}
                                                    />
                                                    <div className="ms-3">
                                                        <h6 className="mb-0">{item.course.title}</h6>
                                                        <small className="text-muted">
                                                            ${item.course.discounted_price}
                                                        </small>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        <hr />
                                        <div className="d-flex justify-content-between mb-2">
                                            <span>Subtotal:</span>
                                            <span>${totalAmount.toFixed(2)}</span>
                                        </div>
                                        <div className="d-flex justify-content-between mb-2">
                                            <span>Tax:</span>
                                            <span>$0.00</span>
                                        </div>
                                        <hr />
                                        <div className="d-flex justify-content-between">
                                            <strong>Total:</strong>
                                            <strong>${totalAmount.toFixed(2)}</strong>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default CheckoutForm;
