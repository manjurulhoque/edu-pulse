import "../globals.css";
import "../../public/assets/sass/styles.scss";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "react-hot-toast";

import { permanentRedirect } from "next/navigation";
import { getServerSession } from "next-auth";
import React from "react";
import { NextAuthProvider } from "@/app/components/NextAuthProvider";
import { AOSInit } from "@/app/components/aos-init";
import ReduxProvider from "@/app/components/ReduxProvider";
import { ToastContainer } from "react-toastify";
import { authOptions } from "@/app/utils/authOptions";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import FooterDashboard from "../components/dashboard/FooterDashboard";
import HeaderDashboard from "../components/dashboard/HeaderDashboard";
import StudentDashboardSidebar from "../components/dashboard/StudentDashboardSidebar";

interface Props {
    children: React.ReactNode;
}

const DashboardLayout: React.FC<Props> = async ({ children }) => {
    const session = await getServerSession(authOptions);
    if (!session) permanentRedirect("/login");

    return (
        <NextAuthProvider session={session}>
            <html lang="en">
                <AOSInit />
                <body>
                    <ReduxProvider>
                        <NuqsAdapter>
                            <div className="barba-container" data-barba="container">
                                <main className="main-content">
                                    {/*<Preloader />*/}
                                    <HeaderDashboard />
                                    <div className="content-wrapper js-content-wrapper overflow-hidden">
                                        <div id="dashboardOpenClose" className="dashboard -home-9 js-dashboard-home-9">
                                            <div className="dashboard__sidebar scroll-bar-1">
                                                <StudentDashboardSidebar />
                                            </div>
                                            {children}
                                        </div>
                                    </div>
                                </main>
                                <FooterDashboard />
                            </div>
                        </NuqsAdapter>
                    </ReduxProvider>
                    <ToastContainer />
                    <Toaster />
                </body>
            </html>
        </NextAuthProvider>
    );
};

export default DashboardLayout;
