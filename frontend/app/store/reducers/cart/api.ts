import { createApi } from "@reduxjs/toolkit/query/react";
import DynamicBaseQuery from "@/app/store/dynamic-base-query";
import { Cart, CartItem } from "@/app/models/cart.interface";

export const CartApi = createApi({
    reducerPath: "CartApi",
    refetchOnFocus: true,
    baseQuery: DynamicBaseQuery,
    tagTypes: ["Cart"],
    endpoints: (builder) => ({
        getCart: builder.query<Cart, null>({
            query: () => ({
                url: `cart`,
            }),
            providesTags: ["Cart"],
            transformResponse: (response: { data: Cart }) => response.data,
        }),
        addToCart: builder.mutation<CartItem, number>({
            query: (courseId) => ({
                url: `cart/add/${courseId}`,
                method: "POST",
            }),
            invalidatesTags: ["Cart"],
            transformResponse: (response: { data: CartItem }) => response.data,
        }),
        removeFromCart: builder.mutation<void, number>({
            query: (courseId) => ({
                url: `cart/remove/${courseId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Cart"],
        }),
        clearCart: builder.mutation<void, void>({
            query: () => ({
                url: `cart/clear`,
                method: "DELETE",
            }),
            invalidatesTags: ["Cart"],
        }),
        createCheckout: builder.mutation<void, {
                full_name: string;
                address: string;
                city: string;
                country: string;
                zip_code: string;
            }
        >({
            query: (checkout) => ({
                url: `checkout`,
                method: "POST",
                body: checkout,
            }),
            invalidatesTags: ["Cart"],
        }),
    }),
});

export const {
    useGetCartQuery,
    useAddToCartMutation,
    useRemoveFromCartMutation,
    useClearCartMutation,
    useCreateCheckoutMutation,
} = CartApi;
