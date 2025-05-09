import "../globals.css";
import "../../public/assets/sass/styles.scss";
import "react-toastify/dist/ReactToastify.css";

import { permanentRedirect } from "next/navigation";
import { getServerSession } from "next-auth";
import React from "react";
import { NextAuthProvider } from "@/app/components/NextAuthProvider";
import { AOSInit } from "@/app/components/aos-init";
import ReduxProvider from "@/app/components/ReduxProvider";
import { ToastContainer } from "react-toastify";
import { authOptions } from "@/app/utils/authOptions";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import HeaderDashboard from "../components/dashboard/HeaderDashboard";
import Sidebar from "../components/dashboard/Sidebar";
import FooterDashboard from "../components/dashboard/FooterDashboard";

interface Props {
    children: React.ReactNode;
}

const DashboardLayout: React.FC<Props> = async ({ children }) => {
    const session = await getServerSession(authOptions);
    if (!session) permanentRedirect("/login");

    const user = session?.user;
    const isAdmin = user?.is_admin;

    if (!isAdmin) permanentRedirect("/");

    return (
        <NextAuthProvider session={session}>
            <html lang="en">
                <AOSInit />
                <body>
                    <ReduxProvider>
                        <NuqsAdapter>
                            <div className="barba-container" data-barba="container">
                                <main className="main-content">
                                    <HeaderDashboard />
                                    <div className="content-wrapper js-content-wrapper overflow-hidden">
                                        <div id="dashboardOpenClose" className="dashboard -home-9 js-dashboard-home-9">
                                            <div className="dashboard__sidebar scroll-bar-1">
                                                <Sidebar />
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
                </body>
            </html>
        </NextAuthProvider>
    );
};

export default DashboardLayout;
