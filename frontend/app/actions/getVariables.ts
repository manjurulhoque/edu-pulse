export async function getVariables() {
    return {
        BACKEND_BASE_URL: process.env.BACKEND_BASE_URL,
        BASE_URL: process.env.BASE_URL,
    };
}
