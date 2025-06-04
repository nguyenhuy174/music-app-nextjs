const { hostname } = require('os')

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: 'zjhxyrsdmpakubmneoxc.supabase.co'
            },
        ]
    }
}

module.exports = nextConfig
