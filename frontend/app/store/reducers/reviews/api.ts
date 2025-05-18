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
    }),
});

export const { useGetReviewsForCourseQuery } = ReviewApi;
