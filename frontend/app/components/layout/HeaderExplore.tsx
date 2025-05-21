"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCategoriesQuery } from "@/app/store/reducers/categories/api";

export const HeaderExplore = ({ allClasses }: any) => {
    const [exploreActive, setExploreActive] = useState(false);
    const { data: categories, isLoading } = useCategoriesQuery(null);
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
                        {categories?.map((category: any) => (
                            <Link
                                key={category.id}
                                href={`/courses/category/${category.slug}`}
                                className="d-flex items-center justify-between text-dark-1"
                            >
                                {category.name}
                                {/* <div className="icon-chevron-right text-11"></div> */}
                            </Link>
                        ))}
                        {/* <div className="explore__subnav rounded-8">
                            <Link className="text-dark-1" href={`/courses/6`}>
                                Web Design
                            </Link>
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    );
};
