/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // webpack(config) {
  //   config.experiments = { ...config.experiments, topLevelAwait: true };
  //   return config;
  // },
  images: {
    domains: ['localhost','cdn.discordapp.com','sites.techvoice.lk']
  }
  
};

export default nextConfig;
