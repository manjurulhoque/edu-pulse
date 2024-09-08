"use client";

import React, { useEffect, useState } from "react";
import FooterDashboard from "@/app/components/dashboard/FooterDashboard";
import CoursesCardDashboard from "@/app/components/dashboard/courses/CoursesCardDashboard";
import { useMyCreatedCoursesQuery } from "@/app/store/reducers/courses/api";
import { useCategoriesQuery } from "@/app/store/reducers/categories/api";


const MyCreatedCourses: React.FC = () => {
    const [currentCategory, setCurrentCategory] = useState<number>(0);
    const [pageItems, setPageItems] = useState<Course[]>([]);
    const [activeTab, setActiveTab] = useState(1);
    const [pageData, setPageData] = useState<Course[]>([]);
    const {data: categories, isLoading: isCategoriesLoading} = useCategoriesQuery(null);
    const {data: courses, isLoading: isCoursesLoading} = useMyCreatedCoursesQuery(null);

    useEffect(() => {
        if (courses) {
            // filter published courses
            if (activeTab === 1) {
                setPageData([
                    ...(courses ?? [])?.filter((course: Course) => course.is_published)
                ]);
            } else {
                setPageData([
                    ...(courses ?? [])?.filter((course: Course) => !course.is_published)
                ]);
            }
        }
    }, [activeTab, courses]);

    const handleSubmit = (e: any) => {
        e.preventDefault();
    };

    useEffect(() => {
        if (currentCategory === 0) {
            setPageItems(pageData);
        } else {
            setPageItems([
                ...pageData.filter((course: Course) => course.category_id == currentCategory),
            ]);
        }
    }, [currentCategory, pageData]);

    return (
        <div className="dashboard__main">
            <div className="dashboard__content bg-light-4">
                <div className="row pb-50 mb-10">
                    <div className="col-auto">
                        <h1 className="text-30 lh-12 fw-700">My Courses</h1>
                        <div className="mt-10">
                            My created own courses
                        </div>
                    </div>
                </div>

                <div className="row y-gap-30">
                    <div className="col-12">
                        <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
                            <div className="tabs -active-purple-2 js-tabs">
                                <div
                                    className="tabs__controls d-flex items-center pt-20 px-30 border-bottom-light js-tabs-controls">
                                    <button
                                        className={`text-light-1 lh-12 tabs__button js-tabs-button ${
                                            activeTab == 1 ? "is-active" : ""
                                        } `}
                                        data-tab-target=".-tab-item-1"
                                        type="button"
                                        onClick={() => setActiveTab(1)}
                                    >
                                        Published
                                    </button>
                                    <button
                                        className={`text-light-1 lh-12 tabs__button js-tabs-button ml-30 ${
                                            activeTab == 2 ? "is-active" : ""
                                        } `}
                                        data-tab-target=".-tab-item-2"
                                        type="button"
                                        onClick={() => setActiveTab(2)}
                                    >
                                        Unpublished
                                    </button>
                                </div>

                                <div className="tabs__content py-30 px-30 js-tabs-content">
                                    <div className="tabs__pane -tab-item-1 is-active">
                                        <div className="row y-gap-10 justify-between">
                                            <div className="col-auto">
                                                <form
                                                    className="search-field border-light rounded-8 h-50"
                                                    onSubmit={handleSubmit}
                                                >
                                                    <input
                                                        required
                                                        className="bg-white -dark-bg-dark-2 pr-50"
                                                        type="text"
                                                        placeholder="Search Courses"
                                                    />
                                                    <button className="" type="submit">
                                                        <i className="icon-search text-light-1 text-20"></i>
                                                    </button>
                                                </form>
                                            </div>

                                            <div className="col-auto">
                                                <div className="d-flex flex-wrap y-gap-10 x-gap-20">
                                                    <div>
                                                        <div
                                                            id="dd14button"
                                                            onClick={() => {
                                                                document.getElementById("dd14button")?.classList.toggle("-is-dd-active");
                                                                document.getElementById("dd14content")?.classList.toggle("-is-el-visible");
                                                            }}
                                                            className="dropdown js-dropdown js-category-active"
                                                        >
                                                            <div
                                                                className="dropdown__button d-flex items-center text-14 bg-white -dark-bg-dark-2 border-light rounded-8 px-20 py-10 text-14 lh-12"
                                                                data-el-toggle=".js-category-toggle"
                                                                data-el-toggle-active=".js-category-active"
                                                            >
                                                                <span className="js-dropdown-title">
                                                                    {currentCategory != 0 ? currentCategory : 'Categories'}
                                                                </span>
                                                                <i className="icon text-9 ml-40 icon-chevron-down"></i>
                                                            </div>

                                                            <div
                                                                id="dd14content"
                                                                className="toggle-element -dropdown -dark-bg-dark-2 -dark-border-white-10 js-click-dropdown js-category-toggle"
                                                            >
                                                                <div className="text-14 y-gap-15 js-dropdown-list">
                                                                    <div
                                                                        onClick={() =>
                                                                            setCurrentCategory(0)
                                                                        }
                                                                        className={`d-block js-dropdown-link cursor ${
                                                                            currentCategory === 0
                                                                                ? "activeMenu"
                                                                                : ""
                                                                        } `}
                                                                    >
                                                                        <span
                                                                            style={{cursor: "pointer"}}
                                                                            className="d-block js-dropdown-link"
                                                                        >
                                                                            All Categories
                                                                        </span>
                                                                    </div>
                                                                    {categories?.map((item, ind) => (
                                                                        <div
                                                                            onClick={() =>
                                                                                setCurrentCategory(item.id)
                                                                            }
                                                                            key={ind}
                                                                            className={`d-block js-dropdown-link cursor ${
                                                                                currentCategory === 0
                                                                                    ? "activeMenu"
                                                                                    : ""
                                                                            } `}
                                                                        >
                                                                            <span
                                                                                style={{cursor: "pointer"}}
                                                                                className="d-block js-dropdown-link"
                                                                            >
                                                                                {item.name}
                                                                            </span>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row y-gap-30 pt-30">
                                            {pageItems?.length === 0 && <h3>No courses found!</h3>}
                                            {pageItems?.length > 0 && pageItems?.map((course: Course, i: any) => (
                                                <CoursesCardDashboard course={course} key={i}/>
                                            ))}
                                        </div>

                                        <div className="row justify-center pt-30">
                                            <div className="col-auto">
                                                {/*<Pagination/>*/}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <FooterDashboard/>
        </div>
    )
}

export default MyCreatedCourses;