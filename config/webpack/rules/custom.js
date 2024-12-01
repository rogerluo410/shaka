module.exports = {
  devtool: false,
  module: {
    rules: [
      {
        test: /\.DS_Store$/,
        use: "ignore-loader",
      },
    ],
  },
  resolve: {
    extensions: [".css", ".scss"],
  },
};
