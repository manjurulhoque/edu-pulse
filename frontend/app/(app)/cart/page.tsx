import Cart from "@/app/components/cart/Cart";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Cart | EduPulse - Professional LMS Online Education Course",
    description: "Cart page",
};

export default function CartPage() {
    return <Cart />;
}
