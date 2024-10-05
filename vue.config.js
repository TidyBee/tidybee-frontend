const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  publicPath: '/',
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      fallback: {
        fs: false,
        tls: false,
        net: false,
        path: false,
        zlib: false,
        http: false,
        https: false,
        stream: false,
        crypto: false,
        "crypto-browserify": require.resolve("crypto-browserify"),
      },
    },
  },
  devServer: {
    proxy: "http://0.0.0.0:7001",
    historyApiFallback: true,
  },
});
