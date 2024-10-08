/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["avatar.iran.liara.run", "127.0.0.1", "backend", "localhost", "plus.unsplash.com", "images.unsplash.com"],
    },
    logging: {
        fetches: {
            fullUrl: true,
        },
    },
    env: {
        BACKEND_DOCKER_BASE_URL: process.env.BACKEND_DOCKER_BASE_URL,
        BACKEND_BASE_URL: process.env.BACKEND_BASE_URL,
        // NEXT_PUBLIC_BACKEND_BASE_URL: "http://localhost:8080",
        BASE_URL: "http://localhost:3000",
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
        NEXTAUTH_URL: process.env.NEXTAUTH_URL
    },
};

module.exports = nextConfig;
