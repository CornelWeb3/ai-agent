import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "i.ytimg.com",
            },
            {
                protocol: "https",
                hostname: "yt3.ggpht.com",
            },
            {
                protocol: "https",
                hostname: "sl.bing.net"
            },
            {
                protocol: "https",
                hostname: "images.app.goo.gl"
            }

        ],
    },
};

export default nextConfig;