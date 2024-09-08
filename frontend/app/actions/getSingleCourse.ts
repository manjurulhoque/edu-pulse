"use server";


import {store} from "@/app/store";
import {CourseApi} from "@/app/store/reducers/courses/api";

export async function getSingleCourse(slug: string) {
    const result = await store.dispatch(CourseApi.endpoints.singleCourse.initiate({slug}));

    if ('error' in result) {
        throw new Error(result.error.data?.message || "Failed to fetch the course.");
    }

    return result.data;
}
