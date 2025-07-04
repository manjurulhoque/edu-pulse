import Header from "@/app/components/layout/Header";
import { Metadata } from "next";
import CourseList from "@/app/components/courses/CourseList";
import PageLinks from "@/app/components/common/PageLinks";

export const metadata: Metadata = {
    title: "Courses | EduPulse - Professional LMS Online Education Course",
    description: "Courses page",
};

const CoursesPage = () => {
    return (
        <div className="main-content">
            <Header />

            <div className="content-wrapper js-content-wrapper overflow-hidden">
                <PageLinks dark={null} />
                <CourseList />
            </div>
        </div>
    );
};

export default CoursesPage;
