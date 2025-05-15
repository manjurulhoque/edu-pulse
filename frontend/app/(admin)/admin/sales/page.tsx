import AdminAllSales from "@/app/components/dashboard/sales/AdminAllSales";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sales Overview | EduPulse - Professional LMS Online Education Course",
    description:
        "Track and manage your platform sales with EduPulse, the most impressive LMS template for online courses, education and LMS platforms.",
};

const SalesPage = () => {
    return <AdminAllSales />;
};

export default SalesPage;
