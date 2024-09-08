"use client";

import React, { useState } from "react";
import Link from "next/link";

export const HeaderExplore = ({allClasses}: any) => {
    const [exploreActive, setExploreActive] = useState(false);
    return (
        <>
            <div className={`${allClasses ? allClasses : ""}`}>
                <Link
                    href="#"
                    onClick={() => setExploreActive((pre) => !pre)}
                    className="d-flex items-center"
                    data-el-toggle=".js-explore-toggle"
                >
                    <i className="icon icon-explore ml-15"></i>
                    Explore
                </Link>

                <div
                    className={`explore-content py-25 rounded-8 bg-white toggle-element js-explore-toggle ${
                        exploreActive ? "-is-el-visible" : ""
                    }`}
                >
                    <div className="explore__item">
                        <Link
                            href="#"
                            className="d-flex items-center justify-between text-dark-1"
                        >
                            Architecture
                            <div className="icon-chevron-right text-11"></div>
                        </Link>
                        <div className="explore__subnav rounded-8">
                            <Link className="text-dark-1" href={`/courses/6`}>
                                Web Design
                            </Link>
                        </div>
                    </div>

                    <div className="explore__item">
                        <Link
                            href="#"
                            className="d-flex items-center justify-between text-dark-1"
                        >
                            Business
                            <div className="icon-chevron-right text-11"></div>
                        </Link>
                        <div className="explore__subnav rounded-8">
                            <Link className="text-dark-1" href={`/courses/6}`}>
                                Web Design
                            </Link>
                        </div>
                    </div>

                    <div className="explore__item">
                        <Link href="#" className="text-dark-1">
                            Computer Programming
                        </Link>
                    </div>

                    <div className="explore__item">
                        <Link href="#" className="text-dark-1">
                            Data Analysis
                        </Link>
                    </div>

                    <div className="explore__item">
                        <Link
                            href="#"
                            className="d-flex items-center justify-between text-dark-1"
                        >
                            Design
                            <div className="icon-chevron-right text-11"></div>
                        </Link>
                        <div className="explore__subnav rounded-8">
                            <Link className="text-dark-1" href={`/courses/6`}>
                                Web Design
                            </Link>
                        </div>
                    </div>

                    <div className="explore__item">
                        <Link
                            href="/courses-single-6/3"
                            className="text-dark-1"
                        >
                            Education
                        </Link>
                    </div>

                    <div className="explore__item">
                        <Link
                            href="#"
                            className="d-flex items-center justify-between text-dark-1"
                        >
                            Electronics
                            <div className="icon-chevron-right text-11"></div>
                        </Link>
                        <div className="explore__subnav rounded-8">
                            <Link className="text-dark-1" href={`/courses/6`}>
                                Web Design
                            </Link>
                            <Link
                                className="text-dark-1"
                                href="/courses-single-2/3"
                            >
                                Graphic Design
                            </Link>
                        </div>
                    </div>

                    <div className="explore__item">
                        <Link
                            href="#"
                            className="d-flex items-center justify-between text-dark-1"
                        >
                            Language
                            <div className="icon-chevron-right text-11"></div>
                        </Link>
                        <div className="explore__subnav rounded-8">
                            <Link className="text-dark-1" href={`/courses/6`}>
                                Web Design
                            </Link>
                        </div>
                    </div>

                    <div className="explore__item">
                        <Link
                            href="#"
                            className="d-flex items-center justify-between text-dark-1"
                        >
                            Marketing
                            <div className="icon-chevron-right text-11"></div>
                        </Link>
                        <div className="explore__subnav rounded-8">
                            <Link className="text-dark-1" href={`/courses/6`}>
                                Web Design
                            </Link>
                        </div>
                    </div>

                    <div className="explore__item">
                        <Link href="#" className="text-dark-1">
                            Music Arts
                        </Link>
                    </div>

                    <div className="explore__item">
                        <Link href="#" className="text-dark-1">
                            Social Science
                        </Link>
                    </div>

                    <div className="explore__item">
                        <Link
                            href="#"
                            className="d-flex items-center justify-between text-dark-1"
                        >
                            Photography & Video
                            <div className="icon-chevron-right text-11"></div>
                        </Link>
                        <div className="explore__subnav rounded-8">
                            <Link className="text-dark-1" href={`/courses/6`}>
                                Web Design
                            </Link>
                        </div>
                    </div>

                    <div className="explore__item">
                        <Link href={`/courses/6`} className="text-dark-1">
                            IT & Software
                        </Link>
                    </div>

                    <div className="explore__item">
                        <Link
                            href="/courses"
                            className="text-purple-1 underline"
                        >
                            View All Courses
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};
