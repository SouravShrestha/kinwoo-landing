import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  // OpenNext only resizes images through a Cloudflare Images binding, which this app does not use.
  images: { unoptimized: true },
  eslint: { ignoreDuringBuilds: true },
  // Canonical host is www. The apex is routed to this Worker only to redirect.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "kinwoo.in" }],
        destination: "https://www.kinwoo.in/:path*",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
        ],
      },
    ];
  },
};

export default nextConfig;
