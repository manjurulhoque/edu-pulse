"use client";

import { useGetCoursesByCategoryQuery } from "@/app/store/reducers/courses/api";
import { useParams } from "next/navigation";

const CategoryCourses = () => {
    const { slug } = useParams();
    const { data, isLoading, error } = useGetCoursesByCategoryQuery({
        category_slug: slug as string,
    });
    return (
        <div>
            <h1>Category Courses</h1>
        </div>
    );
};

export default CategoryCourses;
