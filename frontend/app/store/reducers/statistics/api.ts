import { createApi } from "@reduxjs/toolkit/query/react";
import DynamicBaseQuery from "@/app/store/dynamic-base-query";
import { Response } from "@/app/models/request.interface";

interface Statistics {
    total_enrolled_courses: number;
    total_completed_courses: number;
    total_lessons_completed: number;
    total_time_spent: number;
    certificates_earned: number;
    recent_activity: number;
}

export const StatisticsApi = createApi({
    reducerPath: "StatisticsApi",
    refetchOnFocus: true,
    baseQuery: DynamicBaseQuery,
    tagTypes: ["Statistics"],
    endpoints: (builder) => ({
        getDashboardStatistics: builder.query<Statistics, void>({
            query: () => {
                return {
                    url: "dashboard/statistics",
                };
            },
            providesTags: ["Statistics"],
            transformResponse: (rawResult: { data: Statistics; message: string }, meta) => {
                const { data } = rawResult;
                return data;
            },
        }),
    }),
});

export const { useGetDashboardStatisticsQuery } = StatisticsApi;
