import { createApi } from "@reduxjs/toolkit/query/react";
import DynamicBaseQuery from "@/app/store/dynamic-base-query";
import { Response } from "@/app/models/request.interface";
import { CourseReview } from "@/app/models/review.interface";

export const ReviewApi = createApi({
    reducerPath: "ReviewApi",
    refetchOnFocus: true,
    baseQuery: DynamicBaseQuery,
    tagTypes: ["Reviews"],
    endpoints: (builder) => ({
        getReviewsForCourse: builder.query<Response<CourseReview[]>, { courseId: number }>({
            query: ({ courseId }) => ({
                url: `reviews/courses/${courseId}`,
            }),
        }),
        createReview: builder.mutation<
            Response<CourseReview>,
            { courseId: number; review: { rating: number; comment?: string } }
        >({
            query: ({ courseId, review }) => ({
                url: `reviews/courses/${courseId}`,
                method: "POST",
                body: review,
            }),
        }),
        getMyReviewForCourse: builder.query<Response<CourseReview>, { courseId: number }>({
            query: ({ courseId }) => ({
                url: `reviews/courses/${courseId}/my-review`,
            }),
        }),
        getAverageRatingForCourse: builder.query<Response<number>, { courseId: number }>({
            query: ({ courseId }) => ({
                url: `reviews/courses/${courseId}/average-rating`,
            }),
        }),
        getRatingDistributionForCourse: builder.query<
            Response<{ distribution: { [key: string]: number }; total_reviews: number }>,
            { courseId: number }
        >({
            query: ({ courseId }) => ({
                url: `reviews/courses/${courseId}/rating-distribution`,
            }),
        }),
    }),
});

export const {
    useGetReviewsForCourseQuery,
    useCreateReviewMutation,
    useGetMyReviewForCourseQuery,
    useGetAverageRatingForCourseQuery,
    useGetRatingDistributionForCourseQuery,
} = ReviewApi;
