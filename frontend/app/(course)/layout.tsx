import type { Metadata } from "next";
import "../globals.css";
import "../../public/assets/sass/styles.scss";
import "react-toastify/dist/ReactToastify.css";

import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import React from "react";
import { NextAuthProvider } from "@/app/components/NextAuthProvider";
import { getServerSession } from "next-auth";
import Footer from "@/app/components/layout/Footer";
import Header from "@/app/components/layout/Header";
import { AOSInit } from "@/app/components/aos-init";
import { ToastContainer } from "react-toastify";
import ReduxProvider from "@/app/components/ReduxProvider";
import ReactQueryProvider from "@/app/components/ReactQueryProvider";
import { authOptions } from "@/app/utils/authOptions";

config.autoAddCss = false;

export const metadata: Metadata = {
    title: "Edu Pulse - Professional LMS Online Education Course",
    description: "Learn from the experienced teachers",
};

interface Props {
    children: React.ReactNode;
}

const CourseLayout: React.FC<Props> = async ({ children }) => {
    const session = await getServerSession(authOptions);

    return (
        <html lang="en">
            <AOSInit />
            <body>
                <ReactQueryProvider>
                    <ReduxProvider>
                        <NextAuthProvider session={session}>
                            {children}
                            <ToastContainer />
                        </NextAuthProvider>
                    </ReduxProvider>
                </ReactQueryProvider>
            </body>
        </html>
    );
};

export default CourseLayout;
