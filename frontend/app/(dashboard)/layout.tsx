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
                        <NuqsAdapter>{children}</NuqsAdapter>
                    </ReduxProvider>
                    <ToastContainer />
                </body>
            </html>
        </NextAuthProvider>
    );
};

export default DashboardLayout;
