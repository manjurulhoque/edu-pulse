import { configureStore } from '@reduxjs/toolkit'
import { CategoryApi } from "@/app/store/reducers/categories/api";
import { CourseApi } from "@/app/store/reducers/courses/api";

export const store: any = configureStore({
    reducer: {
        [CategoryApi.reducerPath]: CategoryApi.reducer,
        [CourseApi.reducerPath]: CourseApi.reducer,
    },
    devTools: true,
    middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware({}).concat(CategoryApi.middleware, CourseApi.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch