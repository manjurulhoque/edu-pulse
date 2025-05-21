"use client";

import { useGetCoursesByCategoryQuery } from "@/app/store/reducers/courses/api";
import { useParams } from "next/navigation";
import { Grid } from "react-loader-spinner";
import HomeCourseCard from "./HomeCourseCard";
import { Category } from "@/app/models/category.interface";

const CategoryCourses = ({ category }: { category: Category }) => {
    const { slug } = useParams();
    const { data, isLoading, error } = useGetCoursesByCategoryQuery({
        category_slug: slug as string,
    });

    return (
        <>
            <section className="page-header -type-1">
                <div className="container">
                    <div className="page-header__content">
                        <div className="row">
                            <div className="col-auto">
                                <div>
                                    <h1 className="page-header__title">{category?.name} online courses</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="layout-pt-md layout-pb-lg">
                <div className="container">
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

                    <div className="row y-gap-30">
                        {data?.data?.map((elm: any, i: any) => (
                            <HomeCourseCard key={i} course={elm} index={i} />
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default CategoryCourses;
