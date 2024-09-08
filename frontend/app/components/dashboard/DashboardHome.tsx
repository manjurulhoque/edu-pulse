"use client";

import React from "react";

export const states = [
    {
        id: 1,
        title: "Total Sales",
        value: 10800,
        new: 50,
        iconClass: "icon-coupon",
    },
    {
        id: 2,
        title: "Total Courses",
        value: 3759,
        new: 40,
        iconClass: "icon-play-button",
    },
    {
        id: 3,
        title: "Total Students",
        value: 129786,
        new: 90,
        iconClass: "icon-graduate-cap",
    },
    {
        id: 4,
        title: "Total Instructors",
        value: 22786,
        new: 290,
        iconClass: "icon-online-learning",
    },
];


export default function DashboardHome() {
    return (
        <div className="dashboard__main">
            <div className="dashboard__content bg-light-4">
                <div className="row pb-50 mb-10">
                    <div className="col-auto">
                        <h1 className="text-30 lh-12 fw-700">Dashboard</h1>
                        <div className="mt-10">
                            Lorem ipsum dolor sit amet, consectetur.
                        </div>
                    </div>
                </div>

                <div className="row y-gap-30">
                    {states.map((elm, i) => (
                        <div key={i} className="col-xl-3 col-md-6">
                            <div
                                className="d-flex justify-between items-center py-35 px-30 rounded-16 bg-white -dark-bg-dark-1 shadow-4">
                                <div>
                                    <div className="lh-1 fw-500">{elm.title}</div>
                                    <div className="text-24 lh-1 fw-700 text-dark-1 mt-20">
                                        ${elm.value}
                                    </div>
                                    <div className="lh-1 mt-25">
                                        <span className="text-purple-1">${elm.new}</span> New Sales
                                    </div>
                                </div>

                                <i className={`text-40 ${elm.iconClass} text-purple-1`}></i>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="row y-gap-30 pt-30">
                    <div className="col-xl-8 col-md-6">
                        <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
                            <div className="d-flex justify-between items-center py-20 px-30 border-bottom-light">
                                <h2 className="text-17 lh-1 fw-500">Earning Statistics</h2>
                                <div className="">
                                    <div
                                        id="ddtwobutton"
                                        onClick={() => {
                                            document.getElementById("ddtwobutton")?.classList.toggle("-is-dd-active");
                                            document.getElementById("ddtwocontent")?.classList.toggle("-is-el-visible");
                                        }}
                                        className="dropdown js-dropdown js-category-active"
                                    >
                                        <div
                                            className="dropdown__button d-flex items-center text-14 bg-white -dark-bg-dark-1 border-light rounded-8 px-20 py-10 text-14 lh-12"
                                            data-el-toggle=".js-category-toggle"
                                            data-el-toggle-active=".js-category-active"
                                        >
                                            <span className="js-dropdown-title">This Week</span>
                                            <i className="icon text-9 ml-40 icon-chevron-down"></i>
                                        </div>

                                        <div
                                            id="ddtwocontent"
                                            className="toggle-element -dropdown -dark-bg-dark-2 -dark-border-white-10 js-click-dropdown js-category-toggle"
                                        >
                                            <div className="text-14 y-gap-15 js-dropdown-list">
                                                <div>
                                                    <a href="#" className="d-block js-dropdown-link">
                                                        Animation
                                                    </a>
                                                </div>

                                                <div>
                                                    <a href="#" className="d-block js-dropdown-link">
                                                        Design
                                                    </a>
                                                </div>

                                                <div>
                                                    <a href="#" className="d-block js-dropdown-link">
                                                        Illustration
                                                    </a>
                                                </div>

                                                <div>
                                                    <a href="#" className="d-block js-dropdown-link">
                                                        Business
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="py-40 px-30">
                                {/*<Charts/>*/}
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-4 col-md-6">
                        <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
                            <div className="d-flex justify-between items-center py-20 px-30 border-bottom-light">
                                <h2 className="text-17 lh-1 fw-500">Traffic</h2>
                                <div className="">
                                    <div
                                        id="dd3button"
                                        onClick={() => {
                                            document.getElementById("dd3button")?.classList.toggle("-is-dd-active");
                                            document.getElementById("dd3content")?.classList.toggle("-is-el-visible");
                                        }}
                                        className="dropdown js-dropdown js-category-active"
                                    >
                                        <div
                                            className="dropdown__button d-flex items-center text-14 bg-white -dark-bg-dark-1 border-light rounded-8 px-20 py-10 text-14 lh-12"
                                            data-el-toggle=".js-category-toggle"
                                            data-el-toggle-active=".js-category-active"
                                        >
                                            <span className="js-dropdown-title">This Week</span>
                                            <i className="icon text-9 ml-40 icon-chevron-down"></i>
                                        </div>

                                        <div
                                            id="dd3content"
                                            className="toggle-element -dropdown -dark-bg-dark-2 -dark-border-white-10 js-click-dropdown js-category-toggle"
                                        >
                                            <div className="text-14 y-gap-15 js-dropdown-list">
                                                <div>
                                                    <a href="#" className="d-block js-dropdown-link">
                                                        Animation
                                                    </a>
                                                </div>

                                                <div>
                                                    <a href="#" className="d-block js-dropdown-link">
                                                        Design
                                                    </a>
                                                </div>

                                                <div>
                                                    <a href="#" className="d-block js-dropdown-link">
                                                        Illustration
                                                    </a>
                                                </div>

                                                <div>
                                                    <a href="#" className="d-block js-dropdown-link">
                                                        Business
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="py-40 px-30">
                                {/*<PieChartComponent/>*/}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/*<Footer/>*/}
        </div>
    );
}
