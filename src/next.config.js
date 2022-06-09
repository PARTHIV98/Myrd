const { withFaust } = require("@faustjs/next");

/**
 * @type {import('next').NextConfig}
 **/

const webpack = require("webpack");
module.exports = withFaust({
  env: {
    WPURL: process.env.NEXT_PUBLIC_WORDPRESS_URL,
  },
  trailingSlashes: undefined,
  images: {
    domains: ["myriadsolutionz.com", "localhost", "http://localhost/myriadsolutionz"],
  },
  staticPageGenerationTimeout: 1000,
});
