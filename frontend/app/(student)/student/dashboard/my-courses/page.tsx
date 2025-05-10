import MyCourses from "@/app/components/dashboard/courses/MyCourses";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "My Courses || EduPulse - Professional LMS Online Education Course",
};

const MyCoursesPage = () => {
    return <MyCourses />;
};

export default MyCoursesPage;
