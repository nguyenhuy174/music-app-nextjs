const { hostname } = require('os')

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: 'gasvmjyulnnveoaizmjl.supabase.co'
            },
        ]
    }
}

module.exports = nextConfig
