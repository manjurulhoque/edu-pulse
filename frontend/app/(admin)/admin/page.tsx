"use client";

import Sidebar from "@/app/components/dashboard/Sidebar";
import HeaderDashboard from "@/app/components/dashboard/HeaderDashboard";
import FooterDashboard from "@/app/components/dashboard/FooterDashboard";
import AdminDashboardHome from "@/app/components/admin/AdminDashboardHome";

export default function AdminDashboard() {
    return (
        <div className="barba-container" data-barba="container">
            <main className="main-content">
                <HeaderDashboard />
                <div className="content-wrapper js-content-wrapper overflow-hidden">
                    <div id="dashboardOpenClose" className="dashboard -home-9 js-dashboard-home-9">
                        <div className="dashboard__sidebar scroll-bar-1">
                            <Sidebar />
                        </div>
                        <AdminDashboardHome />
                    </div>
                </div>
            </main>

            <FooterDashboard />
        </div>
    );
}
