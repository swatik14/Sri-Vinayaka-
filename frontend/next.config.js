/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'srivinayakatemple.org', 'images.unsplash.com', 'img.youtube.com', 'picsum.photos', 'fastly.picsum.photos', 'drive.google.com', 'lh3.googleusercontent.com'],
    formats: ['image/avif', 'image/webp'],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
  },
};

module.exports = nextConfig;
