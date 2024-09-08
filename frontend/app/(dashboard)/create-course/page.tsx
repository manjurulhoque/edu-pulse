import { Metadata } from "next";
import HeaderDashboard from "@/app/components/dashboard/HeaderDashboard";
import Sidebar from "@/app/components/dashboard/Sidebar";
import React from "react";
import CreateCourse from "@/app/components/dashboard/courses/CreateCourse";

export const metadata: Metadata = {
    title: "Create course",
    description: "Create course page",
};

const CreateCoursesPage: React.FC = async () => {
    return (
        <div className="barba-container" data-barba="container">
            <main className="main-content">
                {/*<Preloader />*/}
                <HeaderDashboard/>
                <div className="content-wrapper js-content-wrapper overflow-hidden">
                    <div
                        id="dashboardOpenClose"
                        className="dashboard -home-9 js-dashboard-home-9"
                    >
                        <div className="dashboard__sidebar scroll-bar-1">
                            <Sidebar/>
                        </div>
                        <CreateCourse/>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default CreateCoursesPage;