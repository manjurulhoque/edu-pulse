/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['avatar.iran.liara.run', '127.0.0.1'],
    },
    logging: {
        fetches: {
            fullUrl: true
        }
    },
    env: {
        BACKEND_BASE_URL: process.env.BACKEND_BASE_URL,
    }
}

module.exports = nextConfig
