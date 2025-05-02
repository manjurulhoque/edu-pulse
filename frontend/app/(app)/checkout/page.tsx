"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CheckoutForm from "@/app/components/checkout/CheckoutForm";
import { Spinner, Alert } from "react-bootstrap";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/authOptions";

interface Course {
    id: number;
    title: string;
    price: number;
    preview_image: string;
}

interface CartItem {
    id: number;
    course: Course;
}

const CheckoutPage = () => {
    const router = useRouter();
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/cart/`,
                    {
                        credentials: "include",
                    }
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch cart");
                }
                const data = await response.json();
                setCartItems(data.data.items || []);
            } catch (err) {
                setError("Failed to load cart items");
            } finally {
                setIsLoading(false);
            }
        };

        fetchCart();
    }, []);

    const totalPrice = cartItems.reduce(
        (sum, item) => sum + item.course.price,
        0
    );

    if (isLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center min-vh-100">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container py-5">
                <Alert variant="danger">{error}</Alert>
            </div>
        );
    }

    if (cartItems.length === 0) {
        return (
            <div className="container py-5">
                <Alert variant="info">
                    Your cart is empty. <a href="/courses">Browse courses</a>
                </Alert>
            </div>
        );
    }

    return (
        <div className="main-content">
            <div className="content-wrapper js-content-wrapper overflow-hidden">
                <section className="page-header -type-1"></section>

                <section className="layout-pt-md layout-pb-lg">
                    <div className="container py-10 mt-20">
                        <div className="row">
                            <div className="col-lg-8">
                                <CheckoutForm
                                    courseIds={cartItems.map(
                                        (item) => item.course.id
                                    )}
                                    totalPrice={totalPrice}
                                />
                            </div>
                            <div className="col-lg-4">
                                <div className="card">
                                    <div className="card-header">
                                        <h3>Order Summary</h3>
                                    </div>
                                    <div className="card-body">
                                        {cartItems.map((item) => (
                                            <div key={item.id} className="mb-3">
                                                <div className="d-flex align-items-center">
                                                    <img
                                                        src={
                                                            item.course
                                                                .preview_image
                                                        }
                                                        alt={item.course.title}
                                                        className="rounded"
                                                        style={{
                                                            width: "60px",
                                                            height: "40px",
                                                            objectFit: "cover",
                                                        }}
                                                    />
                                                    <div className="ms-3">
                                                        <h6 className="mb-0">
                                                            {item.course.title}
                                                        </h6>
                                                        <small className="text-muted">
                                                            ${item.course.price}
                                                        </small>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        <hr />
                                        <div className="d-flex justify-content-between mb-2">
                                            <span>Subtotal:</span>
                                            <span>${totalPrice}</span>
                                        </div>
                                        <div className="d-flex justify-content-between mb-2">
                                            <span>Tax:</span>
                                            <span>$0.00</span>
                                        </div>
                                        <hr />
                                        <div className="d-flex justify-content-between">
                                            <strong>Total:</strong>
                                            <strong>${totalPrice}</strong>
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

export default CheckoutPage;
