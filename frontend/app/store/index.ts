import { configureStore } from "@reduxjs/toolkit";
import { CategoryApi } from "@/app/store/reducers/categories/api";
import { CourseApi } from "@/app/store/reducers/courses/api";
import { CartApi } from "./reducers/cart/api";
import { StatisticsApi } from "./reducers/statistics/api";
import { AdminApi } from "./reducers/admin/api";
import { UserApi } from "./reducers/user/api";
import { ReviewApi } from "./reducers/reviews/api";
import { WishlistApi } from "./reducers/wishlist/api";
import { LessonApi } from "./reducers/lessons/api";

export const store: any = configureStore({
    reducer: {
        [CategoryApi.reducerPath]: CategoryApi.reducer,
        [CourseApi.reducerPath]: CourseApi.reducer,
        [CartApi.reducerPath]: CartApi.reducer,
        [StatisticsApi.reducerPath]: StatisticsApi.reducer,
        [AdminApi.reducerPath]: AdminApi.reducer,
        [UserApi.reducerPath]: UserApi.reducer,
        [ReviewApi.reducerPath]: ReviewApi.reducer,
        [WishlistApi.reducerPath]: WishlistApi.reducer,
        [LessonApi.reducerPath]: LessonApi.reducer,
    },
    devTools: true,
    middleware: (getDefaultMiddleware: any) =>
        getDefaultMiddleware({}).concat(
            CategoryApi.middleware,
            CourseApi.middleware,
            CartApi.middleware,
            StatisticsApi.middleware,
            AdminApi.middleware,
            UserApi.middleware,
            ReviewApi.middleware,
            WishlistApi.middleware,
            LessonApi.middleware
        ),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
