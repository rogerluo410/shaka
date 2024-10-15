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
      // {
      //   test: /\.css$/,
      //   use: ["vue-style-loader", "css-loader"],
      // },
      // {
      //   test: /\.s[ac]ss$/i,
      //   // use: ["vue-style-loader", "css-loader", "style-loader", "sass-loader", "postcss-loader"],
      //   use: ["vue-style-loader", "sass-loader"],
      //   // use: [
      //   //   {
      //   //     loader: "postcss-loader",
      //   //     options: {
      //   //       postcssOptions: {
      //   //         plugins: [
      //   //           [
      //   //             "postcss-preset-env",
      //   //             {
      //   //               // Options
      //   //             },
      //   //           ],
      //   //         ],
      //   //       },
      //   //     },
      //   //   },
      //   // ],
      // },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      // {
      //   test: /\.css$/,
      //   use: ["style-loader", "css-loader"],
      // },
    ],
  },
  resolve: {
    alias: {
      vue: "@vue/compat",
    },
    extensions: [".vue"],
  },
};
