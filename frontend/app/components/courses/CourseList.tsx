"use client";


import React, {useState, useEffect} from "react";
import Star from "../common/Star";
import Image from "next/image";
import Link from "next/link";
import Pagination from "../common/Pagination";
import {
    levels,
    sortingOptions
} from "@/app/data/courses";
import {useAllCoursesQuery} from "@/app/store/reducers/courses/api";
import {useCategoriesQuery} from "@/app/store/reducers/categories/api";
import {GridLoader} from "react-spinners";
import {Grid} from "react-loader-spinner";

export default function CourseList() {
    const [filterOpen, setFilterOpen] = useState(false);
    const [filterCategories, setFilterCategories] = useState<string[]>([]);
    const [filterRatingRange, setFilterRatingRange] = useState([] as any);
    const [filterInstructors, setFilterInstructors] = useState([] as any);
    const [filterPrice, setFilterPrice] = useState("All");
    const [filterLevels, setFilterLevels] = useState([] as any);
    const [filterLanguage, setFilterLanguage] = useState([] as any);
    const [filterDuration, setFilterDuration] = useState([] as any);

    const [currentSortingOption, setCurrentSortingOption] = useState("Default");

    const [filteredData, setFilteredData] = useState([] as any);

    const [sortedFilteredData, setSortedFilteredData] = useState([] as any);

    const [pageNumber, setPageNumber] = useState(1);
    const [courses, setCourses] = useState<Course[]>([]);

    const {data: courseResult, isLoading: isCoursesLoading} = useAllCoursesQuery({page: pageNumber, page_size: 10});
    const {data: categories} = useCategoriesQuery(null);

    useEffect(() => {
        if (courseResult) {
            setCourses(courseResult?.results);
        }
    }, [courseResult]);

    useEffect(() => {
        const refItems = courseResult?.results.filter((elm) => {
            if (filterPrice == "All") {
                return true;
            } else if (filterPrice == "Free") {
                return elm.is_free;
            } else if (filterPrice == "Paid") {
                return !elm.is_free;
            }
        });

        let filteredArrays: any = [];

        if (filterInstructors.length > 0) {
            const filtered = refItems?.filter((elm) =>
                filterInstructors.includes(elm.user.name),
            );
            filteredArrays = [...filteredArrays, filtered];
        }
        if (filterCategories.length > 0) {
            // const filtered = refItems?.filter((elm: Course) =>
            //     filterCategories.includes(elm.category),
            // );
            // filteredArrays = [...filteredArrays, filtered];
        }
        if (filterLevels.length > 0) {
            const filtered = refItems?.filter((elm) =>
                filterLevels.includes(elm.level),
            );
            filteredArrays = [...filteredArrays, filtered];
        }
        // if (filterLanguage.length > 0) {
        //     const filtered = refItems?.filter((elm) =>
        //         filterLanguage.includes(elm.language),
        //     );
        //     filteredArrays = [...filteredArrays, filtered];
        // }
        // if (filterRatingRange.length > 0) {
        //     const filtered = refItems?.filter(
        //         (elm) =>
        //             elm.rating >= filterRatingRange[0] &&
        //             elm.rating <= filterRatingRange[1],
        //     );
        //     filteredArrays = [...filteredArrays, filtered];
        // }

        const commonItems = refItems?.filter((item) =>
            filteredArrays.every((array: any) => array.includes(item)),
        );
        setFilteredData(commonItems);
        setPageNumber(1);
    }, [
        filterCategories,
        filterRatingRange,
        filterInstructors,
        filterPrice,
        filterLevels,
        filterLanguage,
        filterDuration,
    ]);

    useEffect(() => {
        if (currentSortingOption == "Default") {
            setSortedFilteredData(filteredData);
        } else if (currentSortingOption == "Rating (asc)") {
            setSortedFilteredData(
                [...filteredData].sort((a, b) => a.rating - b.rating),
            );
        } else if (currentSortingOption == "Rating (dsc)") {
            setSortedFilteredData(
                [...filteredData].sort((a, b) => b.rating - a.rating),
            );
        } else if (currentSortingOption == "Price (asc)") {
            setSortedFilteredData(
                [...filteredData].sort((a, b) => a.discountedPrice - b.discountedPrice),
            );
        } else if (currentSortingOption == "Price (dsc)") {
            setSortedFilteredData(
                [...filteredData].sort((a, b) => b.discountedPrice - a.discountedPrice),
            );
        } else if (currentSortingOption == "Duration (asc)") {
            setSortedFilteredData(
                [...filteredData].sort((a, b) => a.duration - b.duration),
            );
        } else if (currentSortingOption == "Duration (dsc)") {
            setSortedFilteredData(
                [...filteredData].sort((a, b) => b.duration - a.duration),
            );
        }
    }, [currentSortingOption, filteredData]);

    const handleFilterCategories = (item: any) => {
        if (filterCategories.includes(item)) {
            const filtered = filterCategories.filter((elm: any) => elm != item);
            setFilterCategories([...filtered]);
        } else {
            setFilterCategories((pre: any) => [...pre, item]);
        }
    };
    const handleFilterRatingRange = (item: any) => {
        setFilterRatingRange(item);
    };
    const handleFilterInstractors = (item: any) => {
        if (filterInstructors.includes(item)) {
            const filtered = filterInstructors.filter((elm: any) => elm != item);
            setFilterInstructors([...filtered]);
        } else {
            setFilterInstructors((pre: any) => [...pre, item]);
        }
    };
    const handleFilterPrice = (item: any) => {
        setFilterPrice(item);
    };
    const handleFilterLevels = (item: any) => {
        if (filterLevels.includes(item)) {
            const filtered = filterLevels.filter((elm: any) => elm != item);
            setFilterLevels([...filtered]);
        } else {
            setFilterLevels((pre: any) => [...pre, item]);
        }
    };

    const getImageSrc = (course: Course) => {
        return `${process.env.BACKEND_BASE_URL}/${course.preview_image}`;
    }

    const getAuthorImageSrc = (course: Course) => {
        return `${process.env.BACKEND_BASE_URL}/${course.user.avatar}`;
    }

    return (
        <>
            <section className="page-header -type-1">
                <div className="container">
                    <div className="page-header__content">
                        <div className="row">
                            <div className="col-auto">
                                <div>
                                    <h1 className="page-header__title">All available Courses</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="layout-pt-md layout-pb-lg">
                <div className="container">

                    <div style={{
                        display: isCoursesLoading ? 'flex' : 'none',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100vh',
                    }}>
                        <Grid
                            visible={isCoursesLoading}
                            height="300"
                            width="300"
                            color="#4fa94d"
                            ariaLabel="grid-loading"
                            radius="12.5"
                            wrapperStyle={{}}
                            wrapperClass="grid-wrapper"
                        />
                    </div>

                    {
                        !isCoursesLoading && (
                            <>
                                <div className="accordion js-accordion">
                                    <div className={`accordion__item ${filterOpen ? "is-active" : ""} `}>
                                        <div className="row y-gap-20 items-center justify-between pb-30">
                                            <div className="col-auto">
                                                <div className="text-14 lh-12">
                                                    Showing{" "}
                                                    <span className="text-dark-1 fw-500">
                                                        {filteredData?.length}
                                                    </span>{" "}
                                                    total results
                                                </div>
                                            </div>

                                            <div className="col-auto">
                                                <div className="row x-gap-20 y-gap-20">
                                                    <div className="col-auto">
                                                        <div className="d-flex items-center">
                                                            <div className="text-14 lh-12 fw-500 text-dark-1 mr-20">
                                                                Sort by:
                                                            </div>

                                                            <div
                                                                id="dd61button"
                                                                className="dropdown js-dropdown js-category-active"
                                                            >
                                                                <div
                                                                    className="dropdown__button d-flex items-center text-14 rounded-8 px-20 py-10 text-14 lh-12"
                                                                    onClick={() => {
                                                                        document.getElementById("dd61button")?.classList.toggle("-is-dd-active");
                                                                        document.getElementById("dd61content")?.classList.toggle("-is-el-visible");
                                                                    }}
                                                                    data-el-toggle=".js-category-toggle"
                                                                    data-el-toggle-active=".js-category-active"
                                                                >
                                                                    <span className="js-dropdown-title">
                                                                        {currentSortingOption}
                                                                    </span>
                                                                    <i className="icon text-9 ml-40 icon-chevron-down"></i>
                                                                </div>

                                                                <div
                                                                    id="dd61content"
                                                                    className="toggle-element -dropdown -dark-bg-dark-2 -dark-border-white-10 js-click-dropdown js-category-toggle"
                                                                >
                                                                    <div className="text-14 y-gap-15 js-dropdown-list">
                                                                        {sortingOptions.map((elm, i) => (
                                                                            <div
                                                                                key={i}
                                                                                onClick={() => {
                                                                                    setCurrentSortingOption((pre) =>
                                                                                        pre == elm ? "Default" : elm,
                                                                                    );
                                                                                    document
                                                                                        .getElementById("dd61button")
                                                                                        ?.classList.toggle("-is-dd-active");
                                                                                    document
                                                                                        .getElementById("dd61content")
                                                                                        ?.classList.toggle("-is-el-visible");
                                                                                }}
                                                                            >
                                                                                <span
                                                                                    className={`d-block js-dropdown-link cursor ${
                                                                                        currentSortingOption == elm
                                                                                            ? "activeMenu"
                                                                                            : ""
                                                                                    } `}
                                                                                >
                                                                                    {elm}
                                                                                </span>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-auto">
                                                        <div
                                                            className="accordion__button w-unset"
                                                            onClick={() => setFilterOpen((pre) => !pre)}
                                                        >
                                                            <button className="button h-50 px-30 -light-7 text-purple-1">
                                                                <i className="icon-filter mr-10"></i>
                                                                Filter
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="accordion__content "
                                             style={filterOpen ? {maxHeight: "1800px"} : {}}>
                                            <div className="sidebar -courses px-30 py-30 rounded-8 bg-light-3 mb-50">
                                                <div className="row x-gap-60 y-gap-40">
                                                    <div className="col-xl-3 col-lg-4 col-sm-6">
                                                        <div className="sidebar__item">
                                                            <h5 className="sidebar__title">Category</h5>
                                                            <div className="sidebar-checkbox">
                                                                <div
                                                                    className="sidebar-checkbox__item"
                                                                    onClick={() => setFilterCategories([])}
                                                                >
                                                                    <div className="form-checkbox">
                                                                        <input
                                                                            type="checkbox"
                                                                            defaultChecked={!filterCategories.length}
                                                                        />
                                                                        <div className="form-checkbox__mark">
                                                                            <div
                                                                                className="form-checkbox__icon icon-check"></div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="sidebar-checkbox__title">All</div>
                                                                    <div className="sidebar-checkbox__count"></div>
                                                                </div>
                                                                {categories?.map((item, index) => (
                                                                    <div
                                                                        className="sidebar-checkbox__item cursor"
                                                                        key={index}
                                                                        onClick={() => handleFilterCategories(item.name)}
                                                                    >
                                                                        <div className="form-checkbox">
                                                                            <input
                                                                                type="checkbox"
                                                                                defaultChecked={
                                                                                    filterCategories.includes(item.name)
                                                                                }
                                                                            />
                                                                            <div className="form-checkbox__mark">
                                                                                <div
                                                                                    className="form-checkbox__icon icon-check"></div>
                                                                            </div>
                                                                        </div>

                                                                        <div className="sidebar-checkbox__title">
                                                                            {item.name}
                                                                        </div>
                                                                        <div className="sidebar-checkbox__count">
                                                                            (
                                                                            {
                                                                                courses.filter(
                                                                                    (itm) => itm.category?.id == item.id,
                                                                                ).length
                                                                            }
                                                                            )
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                            <div className="sidebar__more mt-15">
                                                                <a
                                                                    href="#"
                                                                    className="text-14 fw-500 underline text-purple-1"
                                                                >
                                                                    Show more
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-xl-3 col-lg-4 col-sm-6">
                                                        <div className="sidebar__item">
                                                            <h5 className="sidebar__title">Level</h5>
                                                            <div className="sidebar-checkbox">
                                                                <div
                                                                    className="sidebar-checkbox__item cursor"
                                                                    onClick={() => setFilterLevels([])}
                                                                >
                                                                    <div className="form-checkbox">
                                                                        <input
                                                                            type="checkbox"
                                                                            defaultChecked={filterLevels.length < 1}
                                                                        />
                                                                        <div className="form-checkbox__mark">
                                                                            <div
                                                                                className="form-checkbox__icon icon-check"></div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="sidebar-checkbox__title">All</div>
                                                                    <div className="sidebar-checkbox__count"></div>
                                                                </div>
                                                                {levels.map((item, index) => (
                                                                    <div
                                                                        className="sidebar-checkbox__item cursor"
                                                                        key={index}
                                                                        onClick={() => handleFilterLevels(item.title)}
                                                                    >
                                                                        <div className="form-checkbox">
                                                                            <input
                                                                                type="checkbox"
                                                                                defaultChecked={
                                                                                    !!filterLevels.includes(item.title)
                                                                                }
                                                                            />
                                                                            <div className="form-checkbox__mark">
                                                                                <div
                                                                                    className="form-checkbox__icon icon-check"></div>
                                                                            </div>
                                                                        </div>

                                                                        <div className="sidebar-checkbox__title">
                                                                            {item.title}
                                                                        </div>
                                                                        <div className="sidebar-checkbox__count">
                                                                            (
                                                                            {
                                                                                courses?.filter(
                                                                                    (itm) => itm.level == item.title,
                                                                                ).length
                                                                            }
                                                                            )
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row y-gap-30">
                                    {courses?.map((elm: any, i: any) => (
                                        <div key={i} className="col-xl-3 col-lg-4 col-md-6">
                                            <div className="coursesCard -type-1 ">
                                                <div className="relative">
                                                    <div className="coursesCard__image overflow-hidden rounded-8">
                                                        <Image
                                                            width={510}
                                                            height={360}
                                                            className="w-1/1"
                                                            src={getImageSrc(elm)}
                                                            alt="image"
                                                        />
                                                        <div className="coursesCard__image_overlay rounded-8"></div>
                                                    </div>
                                                    <div
                                                        className="d-flex justify-between py-10 px-10 absolute-full-center z-3">
                                                        {elm.popular && (
                                                            <>
                                                                <div>
                                                                    <div className="px-15 rounded-200 bg-purple-1">
                                                                            <span
                                                                                className="text-11 lh-1 uppercase fw-500 text-white">
                                                                                Popular
                                                                            </span>
                                                                    </div>
                                                                </div>

                                                                <div>
                                                                    <div className="px-15 rounded-200 bg-green-1">
                                                                            <span
                                                                                className="text-11 lh-1 uppercase fw-500 text-dark-1">
                                                                                Best sellers
                                                                            </span>
                                                                    </div>
                                                                </div>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="h-100 pt-15">
                                                    <div className="d-flex items-center">
                                                        <div className="text-14 lh-1 text-yellow-1 mr-10">
                                                            4.9
                                                        </div>
                                                        <div className="d-flex x-gap-5 items-center">
                                                            <Star star={4.9} textColor={null} textSize={null}/>
                                                        </div>
                                                        <div className="text-13 lh-1 ml-10">
                                                            (345)
                                                        </div>
                                                    </div>

                                                    <div className="text-17 lh-15 fw-500 text-dark-1 mt-10">
                                                        <Link
                                                            className="linkCustom"
                                                            href={`/courses/${elm.slug}`}
                                                        >
                                                            {elm.title}{" "}
                                                        </Link>
                                                    </div>

                                                    <div className="d-flex x-gap-10 items-center pt-10">
                                                        <div className="d-flex items-center">
                                                            <div className="mr-8">
                                                                <Image
                                                                    width={16}
                                                                    height={17}
                                                                    src="/assets/img/coursesCards/icons/1.svg"
                                                                    alt="icon"
                                                                />
                                                            </div>
                                                            <div className="text-14 lh-1">
                                                                35 lesson
                                                            </div>
                                                        </div>

                                                        <div className="d-flex items-center">
                                                            <div className="mr-8">
                                                                <Image
                                                                    width={16}
                                                                    height={17}
                                                                    src="/assets/img/coursesCards/icons/2.svg"
                                                                    alt="icon"
                                                                />
                                                            </div>
                                                            <div className="text-14 lh-1">{`14h 8m`}</div>
                                                        </div>

                                                        <div className="d-flex items-center">
                                                            <div className="mr-8">
                                                                <Image
                                                                    width={16}
                                                                    height={17}
                                                                    src="/assets/img/coursesCards/icons/3.svg"
                                                                    alt="icon"
                                                                />
                                                            </div>
                                                            <div className="text-14 lh-1">{elm.level}</div>
                                                        </div>
                                                    </div>

                                                    <div className="coursesCard-footer">
                                                        <div className="coursesCard-footer__author">
                                                            <Image
                                                                width={30}
                                                                height={30}
                                                                src={getAuthorImageSrc(elm)}
                                                                alt="image"
                                                            />
                                                            <div>{elm.authorName}</div>
                                                        </div>

                                                        <div className="coursesCard-footer__price">
                                                            {!elm.is_free ? (
                                                                <>
                                                                    <div>${elm.actual_price}</div>
                                                                    <div>${elm.discounted_price}</div>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <div></div>
                                                                    <div>Free</div>
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="row justify-center pt-90 lg:pt-50">
                                    <div className="col-auto">
                                        <Pagination
                                            pageNumber={pageNumber}
                                            setPageNumber={setPageNumber}
                                            data={sortedFilteredData || []}
                                            pageCapacity={12}
                                        />
                                    </div>
                                </div>
                            </>
                        )
                    }
                </div>
            </section>
        </>
    );
}