const { withFaust } = require("@faustjs/next");

/**
 * @type {import('next').NextConfig}
 **/

const webpack = require("webpack");
module.exports = withFaust({
  env: {
    WPURL: process.env.NEXT_PUBLIC_WORDPRESS_URL,
  },
  trailingSlash: true,
  images: {
    domains: ["myriadsolutionz.com", "localhost", "http://localhost/myriadsolutionz", "https://myriadsolutionz.vercel.app","https://codywebz.com/myriadsolutionz"],
    minimumCacheTTL: 60,
    layoutRaw: true,
  },
  staticPageGenerationTimeout: 10000,
});
