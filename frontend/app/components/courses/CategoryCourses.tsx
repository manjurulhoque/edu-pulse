"use client";

import { useGetCoursesByCategoryQuery } from "@/app/store/reducers/courses/api";
import { useParams } from "next/navigation";
import { Grid } from "react-loader-spinner";
import Image from "next/image";
import Link from "next/link";
import Star from "@/app/components/common/Star";
import { Course } from "@/app/models/course.interface";

const CategoryCourses = () => {
    const { slug } = useParams();
    const { data, isLoading, error } = useGetCoursesByCategoryQuery({
        category_slug: slug as string,
    });

    if (error) {
        return <div>Something went wrong</div>;
    }

    const getImageSrc = (course: Course) => {
        return `${process.env.BACKEND_DOCKER_BASE_URL}/${course.preview_image}`;
    };

    const getAuthorImageSrc = (course: Course) => {
        return `${process.env.BACKEND_DOCKER_BASE_URL}/${course.user.avatar}`;
    };

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
                                        <div className="d-flex justify-between py-10 px-10 absolute-full-center z-3">
                                            {elm.popular && (
                                                <>
                                                    <div>
                                                        <div className="px-15 rounded-200 bg-purple-1">
                                                            <span className="text-11 lh-1 uppercase fw-500 text-white">
                                                                Popular
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <div className="px-15 rounded-200 bg-green-1">
                                                            <span className="text-11 lh-1 uppercase fw-500 text-dark-1">
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
                                            <div className="text-14 lh-1 text-yellow-1 mr-10">4.9</div>
                                            <div className="d-flex x-gap-5 items-center">
                                                <Star star={4.9} />
                                            </div>
                                            <div className="text-13 lh-1 ml-10">(345)</div>
                                        </div>

                                        <div className="text-17 lh-15 fw-500 text-dark-1 mt-10">
                                            <Link className="linkCustom" href={`/courses/${elm.slug}`}>
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
                                                <div className="text-14 lh-1">35 lesson</div>
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
                </div>
            </section>
        </>
    );
};

export default CategoryCourses;
