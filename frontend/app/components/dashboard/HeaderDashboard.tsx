"use client";

import Image from "next/image";
import React, {useEffect, useState} from "react";
import Link from "next/link";
import {signOut} from "next-auth/react";

interface DocumentElement {
    requestFullscreen?: () => Promise<void>;
    webkitRequestFullscreen?: () => Promise<void>; // for Safari
    msRequestFullscreen?: () => Promise<void>; // for IE11
}

interface FullscreenDocument extends Partial<Document> {
    exitFullscreen?: () => Promise<void>;
    webkitExitFullscreen?: () => Promise<void>; // for Safari
    msExitFullscreen?: () => Promise<void>; // for IE11
}

const HeaderDashboard: React.FC = () => {
    const [messageOpen, setMessageOpen] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [isOnNotification, setIsOnNotification] = useState(false);
    const [isOnProfile, setIsOnProfile] = useState(false);
    const [documentElement, setDocumentElement] = useState<DocumentElement | null>(null);

    useEffect(() => {
        setDocumentElement(document.documentElement);
    }, []);

    const toggleFullScreen = () => {
        setIsFullScreen(prev => !prev);
        if (!isFullScreen) {
            openFullscreen();
        } else {
            closeFullscreen();
        }
    };

    const openFullscreen = () => {
        if (documentElement?.requestFullscreen) {
            documentElement.requestFullscreen();
        } else if (documentElement?.webkitRequestFullscreen) {
            documentElement.webkitRequestFullscreen();
        } else if (documentElement?.msRequestFullscreen) {
            documentElement.msRequestFullscreen();
        }
    };

    const closeFullscreen = () => {
        const doc = document as FullscreenDocument;
        if (doc.exitFullscreen) {
            doc.exitFullscreen();
        } else if (doc.webkitExitFullscreen) {
            doc.webkitExitFullscreen();
        } else if (doc.msExitFullscreen) {
            doc.msExitFullscreen();
        }
    };

    const handleDarkMode = () => {
        document.getElementsByTagName("html")[0].classList.toggle("-dark-mode");
    };

    const handleResize = () => {
        const element = document.getElementById("dashboardOpenClose");
        if (element && window.innerWidth < 990) {
            element.classList.add("-is-sidebar-hidden");
        }
    };

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const handleFullScreenToggle = () => {
        setIsFullScreen((pre) => !pre);
        if (!isFullScreen) {
            openFullscreen();
        } else {
            closeFullscreen();
        }
    };

    return (
        <>
            <header className="header -dashboard -dark-bg-dark-1 js-header">
                <div className="header__container py-20 px-30">
                    <div className="row justify-between items-center">
                        <div className="col-auto">
                            <div className="d-flex items-center">
                                <div className="header__explore text-dark-1">
                                    <button
                                        onClick={() => {
                                            document.getElementById("dashboardOpenClose")?.classList.toggle("-is-sidebar-hidden");
                                        }}
                                        className="d-flex items-center js-dashboard-home-9-sidebar-toggle"
                                    >
                                        <i className="icon -dark-text-white icon-explore"></i>
                                    </button>
                                </div>

                                <div className="header__logo ml-30 md:ml-20">
                                    <Link data-barba href="/">
                                        <Image
                                            width={40}
                                            height={40}
                                            className="-light-d-none"
                                            src="/assets/img/general/logo.svg"
                                            alt="logo"
                                        />
                                        <Image
                                            width={40}
                                            height={40}
                                            className="-dark-d-none"
                                            src="/assets/img/general/logo.svg"
                                            alt="logo"
                                        />
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="col-auto">
                            <div className="d-flex items-center">
                                <div className="d-flex items-center sm:d-none">
                                    {/* <div className="relative">
                                        <button
                                            onClick={handleDarkMode}
                                            className="js-darkmode-toggle text-light-1 d-flex items-center justify-center size-50 rounded-16 -hover-dshb-header-light"
                                        >
                                            <i className="text-24 icon icon-night"></i>
                                        </button>
                                    </div> */}

                                    <div className="relative">
                                        <button
                                            onClick={() => handleFullScreenToggle()}
                                            className="d-flex text-light-1 items-center justify-center size-50 rounded-16 -hover-dshb-header-light"
                                        >
                                            <i className="text-24 icon icon-maximize"></i>
                                        </button>
                                    </div>

                                    {/* <div
                                        className="relative"
                                        onClick={() => setMessageOpen(true)}
                                    >
                                        <a
                                            href="#"
                                            className="d-flex items-center text-light-1 justify-center size-50 rounded-16 -hover-dshb-header-light"
                                            data-el-toggle=".js-msg-toggle"
                                        >
                                            <i className="text-24 icon icon-email"></i>
                                        </a>
                                    </div>

                                    <div
                                        className="relative"
                                        onClick={() => setIsOnNotification((pre) => !pre)}
                                    >
                                        <a
                                            href="#"
                                            className="d-flex items-center text-light-1 justify-center size-50 rounded-16 -hover-dshb-header-light"
                                            data-el-toggle=".js-notif-toggle"
                                        >
                                            <i className="text-24 icon icon-notification"></i>
                                        </a>
                                    </div> */}
                                </div>

                                <div
                                    className="relative d-flex items-center ml-10"
                                    onClick={() => setIsOnProfile((pre) => !pre)}
                                >
                                    <a href="#" data-el-toggle=".js-profile-toggle">
                                        <Image
                                            width={50}
                                            height={50}
                                            className="size-50"
                                            src="/assets/img/avatars/anonymous_user.webp"
                                            alt="image"
                                        />
                                    </a>

                                    <div
                                        className={`toggle-element js-profile-toggle ${
                                            isOnProfile ? "-is-el-visible" : ""
                                        } -`}
                                    >
                                        <div
                                            className="toggle-bottom -profile bg-white shadow-4 border-light rounded-8 mt-10">
                                            <div className="px-10 py-10">
                                                <div className="sidebar -dashboard">
                                                    <div className={`sidebar__item`}>
                                                        <Link
                                                            href={"/profile"}
                                                            className="d-flex items-center text-17 lh-1 fw-500"
                                                        >
                                                            <i className="text-20 icon-list mr-5"></i>
                                                            Profile
                                                        </Link>
                                                    </div>
                                                    <hr/>
                                                    <div className={`sidebar__item`}>
                                                        <a
                                                            href="#"
                                                            onClick={() => signOut({callbackUrl: "/"})}
                                                            className="d-flex items-center text-17 lh-1 fw-500 "
                                                        >
                                                            <i className="text-20 icon-power mr-5"></i>
                                                            Logout
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}

export default HeaderDashboard;
