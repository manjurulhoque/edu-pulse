import CheckoutForm from "@/app/components/checkout/CheckoutForm";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Checkout",
    description: "Checkout page",
};

const CheckoutPage = () => {
    return <CheckoutForm />;
};

export default CheckoutPage;
