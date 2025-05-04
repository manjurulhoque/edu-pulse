"use client";

import React, { useMemo } from "react";
import { useGetDashboardStatisticsQuery } from "@/app/store/reducers/statistics/api";
import { Grid } from "react-loader-spinner";
export const states = [
    {
        id: 1,
        title: "Enrolled Courses",
        value: 0,
        new: 0,
        iconClass: "icon-play-button",
    },
    {
        id: 2,
        title: "Completed Courses",
        value: 0,
        new: 0,
        iconClass: "icon-check",
    },
    {
        id: 3,
        title: "Lessons Completed",
        value: 0,
        new: 0,
        iconClass: "icon-graduate-cap",
    },
    {
        id: 4,
        title: "Certificates Earned",
        value: 0,
        new: 0,
        iconClass: "icon-certificate",
    },
];

export default function DashboardHome() {
    const { data: statistics, isLoading, error } = useGetDashboardStatisticsQuery();

    const updatedStates = useMemo(
        () => [
            {
                ...states[0],
                value: statistics?.total_enrolled_courses || 0,
                new: statistics?.recent_activity || 0,
            },
            {
                ...states[1],
                value: statistics?.total_completed_courses || 0,
                new: 0,
            },
            {
                ...states[2],
                value: statistics?.total_lessons_completed || 0,
                new: 0,
            },
            {
                ...states[3],
                value: statistics?.certificates_earned || 0,
                new: 0,
            },
        ],
        [statistics]
    );

    if (isLoading) {
        return (
            <div className="dashboard__main">
                <div className="dashboard__content bg-light-4">
                    <div className="row pb-50 mb-10">
                        <div className="col-auto">
                            <h1 className="text-30 lh-12 fw-700">My Learning Dashboard</h1>
                            <div className="mt-10">Track your learning progress and achievements</div>
                        </div>
                    </div>

                    <div className="row y-gap-30">
                        <div
                            style={{
                                display: isLoading ? "flex" : "none",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "100vh",
                            }}
                        >
                            <Grid
                                visible={isLoading}
                                height="60"
                                width="60"
                                color="#4fa94d"
                                ariaLabel="grid-loading"
                                radius="12.5"
                                wrapperStyle={{}}
                                wrapperClass="grid-wrapper"
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return <div>Error loading statistics</div>;
    }

    return (
        <div className="dashboard__main">
            <div className="dashboard__content bg-light-4">
                <div className="row pb-50 mb-10">
                    <div className="col-auto">
                        <h1 className="text-30 lh-12 fw-700">My Learning Dashboard</h1>
                        <div className="mt-10">Track your learning progress and achievements</div>
                    </div>
                </div>

                <div className="row y-gap-30">
                    {updatedStates.map((elm, i) => (
                        <div key={i} className="col-xl-3 col-md-6">
                            <div className="d-flex justify-between items-center py-35 px-30 rounded-16 bg-white -dark-bg-dark-1 shadow-4">
                                <div>
                                    <div className="lh-1 fw-500">{elm.title}</div>
                                    <div className="text-24 lh-1 fw-700 text-dark-1 mt-20">{elm.value}</div>
                                    {elm.new > 0 && (
                                        <div className="lh-1 mt-25">
                                            <span className="text-purple-1">{elm.new}</span> Recent Activity
                                        </div>
                                    )}
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
                                <h2 className="text-17 lh-1 fw-500">Learning Progress</h2>
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
                                                        This Week
                                                    </a>
                                                </div>
                                                <div>
                                                    <a href="#" className="d-block js-dropdown-link">
                                                        This Month
                                                    </a>
                                                </div>
                                                <div>
                                                    <a href="#" className="d-block js-dropdown-link">
                                                        This Year
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="py-40 px-30">
                                <div className="text-center">
                                    <h3 className="text-20 fw-500">Total Time Spent Learning</h3>
                                    <p className="text-30 fw-700 mt-10">{statistics?.total_time_spent || 0} minutes</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-4 col-md-6">
                        <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
                            <div className="d-flex justify-between items-center py-20 px-30 border-bottom-light">
                                <h2 className="text-17 lh-1 fw-500">Recent Activity</h2>
                            </div>
                            <div className="py-40 px-30">
                                <div className="text-center">
                                    <h3 className="text-20 fw-500">Activities in Last 7 Days</h3>
                                    <p className="text-30 fw-700 mt-10">{statistics?.recent_activity || 0}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
