/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
    },
    images: {
        domains: [
            'nmyapppapvrhrnlhgsra.supabase.co'
        ]
    }
}

module.exports = nextConfig
