/** @type {import('next').NextConfig} */

const isGithubActions = process.env.GITHUB_ACTIONS || false;

const GHConfig = {
  output: "export",
};

const basePath = "/cartographers";

const nextConfig = {
  basePath: basePath,

  images: {
    unoptimized: true,
  },

  ...(isGithubActions && GHConfig),

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

module.exports = nextConfig;
//export default nextConfig;
