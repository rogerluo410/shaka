const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
  plugins: [new VueLoaderPlugin()],
  module: {
    rules: [
      {
        test: /\.vue(\.erb)?$/,
        loader: "vue-loader",
        options: {
          compilerOptions: {
            compatConfig: {
              MODE: 2,
            },
          },
        },
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.ts$/,
        loader: "ts-loader",
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/],
          transpileOnly: false,
          onlyCompileBundledFiles: true,
        },
      },
    ],
  },
  resolve: {
    alias: {
      vue: "@vue/compat",
    },
    extensions: [".js", ".ts", ".tsx", ".vue"],
  },
};
