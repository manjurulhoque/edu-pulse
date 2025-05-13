import { Metadata } from "next";
import React from "react";
import EditCourse from "@/app/components/dashboard/courses/EditCourse";

export const metadata: Metadata = {
    title: "Update course | EduPulse - Professional LMS Online Education Course",
    description:
        "Elevate your e-learning content with EduPulse, the most impressive LMS template for online courses, education and LMS platforms.",
};

const EditCoursesPage: React.FC = async () => {
    return <EditCourse />;
};

export default EditCoursesPage;
