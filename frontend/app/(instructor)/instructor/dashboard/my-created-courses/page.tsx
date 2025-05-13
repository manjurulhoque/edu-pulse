import React from "react";
import MyCreatedCourses from "@/app/components/dashboard/courses/MyCreatedCourses";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "My created courses | EduPulse - Professional LMS Online Education Course",
    description:
        "Elevate your e-learning content with EduPulse, the most impressive LMS template for online courses, education and LMS platforms.",
};

const MyCoursesPage: React.FC = async () => {
    return <MyCreatedCourses />;
};

export default MyCoursesPage;
