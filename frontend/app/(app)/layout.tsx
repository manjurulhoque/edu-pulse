import type {Metadata} from "next";
import "../globals.css";
import "../../public/assets/sass/styles.scss";
import 'react-toastify/dist/ReactToastify.css';

import {config} from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import React from "react";
import {NextAuthProvider} from "@/app/components/NextAuthProvider";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import Footer from "@/app/components/layout/Footer";
import Header from "@/app/components/layout/Header";
import {AOSInit} from "@/app/components/aos-init";
import {ToastContainer} from "react-toastify";
import ReduxProvider from "@/app/components/ReduxProvider";
import ReactQueryProvider from "@/app/components/ReactQueryProvider";

config.autoAddCss = false;

export const metadata: Metadata = {
    title: "Edu Pulse",
    description: "Learn from the experienced teachers",
};

interface Props {
    children: React.ReactNode
}

const RootLayout: React.FC<Props> = async ({children}) => {
    const session = await getServerSession(authOptions);

    return (
        <html lang="en">
        <AOSInit/>
        <body>
        <ReactQueryProvider>
            <ReduxProvider>
                <NextAuthProvider session={session}>
                    <Header/>
                    {children}
                    <Footer/>
                    <ToastContainer/>
                </NextAuthProvider>
            </ReduxProvider>
        </ReactQueryProvider>
        </body>
        </html>
    );
}

export default RootLayout;