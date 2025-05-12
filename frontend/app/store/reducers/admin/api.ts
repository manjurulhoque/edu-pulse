import { createApi } from "@reduxjs/toolkit/query/react";
import DynamicBaseQuery from "@/app/store/dynamic-base-query";
import { PaginatedResponse, PaginationArgs } from "@/app/models/request.interface";
import { Course } from "@/app/models/course.interface";
import { User } from "@/app/models/user.interface";

export const AdminApi = createApi({
    reducerPath: "AdminApi",
    baseQuery: DynamicBaseQuery,
    tagTypes: ["Admin"],
    endpoints: (builder) => ({
        adminGetCourses: builder.query<PaginatedResponse<Course>, PaginationArgs>({
            query: ({ page, page_size }) => {
                return {
                    url: "/admin/courses",
                    params: { page, page_size },
                };
            },
        }),
        adminGetUsers: builder.query<PaginatedResponse<User>, PaginationArgs>({
            query: ({ page, page_size }) => {
                return {
                    url: "/admin/users",
                    params: { page, page_size },
                };
            },
            providesTags: ["Admin"],
        }),
        adminUpdateUser: builder.mutation({
            query: ({ id, formData }) => {
                return {
                    url: `/admin/users/${id}`,
                    method: "PUT",
                    body: formData,
                };
            },
            invalidatesTags: ["Admin"],
        }),
        adminDeleteUser: builder.mutation({
            query: (id) => {
                return {
                    url: `/admin/users/${id}`,
                    method: "DELETE",
                };
            },
            invalidatesTags: ["Admin"],
        }),
    }),
});

export const {
    useAdminGetCoursesQuery,
    useAdminGetUsersQuery,
    useAdminUpdateUserMutation,
    useAdminDeleteUserMutation,
} = AdminApi;
