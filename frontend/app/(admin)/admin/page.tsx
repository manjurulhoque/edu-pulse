import AdminDashboardHome from "@/app/components/admin/AdminDashboardHome";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Admin Dashboard || EduPulse - Professional LMS Online Education Course",
    description:
        "Elevate your e-learning content with EduPulse, the most impressive LMS template for online courses, education and LMS platforms.",
};

export default function AdminDashboardPage() {
    return <AdminDashboardHome />;
}
