"use server";

import { store } from "../store";
import { UserApi } from "../store/reducers/user/api";

export async function getUserInfo(username: string) {
    const result = await store.dispatch(UserApi.endpoints.getUserInfo.initiate({ username }));
    console.log(result);
    if ("error" in result) {
        return null;
    }
    return result.data;
}
