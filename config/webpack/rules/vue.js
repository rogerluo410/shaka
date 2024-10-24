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
    ],
  },
  resolve: {
    alias: {
      vue: "@vue/compat",
    },
    extensions: [".vue"],
  },
};
