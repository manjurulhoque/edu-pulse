import { createApi } from "@reduxjs/toolkit/query/react";
import DynamicBaseQuery from "@/app/store/dynamic-base-query";
import { Lesson } from "@/app/models/lesson.interface";
import { Response } from "@/app/models/request.interface";

export const LessonApi = createApi({
    baseQuery: DynamicBaseQuery,
    reducerPath: "lesson",
    tagTypes: ["Lesson", "LastAccessedLesson"],
    keepUnusedDataFor: 0,
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
        markLessonAsStarted: builder.mutation<Response<Lesson>, { lesson_id: number }>({
            query: ({ lesson_id }) => ({
                url: `/enrollments/mark-lesson-as-started`,
                method: "POST",
                body: { lesson_id },
            }),
        }),
        markLessonAsCompleted: builder.mutation<Response<Lesson>, { lesson_id: number }>({
            query: ({ lesson_id }) => ({
                url: `/enrollments/mark-lesson-as-completed`,
                method: "POST",
                body: { lesson_id },
            }),
        }),
        markLessonAsIncomplete: builder.mutation<Response<Lesson>, { lesson_id: number }>({
            query: ({ lesson_id }) => ({
                url: `/enrollments/mark-lesson-as-incomplete`,
                method: "POST",
                body: { lesson_id },
            }),
        }),
    }),
});

export const {
    useGetCourseLessonsQuery,
    useGetLessonQuery,
    useGetLastAccessedLessonQuery,
    useMarkLessonAsCompletedMutation,
    useMarkLessonAsIncompleteMutation,
} = LessonApi;
