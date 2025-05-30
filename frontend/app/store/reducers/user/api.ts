import { createApi } from "@reduxjs/toolkit/query/react";
import DynamicBaseQuery from "@/app/store/dynamic-base-query";
import { User } from "@/app/models/user.interface";
import { Response } from "@/app/models/request.interface";
import { Course } from "@/app/models/course.interface";

export const UserApi = createApi({
    baseQuery: DynamicBaseQuery,
    endpoints: (builder) => ({
        me: builder.query<Response<User>, void>({
            query: () => "/users/me",
        }),
        updateProfile: builder.mutation<
            User,
            Omit<User, "id" | "created_at" | "is_admin" | "is_instructor" | "is_active" | "username">
        >({
            query: (data) => ({
                url: "/users/profile",
                method: "PUT",
                body: data,
            }),
        }),
        getUserInfo: builder.query<Response<User>, { username: string }>({
            query: ({ username }) => `/users/user-info/${username}`,
        }),
        getInstructorCourses: builder.query<Response<Course[]>, { user_id: number }>({
            query: ({ user_id }) => `/users/instructor-courses/${user_id}`,
        }),
        getInstructorStats: builder.query<
            Response<{ total_students: number; total_reviews: number }>,
            { user_id: number }
        >({
            query: ({ user_id }) => `/users/instructor-stats/${user_id}`,
        }),
    }),
});

export const {
    useMeQuery,
    useUpdateProfileMutation,
    useGetUserInfoQuery,
    useGetInstructorCoursesQuery,
    useGetInstructorStatsQuery,
} = UserApi;
