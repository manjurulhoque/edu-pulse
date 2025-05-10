import { Metadata } from "next";
import React from "react";
import CreateCourse from "@/app/components/dashboard/courses/CreateCourse";

export const metadata: Metadata = {
    title: "Create course || EduPulse - Professional LMS Online Education Course",
    description:
        "Elevate your e-learning content with EduPulse, the most impressive LMS template for online courses, education and LMS platforms.",
};

const CreateCoursesPage: React.FC = async () => {
    return (
        <CreateCourse />
    );
};

export default CreateCoursesPage;
