/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Ye Next.js ko "Static" banata hai taaki APK ban sake
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
