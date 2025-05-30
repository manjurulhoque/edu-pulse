import { createApi } from "@reduxjs/toolkit/query/react";
import DynamicBaseQuery from "@/app/store/dynamic-base-query";
import { PaginationArgs, Response, PaginatedResponse } from "@/app/models/request.interface";
import { Course } from "@/app/models/course.interface";

export const CourseApi = createApi({
    reducerPath: "CourseApi",
    refetchOnFocus: true,
    baseQuery: DynamicBaseQuery,
    tagTypes: ["Courses", "Course"],
    endpoints: (builder) => ({
        allCourses: builder.query<PaginatedResponse<Course>, PaginationArgs>({
            query: ({ page, page_size }) => {
                return {
                    url: "all-courses",
                    params: { page, page_size },
                };
            },
            providesTags: ["Courses"],
            transformResponse: (rawResult: { data: PaginatedResponse<Course>; message: string }, meta) => {
                const { data } = rawResult;
                return data;
            },
        }),
        courseDetails: builder.query<Course, { slug: string }>({
            query: ({ slug }) => {
                return {
                    url: `course/${slug}`,
                };
            },
            transformResponse: (rawResult: { data: Course; message: string }, meta) => {
                const { data } = rawResult;
                return data;
            },
        }),
        myCreatedCourses: builder.query<PaginatedResponse<Course>, PaginationArgs>({
            query: ({ page, page_size }) => {
                return {
                    url: "my-created-courses",
                    params: { page, page_size },
                };
            },
            providesTags: ["Course"],
        }),
        createCourse: builder.mutation({
            query: (formData) => {
                return {
                    url: "create-course/",
                    method: "POST",
                    body: formData,
                };
            },
            invalidatesTags: ["Course"],
        }),
        updateCourse: builder.mutation({
            query: ({ id, formData }) => {
                return {
                    url: `update-course/${id}`,
                    method: "PUT",
                    body: formData,
                };
            },
            invalidatesTags: ["Course"],
        }),
        publishCourse: builder.mutation({
            query: (formData) => {
                return {
                    url: "publish-course/",
                    method: "POST",
                    body: formData,
                };
            },
            invalidatesTags: ["Course"],
        }),
        updateCurriculum: builder.mutation({
            query: ({ id, formData }) => {
                return {
                    url: `/course/${id}/update-curriculum/`,
                    method: "PUT",
                    body: formData,
                };
            },
            invalidatesTags: ["Course"], // used to specify tags that should be invalidated when a particular mutation is performed. This helps in managing cache updates efficiently.
        }),
        getCoursesByCategory: builder.query<Response<Course[]>, { category_slug: string }>({
            query: ({ category_slug }) => {
                return {
                    url: `courses-by-category/${category_slug}`,
                };
            },
        }),
        getEnrolledCourses: builder.query<PaginatedResponse<Course>, PaginationArgs>({
            query: ({ page, page_size }) => {
                return {
                    url: "enrolled-courses",
                    params: { page, page_size },
                };
            },
            providesTags: ["Course"],
            transformResponse: (rawResult: { data: PaginatedResponse<Course>; message: string }, meta) => {
                const { data } = rawResult;
                return data;
            },
        }),
        courseDetailsForAdminAndInstructor: builder.query<Response<Course>, { slug: string }>({
            query: ({ slug }) => {
                return {
                    url: `course-details/${slug}`,
                };
            },
            providesTags: ["Course"],
        }),
        isAlreadyEnrolled: builder.query<Response<{ enrolled: boolean; enrolled_at: string }>, { course_id: number }>({
            query: ({ course_id }) => {
                return {
                    url: `is-already-enrolled/${course_id}`,
                };
            },
        }),
        getCourseProgress: builder.query<Response<number>, { course_id: number }>({
            query: ({ course_id }) => {
                return {
                    url: `course-progress/${course_id}`,
                };
            },
        }),
        getCourseReviewRating: builder.query<Response<{ total_review_count: number; total_rating: number; average_rating: number }>, { course_id: number }>({
            query: ({ course_id }) => {
                return {
                    url: `course-review-rating/${course_id}`,
                };
            },
        }),
    }),
});

export const {
    useAllCoursesQuery,
    useCourseDetailsQuery,
    useCreateCourseMutation,
    useUpdateCourseMutation,
    useMyCreatedCoursesQuery,
    usePublishCourseMutation,
    useUpdateCurriculumMutation,
    useGetCoursesByCategoryQuery,
    useGetEnrolledCoursesQuery,
    useCourseDetailsForAdminAndInstructorQuery,
    useIsAlreadyEnrolledQuery,
    useGetCourseProgressQuery,
    useGetCourseReviewRatingQuery,
} = CourseApi;
