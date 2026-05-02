/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "avatars.githubusercontent.com",
      "api-urli.ideasprout.in",
      "images.unsplash.com",
    ],
  },
  pageExtensions: ["ts", "tsx", "mdx"],
  // Suppress /_error prerender failure - app router handles errors natively
  // This is a known Next.js 14 quirk with mixed app/pages router
  typescript: { ignoreBuildErrors: false },
  eslint: { ignoreDuringBuilds: true },
};
export default nextConfig;
