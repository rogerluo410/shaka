const webpack = require("webpack");
// process.env.NODE_ENV = process.env.NODE_ENV || "development";

module.exports = {
  // plugins: [
  //   new webpack.ProvidePlugin({
  //     $: "jquery",
  //     jQuery: "jquery",
  //     "window.jQuery": "jquery",
  //   }),
  // ],
  module: {
    rules: [
      {
        test: /\.DS_Store$/,
        use: "ignore-loader",
      },
    ],
  },
  resolve: {
    // alias: {
    //   "jquery-ui": "jquery-ui-dist/jquery-ui.js",
    // },
    extensions: [".css", ".scss"],
  },
};
