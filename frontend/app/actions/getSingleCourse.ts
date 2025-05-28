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
