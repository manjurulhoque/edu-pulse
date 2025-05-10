import AdminAllCourses from "@/app/components/dashboard/courses/AdminAllCourses";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "All Courses || EduPulse - Professional LMS Online Education Course",
    description:
        "Elevate your e-learning content with EduPulse, the most impressive LMS template for online courses, education and LMS platforms.",
};


const CoursesPage = () => {
    return (
        <AdminAllCourses />
    );
};

export default CoursesPage;
