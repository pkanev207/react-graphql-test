const webpack = require("webpack");
const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = {
  mode: "production",
  optimization: {
    splitChunks: {
      chunks: "all",
      minSize: 10000,
      automaticNameDelimiter: "~",
    },
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"],
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.STRANGE_INDIAN_NAME": JSON.stringify("Vishwas"),
      // "process.env": { NODE_ENV: JSON.stringify("production") },
    }),
    new ESLintPlugin(),
  ],
};
