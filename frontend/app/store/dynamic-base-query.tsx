import { getSession } from "next-auth/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {getVariables} from "@/app/actions/getVariables";

const DynamicBaseQuery = async (args: any, api: any, extraOptions: any) => {
    const session = await getSession();
    let variables = await getVariables();
    console.log(variables);
    console.log(process.env.BACKEND_BASE_URL);
    console.log(process.env.NEXT_PUBLIC_BACKEND_BASE_URL);
    let BACKEND_BASE_URL: string;
    if (typeof window === "undefined") {
        BACKEND_BASE_URL = process.env.BACKEND_BASE_URL;
    } else {
        BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
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