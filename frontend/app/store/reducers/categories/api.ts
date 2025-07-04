import { createApi } from "@reduxjs/toolkit/query/react";
import DynamicBaseQuery from "@/app/store/dynamic-base-query";
import { Category } from "@/app/models/category.interface";

export const CategoryApi = createApi({
    reducerPath: "CategoryApi",
    refetchOnFocus: true,
    baseQuery: DynamicBaseQuery,
    tagTypes: ["Category"],
    endpoints: (builder) => ({
        categories: builder.query<Category[], null>({
            query: () => {
                return {
                    url: `categories`,
                };
            },
            providesTags: ["Category"],
            transformResponse: (rawResult: { data: Category[]; message: string }, meta) => {
                const { data } = rawResult;
                return data;
            },
        }),
        categoryDetails: builder.query<Category, { slug: string }>({
            query: ({ slug }) => {
                return {
                    url: `categories/${slug}`,
                };
            },
            providesTags: ["Category"],
        }),
    }),
});

export const { useCategoriesQuery, useCategoryDetailsQuery } = CategoryApi;
