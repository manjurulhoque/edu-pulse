import { createApi } from "@reduxjs/toolkit/query/react";
import DynamicBaseQuery from "@/app/store/dynamic-base-query";
import { Lesson } from "@/app/models/lesson.interface";
import { Response } from "@/app/models/request.interface";

export const LessonApi = createApi({
    baseQuery: DynamicBaseQuery,
    reducerPath: "lesson",
    tagTypes: ["Lesson", "LastAccessedLesson"],
    endpoints: (builder) => ({
        getLesson: builder.query<Response<Lesson>, { lesson_id: string }>({
            query: ({ lesson_id }) => `/lessons/${lesson_id}`,
        }),
        getLastAccessedLesson: builder.query<Response<Lesson>, { course_id: string }>({
            query: ({ course_id }) => `/lessons/last-accessed/${course_id}`,
        }),
    }),
});

export const {
    useGetLessonQuery,
    useGetLastAccessedLessonQuery,
} = LessonApi;
