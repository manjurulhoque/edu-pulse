"use client";

import React from "react";
import Links from "@/app/components/Links";

const FooterDashboard: React.FC = () => {
    return <>
        <footer className="footer">
            <div className="container">
                <div className="py-30 border-top-light">
                    <div className="row items-center justify-between">
                        <div className="col-auto">
                            <div className="text-13 lh-1">
                                © {new Date().getFullYear()} Edu Pulse. All Right Reserved.
                            </div>
                        </div>

                        <div className="col-auto">
                            <div className="d-flex items-center">
                                <div className="d-flex items-center flex-wrap x-gap-20">
                                    <Links/>
                                </div>

                                <button className="button -md -rounded bg-light-4 text-light-1 ml-30">
                                    English
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    </>
};

export default FooterDashboard;