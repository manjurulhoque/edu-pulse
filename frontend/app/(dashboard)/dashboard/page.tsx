import { Metadata } from "next";
import Sidebar from "@/app/components/dashboard/Sidebar";
import DashboardHome from "@/app/components/dashboard/DashboardHome";
import HeaderDashboard from "@/app/components/dashboard/HeaderDashboard";
import FooterDashboard from "@/app/components/dashboard/FooterDashboard";

export const metadata: Metadata = {
    title: "My Dashboard",
};

const DashboardPage = () => {
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
                        <DashboardHome/>
                    </div>
                </div>
            </main>

            <FooterDashboard/>
        </div>
    )
}

export default DashboardPage;