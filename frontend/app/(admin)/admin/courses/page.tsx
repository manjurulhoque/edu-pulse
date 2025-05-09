import AdminAllCourses from "@/app/components/courses/AdminAllCourses";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "All Courses",
    description: "All Courses",
};


const CoursesPage = () => {
    return (
        <AdminAllCourses />
    );
};

export default CoursesPage;
