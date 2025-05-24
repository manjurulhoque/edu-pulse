import { getSession } from "next-auth/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getServerSession } from "next-auth";
import { authOptions } from "../utils/authOptions";

const DynamicBaseQuery = async (args: any, api: any, extraOptions: any) => {
    let session = await getSession();
    let BACKEND_BASE_URL;
    if (typeof window !== "undefined") {
        BACKEND_BASE_URL = process.env.BACKEND_BASE_URL;
    } else {
        BACKEND_BASE_URL = process.env.BACKEND_DOCKER_BASE_URL;
        session = await getServerSession(authOptions);
    }
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