import { createApi } from "@reduxjs/toolkit/query/react";
import DynamicBaseQuery from "@/app/store/dynamic-base-query";
import { Lesson } from "@/app/models/lesson.interface";
import { Response } from "@/app/models/request.interface";

export const LessonApi = createApi({
    baseQuery: DynamicBaseQuery,
    reducerPath: "lesson",
    tagTypes: ["Lesson", "LastAccessedLesson"],
    endpoints: (builder) => ({
        getCourseLessons: builder.query<Response<Lesson[]>, { slug: string }>({
            query: ({ slug }) => `/lessons/course/${slug}`,
        }),
        getLesson: builder.query<Response<Lesson>, { lesson_id: number }>({
            query: ({ lesson_id }) => `/lessons/${lesson_id}`,
        }),
        getLastAccessedLesson: builder.query<Response<Lesson>, { slug: string }>({
            query: ({ slug }) => `/lessons/last-accessed/${slug}`,
        }),
    }),
});

export const { useGetCourseLessonsQuery, useGetLessonQuery, useGetLastAccessedLessonQuery } = LessonApi;
