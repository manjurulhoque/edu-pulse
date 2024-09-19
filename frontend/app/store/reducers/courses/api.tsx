import {createApi} from "@reduxjs/toolkit/query/react";
import DynamicBaseQuery from "@/app/store/dynamic-base-query";


export const CourseApi = createApi({
    reducerPath: "CourseApi",
    refetchOnFocus: true,
    baseQuery: DynamicBaseQuery,
    tagTypes: ['Courses', 'Course'],
    endpoints: (builder) => ({
        allCourses: builder.query<PaginatedResponse<Course>, PaginationArgs>({
            query: ({page, page_size}) => {
                return {
                    url: "all-courses/",
                    params: {page, page_size}
                }
            },
            providesTags: ['Courses'],
            transformResponse: (rawResult: { data: PaginatedResponse<Course>, message: string }, meta) => {
                const {data} = rawResult;
                return data;
            },
        }),
        singleCourse: builder.query<Course, { slug: string }>({
            query: ({slug}) => {
                return {
                    url: `course/${slug}`,
                }
            },
            transformResponse: (rawResult: { data: Course, message: string }, meta) => {
                const {data} = rawResult;
                return data;
            },
        }),
        myCreatedCourses: builder.query<Course[], null>({
            query: () => {
                return {
                    url: 'my-created-courses/',
                }
            },
            providesTags: ['Course'],
            transformResponse: (rawResult: { data: Course[], message: string }, meta) => {
                const {data} = rawResult;
                return data;
            },
        }),
        createCourse: builder.mutation({
            query: (formData) => {
                return {
                    url: 'create-course/',
                    method: 'POST',
                    body: formData,
                }
            },
            invalidatesTags: ['Course']
        }),
        updateCourse: builder.mutation({
            query: ({id, formData}) => {
                return {
                    url: `update-course/${id}/`,
                    method: 'PUT',
                    body: formData,
                }
            },
            invalidatesTags: ['Course']
        }),
        publishCourse: builder.mutation({
            query: (formData) => {
                return {
                    url: 'publish-course/',
                    method: 'POST',
                    body: formData,
                }
            },
            invalidatesTags: ['Course']
        }),
        updateCurriculum: builder.mutation({
            query: ({id, formData}) => {
                return {
                    url: `/course/${id}/update-curriculum/`,
                    method: 'PUT',
                    body: formData,
                }
            },
            invalidatesTags: ['Course'] // used to specify tags that should be invalidated when a particular mutation is performed. This helps in managing cache updates efficiently.
        }),
    })
});

export const {
    useAllCoursesQuery,
    useSingleCourseQuery,
    useCreateCourseMutation,
    useUpdateCourseMutation,
    useMyCreatedCoursesQuery,
    usePublishCourseMutation,
    useUpdateCurriculumMutation,
} = CourseApi;