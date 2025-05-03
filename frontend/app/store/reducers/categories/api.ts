import { createApi } from "@reduxjs/toolkit/query/react";
import DynamicBaseQuery from "@/app/store/dynamic-base-query";


export const CategoryApi = createApi({
    reducerPath: "CategoryApi",
    refetchOnFocus: true,
    baseQuery: DynamicBaseQuery,
    tagTypes: ['Category'],
    endpoints: (builder) => ({
        categories: builder.query<Category[], null>({
            query: () => {
                return {
                    url: `categories/`,
                }
            },
            providesTags: ['Category'],
            transformResponse: (rawResult: { data: Category[], message: string }, meta) => {
                const { data } = rawResult;
                return data;
            },
        })
    })
});

export const {
    useCategoriesQuery
} = CategoryApi;