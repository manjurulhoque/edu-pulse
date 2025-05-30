"use server";

import { store } from "@/app/store";
import { CourseApi } from "@/app/store/reducers/courses/api";

export async function getCourseDetails(slug: string) {
    const result = await store.dispatch(CourseApi.endpoints.courseDetails.initiate({ slug }));

    if ("error" in result) {
        console.log(result);
        return null;
    }

    return result.data;
}

export async function getCourseProgress(course_id: number) {
    const result = await store.dispatch(CourseApi.endpoints.getCourseProgress.initiate({ course_id }));

    if ("error" in result) {
        console.log(result);
        return 0;
    }
    return result.data || 0;
}
