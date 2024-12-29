import { getSession } from "next-auth/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const DynamicBaseQuery = async (args: any, api: any, extraOptions: any) => {
    const session = await getSession();
    const  BACKEND_BASE_URL = process.env.BACKEND_DOCKER_BASE_URL;
    return fetchBaseQuery({
        baseUrl: `${BACKEND_BASE_URL}`,
        prepareHeaders: (headers) => {
            if (session?.access) {
                headers.set('Authorization', `Bearer ${session.access}`);
            }
            return headers;
        },
    })(args, api, extraOptions);
};

export default DynamicBaseQuery;