import { Metadata } from "next";
import DashboardHome from "@/app/components/dashboard/DashboardHome";

export const metadata: Metadata = {
    title: "Instructor Dashboard | EduPulse - Professional LMS Online Education Course",
};

const DashboardPage = () => {
    return <DashboardHome />;
};

export default DashboardPage;
