/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        domains:['lh3.googleusercontent.com','img.clerk.com']
    },
    // Ensure correct link handling in production
    trailingSlash: false,
    // Add the production URL as an environment variable
    env: {
        NEXT_PUBLIC_VERCEL_URL: 'https://ai-recruiter-nu.vercel.app',
    },
    // Webpack configuration to suppress cache warnings
    webpack: (config, { dev, isServer }) => {
        // Suppress the webpack cache warning about big strings
        if (dev) {
            config.infrastructureLogging = {
                level: 'error',
            }
        }
        return config
    },
};

export default nextConfig;