"use client";

import {
    useGetCartQuery,
    useRemoveFromCartMutation,
    useClearCartMutation,
} from "@/app/store/reducers/cart/api";
import Image from "next/image";
import { toast } from "react-toastify";
import { useAuthRedirect } from "@/app/hooks/useAuthRedirect";
import { Grid } from "react-loader-spinner";

export default function CartPage() {
    const { session } = useAuthRedirect();
    const { data: cart, isLoading } = useGetCartQuery(null);
    const [removeFromCart] = useRemoveFromCartMutation();
    const [clearCart] = useClearCartMutation();

    if (!session?.user) {
        return null;
    }

    const handleRemoveItem = async (courseId: number) => {
        try {
            await removeFromCart(courseId).unwrap();
            toast.success("Item removed from cart");
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to remove item");
        }
    };

    const handleClearCart = async () => {
        try {
            await clearCart().unwrap();
            toast.success("Cart cleared successfully");
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to clear cart");
        }
    };

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
                <section className="page-header -type-1">
                </section>

                <section className="layout-pt-md layout-pb-lg">
                    <div className="container py-10 mt-20">
                        <h1 className="text-24 fw-600 mb-30">Shopping Cart</h1>

                        {isLoading ? (
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
                                    height="80"
                                    width="80"
                                    color="#4fa94d"
                                    ariaLabel="grid-loading"
                                    radius="12.5"
                                    wrapperStyle={{}}
                                    wrapperClass="grid-wrapper"
                                />
                            </div>
                        ) : cart?.items.length === 0 ? (
                            <div className="text-center py-20">
                                <p>Your cart is empty</p>
                            </div>
                        ) : (
                            <div className="row y-gap-30">
                                <div className="col-lg-8">
                                    {cart?.items.map((item) => (
                                        <div
                                            key={item.id}
                                            className="border rounded-8 p-20 mb-20"
                                        >
                                            <div className="row y-gap-20 justify-between">
                                                <div className="col-md-3">
                                                    <Image
                                                        width={200}
                                                        height={120}
                                                        src={`${process.env.BACKEND_BASE_URL}/${item.course?.preview_image}`}
                                                        alt={
                                                            item.course
                                                                ?.title || ""
                                                        }
                                                        className="rounded-8 w-1/1"
                                                    />
                                                </div>
                                                <div className="col-md-6">
                                                    <h3 className="text-18 fw-500">
                                                        {item.course?.title}
                                                    </h3>
                                                </div>
                                                <div className="col-md-3 text-right">
                                                    <div className="text-18 fw-600 text-dark-1 mb-10">
                                                        {item.course?.is_free
                                                            ? "Free"
                                                            : `$${item.course?.discounted_price}`}
                                                    </div>
                                                    <button
                                                        onClick={() =>
                                                            handleRemoveItem(
                                                                item.course?.id
                                                            )
                                                        }
                                                        className="text-red-1 underline"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="col-lg-4">
                                    <div className="border rounded-8 p-20">
                                        <h3 className="text-20 fw-600 mb-20">
                                            Cart Summary
                                        </h3>
                                        <div className="d-flex justify-between mb-20">
                                            <span>Total:</span>
                                            <span className="text-20 fw-600">
                                                ${totalAmount}
                                            </span>
                                        </div>
                                        <button className="button -md -dark-1 text-white w-1/1 mb-10">
                                            Checkout
                                        </button>
                                        <button
                                            onClick={handleClearCart}
                                            className="button -md -outline-red-1 text-red-1 w-1/1"
                                        >
                                            Clear Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
}
