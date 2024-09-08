import React from "react";
import HeaderDashboard from "@/app/components/dashboard/HeaderDashboard";
import Sidebar from "@/app/components/dashboard/Sidebar";
import MyCreatedCourses from "@/app/components/dashboard/courses/MyCreatedCourses";
import Preloader from "@/app/components/Preloader";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'My created courses || EduPulse - Professional LMS Online Education Course',
    description: 'Elevate your e-learning content with EduPulse, the most impressive LMS template for online courses, education and LMS platforms.',
};

const MyCoursesPage: React.FC = async () => {
    return (
        <div className="barba-container" data-barba="container">
            <main className="main-content">
                <Preloader/>
                <HeaderDashboard/>
                <div className="content-wrapper js-content-wrapper overflow-hidden">
                    <div
                        id="dashboardOpenClose"
                        className="dashboard -home-9 js-dashboard-home-9"
                    >
                        <div className="dashboard__sidebar scroll-bar-1">
                            <Sidebar/>
                        </div>
                        <MyCreatedCourses/>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default MyCoursesPage;