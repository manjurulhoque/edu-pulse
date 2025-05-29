"use server";

import { store } from "../store";
import { LessonApi } from "../store/reducers/lessons/api";

export async function getLastAccessedLesson(slug: string) {
    const result = await store.dispatch(LessonApi.endpoints.getLastAccessedLesson.initiate({ slug }));
    if ("error" in result) {
        return null;
    }
    return result.data;
}

export async function getLesson(lesson_id: number) {
    const result = await store.dispatch(LessonApi.endpoints.getLesson.initiate({ lesson_id }));
    if ("error" in result) {
        return null;
    }
    return result.data;
}

export async function getCourseLessons(slug: string) {
    const result = await store.dispatch(LessonApi.endpoints.getCourseLessons.initiate({ slug }));
    if ("error" in result) {
        return null;
    }
    return result.data;
}

export async function markLessonAsStarted(lesson_id: number) {
    const result = await store.dispatch(LessonApi.endpoints.markLessonAsStarted.initiate({ lesson_id }));
    if ("error" in result) {
        return null;
    }
    return result.data;
}
