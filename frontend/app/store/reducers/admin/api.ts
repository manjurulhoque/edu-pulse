import { createApi } from "@reduxjs/toolkit/query/react";
import DynamicBaseQuery from "@/app/store/dynamic-base-query";
import { PaginatedResponse, PaginationArgs } from "@/app/models/request.interface";
import { Course } from "@/app/models/course.interface";
import { User } from "@/app/models/user.interface";
import { Category } from "@/app/models/category.interface";
import { Checkout } from "@/app/models/checkout.interface";

interface AdminGetCoursesArgs extends PaginationArgs {
    sort_by?: string;
    category?: number;
    instructor?: string;
    status?: string;
    price?: string;
    date?: string;
    is_approved?: boolean;
    search?: string;
}

interface AdminGetSalesArgs extends PaginationArgs {
    sort_by?: string;
    date_range?: string;
    instructor?: string;
    search?: string;
}

export const AdminApi = createApi({
    reducerPath: "AdminApi",
    baseQuery: DynamicBaseQuery,
    tagTypes: ["Admin"],
    endpoints: (builder) => ({
        adminGetSales: builder.query<PaginatedResponse<Checkout>, AdminGetSalesArgs>({
            query: ({ page, page_size, sort_by, date_range, instructor, search }) => {
                return {
                    url: "/admin/sales",
                    params: { page, page_size, sort_by, date_range, instructor, search },
                };
            },
            providesTags: ["Admin"],
        }),
        adminGetCourses: builder.query<PaginatedResponse<Course>, AdminGetCoursesArgs>({
            query: ({ page, page_size, sort_by, category, instructor, status, price, date, search, is_approved }) => {
                return {
                    url: "/admin/courses",
                    params: {
                        page,
                        page_size,
                        sort_by,
                        category,
                        instructor,
                        status,
                        price,
                        date,
                        search,
                        is_approved,
                    },
                };
            },
        }),
        adminApproveCourse: builder.mutation({
            query: (id) => {
                return {
                    url: `/admin/courses/${id}/approve`,
                    method: "PUT",
                };
            },
            invalidatesTags: ["Admin"],
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
        adminGetCategories: builder.query<PaginatedResponse<Category>, PaginationArgs>({
            query: ({ page, page_size }) => {
                return {
                    url: "/admin/categories",
                    params: { page, page_size },
                };
            },
            providesTags: ["Admin"],
        }),
        adminCreateCategory: builder.mutation({
            query: (formData) => {
                return {
                    url: "/admin/categories",
                    method: "POST",
                    body: formData,
                };
            },
            invalidatesTags: ["Admin"],
        }),
        adminUpdateCategory: builder.mutation({
            query: ({ id, formData }) => {
                return {
                    url: `/admin/categories/${id}`,
                    method: "PUT",
                    body: formData,
                };
            },
            invalidatesTags: ["Admin"],
        }),
        adminDeleteCategory: builder.mutation({
            query: (id) => {
                return {
                    url: `/admin/categories/${id}`,
                    method: "DELETE",
                };
            },
            invalidatesTags: ["Admin"],
        }),
    }),
});

export const {
    useAdminGetSalesQuery,
    useAdminGetCoursesQuery,
    useAdminApproveCourseMutation,
    useAdminGetUsersQuery,
    useAdminUpdateUserMutation,
    useAdminDeleteUserMutation,
    useAdminGetCategoriesQuery,
    useAdminCreateCategoryMutation,
    useAdminUpdateCategoryMutation,
    useAdminDeleteCategoryMutation,
} = AdminApi;
