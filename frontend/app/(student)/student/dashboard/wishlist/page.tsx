import Wishlist from "@/app/components/dashboard/wishlist/Wishlist";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Wishlist | EduPulse - Professional LMS Online Education Course",
};

const WishlistPage = () => {
    return <Wishlist />;
};

export default WishlistPage;
