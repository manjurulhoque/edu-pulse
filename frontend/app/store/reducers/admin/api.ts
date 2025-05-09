import { createApi } from "@reduxjs/toolkit/query/react";
import DynamicBaseQuery from "@/app/store/dynamic-base-query";
import { PaginatedResponse, PaginationArgs, Response } from "@/app/models/request.interface";
import { Course } from "@/app/models/course.interface";

export const AdminApi = createApi({
    reducerPath: "AdminApi",
    baseQuery: DynamicBaseQuery,
    tagTypes: ["Admin"],
    endpoints: (builder) => ({
        adminGetCourses: builder.query<
            Response<PaginatedResponse<Course>>,
            PaginationArgs
        >({
            query: ({ page, page_size }) => {
                return {
                    url: "/admin/courses",
                    params: { page, page_size },
                };
            },
        }),
    }),
});

export const { useAdminGetCoursesQuery } = AdminApi;
