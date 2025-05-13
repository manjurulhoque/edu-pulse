import AdminAllUsers from "@/app/components/dashboard/users/AdminAllUsers";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "All Users | EduPulse - Professional LMS Online Education Course",
    description:
        "Manage your platform users with EduPulse, the most impressive LMS template for online courses, education and LMS platforms.",
};

const UsersPage = () => {
    return <AdminAllUsers />;
};

export default UsersPage;
