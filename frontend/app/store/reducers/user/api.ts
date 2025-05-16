import { createApi } from "@reduxjs/toolkit/query/react";
import DynamicBaseQuery from "@/app/store/dynamic-base-query";
import { User } from "@/app/models/user.interface";

export const UserApi = createApi({
    baseQuery: DynamicBaseQuery,
    endpoints: (builder) => ({
        me: builder.query<User, void>({
            query: () => "/api/user",
        }),
        updateProfile: builder.mutation<
            User,
            Omit<User, "id" | "created_at" | "is_admin" | "is_instructor" | "is_active">
        >({
            query: (data) => ({
                url: "/api/user",
                method: "PUT",
                body: data,
            }),
        }),
    }),
});

export const { useMeQuery, useUpdateProfileMutation } = UserApi;
