"use server";


import {store} from "@/app/store";
import {CourseApi} from "@/app/store/reducers/courses/api";

export async function getCourseDetails(slug: string) {
    const result = await store.dispatch(CourseApi.endpoints.courseDetails.initiate({slug}));

    if ('error' in result) {
        throw new Error(result.error.data?.message || "Failed to fetch the course.");
    }

    return result.data;
}
