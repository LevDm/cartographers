/** @type {import('next').NextConfig} */

const basePath = "/cartographers";

const nextConfig = {
  basePath: basePath,
  output: "export",

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

export default nextConfig;
