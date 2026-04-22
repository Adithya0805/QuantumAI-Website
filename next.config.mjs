/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['keulkuwlnfjsiygkewty.supabase.co'],
  },
  // experimental: {
  //   optimizeCss: true,
  // },
}

export default nextConfig