"use client";
import React from "react";
import Image from "next/image";
import FooterLinks from "../FooterLinks";
import Socials from "../common/Socials";
import Links from "../Links";

export default function Footer() {
    const handleSubmit = (e: any) => {
        e.preventDefault();
    };

    return (
        <footer className="footer -type-5 pt-60">
            <div className="container">
                <div className="row y-gap-30 pb-60">
                    <div className="col-xl-4 col-lg-5 col-md-6">
                        <div className="footer-header__logo">
                            <Image
                                width={40}
                                height={40}
                                src="/assets/img/general/logo.png"
                                alt="logo"
                            />
                        </div>

                        <div className="mt-30">
                            <div className="text-17 text-dark-1">Call Us</div>
                            <div className="text-17 lh-1 fw-500 text-purple-1 mt-5">
                                343434214
                            </div>
                        </div>

                        <div className="mt-30 pr-20">
                            <div className="lh-17">
                                121 ABDSAF
                            </div>
                        </div>

                        <div className="footer-header-socials mt-30">
                            <div className="footer-header-socials__list d-flex items-center">
                                <Socials
                                    componentsClass={
                                        "size-40 d-flex justify-center items-center "
                                    }
                                />
                            </div>
                        </div>
                    </div>

                    <FooterLinks
                        allClasses={"text-17 fw-500 text-dark-1 uppercase mb-25"}
                    />
                </div>

                <div className="py-30 border-top-light">
                    <div className="row justify-between items-center y-gap-20">
                        <div className="col-auto">
                            <div className="footer-footer__copyright d-flex items-center h-100">
                                © {new Date().getFullYear()} P. All Right Reserved.
                            </div>
                        </div>

                        <div className="col-auto">
                            <div className="d-flex x-gap-20 y-gap-20 items-center flex-wrap">
                                <div>
                                    <div className="d-flex x-gap-15">
                                        <Links/>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
