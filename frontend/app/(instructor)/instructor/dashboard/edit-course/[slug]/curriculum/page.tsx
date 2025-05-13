import { Metadata } from "next";
import React from "react";
import CourseCurriculum from "@/app/components/dashboard/courses/CourseCurriculum";

export const metadata: Metadata = {
    title: "Add/Edit course curriculum | EduPulse - Professional LMS Online Education Course",
    description:
        "Elevate your e-learning content with EduPulse, the most impressive LMS template for online courses, education and LMS platforms.",
};

const CurriculumPage: React.FC = async () => {
    return <CourseCurriculum />;
};

export default CurriculumPage;
