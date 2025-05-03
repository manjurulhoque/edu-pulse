"use client";

import CheckoutForm from "@/app/components/checkout/CheckoutForm";
import { useGetCartQuery } from "@/app/store/reducers/cart/api";
import { useAuthRedirect } from "@/app/hooks/useAuthRedirect";


const CheckoutPage = () => {
    const { session } = useAuthRedirect();
    const { data: cart, isLoading } = useGetCartQuery(null);

    if (!session?.user) {
        return null;
    }

    const totalAmount =
        cart?.items.reduce(
            (sum, item) =>
                sum +
                (item.course?.is_free ? 0 : item.course?.discounted_price || 0),
            0
        ) || 0;

    return (
        <div className="main-content">
            <div className="content-wrapper js-content-wrapper overflow-hidden">
                <section className="page-header -type-1"></section>

                <section className="layout-pt-md layout-pb-lg">
                    <div className="container py-10 mt-20">
                        <div className="row">
                            <div className="col-lg-8">
                                <CheckoutForm
                                    courseIds={cart?.items.map(
                                        (item) => item.course.id
                                    ) || []}
                                    totalPrice={totalAmount}
                                />
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
                                                    <img
                                                        src={item.course.preview_image}
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
                                                            ${item.course.discounted_price}
                                                        </small>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        <hr />
                                        <div className="d-flex justify-content-between mb-2">
                                            <span>Subtotal:</span>
                                            <span>${totalAmount}</span>
                                        </div>
                                        <div className="d-flex justify-content-between mb-2">
                                            <span>Tax:</span>
                                            <span>$0.00</span>
                                        </div>
                                        <hr />
                                        <div className="d-flex justify-content-between">
                                            <strong>Total:</strong>
                                            <strong>${totalAmount}</strong>
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
