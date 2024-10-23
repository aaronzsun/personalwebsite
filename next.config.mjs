/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
      return [
        {
          source: '/resume',
          destination: '/resume_website.pdf', // This assumes the file is in the public folder
          permanent: true, // Set to true for a 301 redirect (permanent)
        },
      ];
    },
  };

export default nextConfig;
