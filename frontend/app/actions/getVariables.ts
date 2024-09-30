export async function getVariables(slug: string) {
    return {
        BACKEND_BASE_URL: process.env.BACKEND_BASE_URL,
        NEXT_PUBLIC_BACKEND_BASE_URL: process.env.NEXT_PUBLIC_BACKEND_BASE_URL,
    };
}
