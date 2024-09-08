"use client";

import {QueryClientProvider, QueryClient} from "@tanstack/react-query";
import React, {useState} from "react";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

const ReactQueryProvider = ({children}: { children: React.ReactNode }) => {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
};

export default ReactQueryProvider;