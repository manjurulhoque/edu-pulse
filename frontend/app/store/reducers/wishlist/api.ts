import { createApi } from "@reduxjs/toolkit/query/react";
import DynamicBaseQuery from "@/app/store/dynamic-base-query";
import { Course } from "@/app/models/course.interface";
import { Response } from "@/app/models/request.interface";

export const WishlistApi = createApi({
    reducerPath: "WishlistApi",
    baseQuery: DynamicBaseQuery,
    tagTypes: ["Wishlist"],
    endpoints: (builder) => ({
        getWishlist: builder.query<Response<Course[]>, void>({
            query: () => "/wishlist",
            providesTags: ["Wishlist"],
        }),
        addToWishlist: builder.mutation<Response<Course>, { course_id: number }>({
            query: ({ course_id }) => ({
                url: "/wishlist",
                method: "POST",
                body: { course_id },
            }),
            invalidatesTags: ["Wishlist"],
        }),
        removeFromWishlist: builder.mutation<Response<Course>, { course_id: number }>({
            query: ({ course_id }) => ({
                url: "/wishlist",
                method: "DELETE",
                body: { course_id },
            }),
            invalidatesTags: ["Wishlist"],
        }),
        alreadyInWishlist: builder.query<Response<boolean>, { course_id: number }>({
            query: ({ course_id }) => ({
                url: `/wishlist/already-in-wishlist/${course_id}`,
            }),
        }),
    }),
});

export const {
    useGetWishlistQuery,
    useAddToWishlistMutation,
    useRemoveFromWishlistMutation,
    useAlreadyInWishlistQuery,
} = WishlistApi;
