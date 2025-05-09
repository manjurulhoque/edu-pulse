import MyCourses from "@/app/components/dashboard/courses/MyCourses";
import HeaderDashboard from "@/app/components/dashboard/HeaderDashboard";
import Sidebar from "@/app/components/dashboard/Sidebar";
import FooterDashboard from "@/app/components/dashboard/FooterDashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "My Courses",
};

const MyCoursesPage = () => {
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
                        <MyCourses/>
                    </div>
                </div>
            </main>

            <FooterDashboard/>
        </div>
    );
};

export default MyCoursesPage;
