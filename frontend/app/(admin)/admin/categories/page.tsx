import AdminAllCategories from "@/app/components/dashboard/categories/AdminAllCategories";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "All Categories | EduPulse - Professional LMS Online Education Course",
    description:
        "Manage your platform categories with EduPulse, the most impressive LMS template for online courses, education and LMS platforms.",
};

const CategoriesPage = () => {
    return <AdminAllCategories />;
};

export default CategoriesPage;
