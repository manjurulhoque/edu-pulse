import StudentDashboardHome from "@/app/components/dashboard/student/StudentDashboardHome";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Student Dashboard",
    description: "Student Dashboard",
};

const StudentDashboardPage = () => {
    return <StudentDashboardHome />;
};

export default StudentDashboardPage;
