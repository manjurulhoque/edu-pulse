import { getSession } from "next-auth/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const DynamicBaseQuery = async (args: any, api: any, extraOptions: any) => {
    const session = await getSession();
    // let headers = {};
    // if (session?.access) {
    //     headers = {Authorization: `Bearer ${session.access}`};
    // }
    console.log("Backend URL: ", process.env);
    console.log("Backend URL: ", process.env.NEXT_PUBLIC_BACKEND_BASE_URL);
    return fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}`,
        prepareHeaders: (headers) => {
            if (session?.access) {
                headers.set('Authorization', `Bearer ${session.access}`);
            }
            return headers;
        },
    })(args, api, extraOptions);
};

export default DynamicBaseQuery;