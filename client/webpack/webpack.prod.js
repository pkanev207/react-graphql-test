const webpack = require("webpack");
const ESLintPlugin = require("eslint-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        // for modules only - production:
        test: /\.css$/,
        include: /\.module\.css/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              // enables css modules for this files:
              // modules: true,
              modules: {
                // official documentation suggests this for production,
                // this will make classnames totally unreadable:
                localIdentName: "[hash:base64]",
              },
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          // "style-loader",
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      // the name will be determined by the entry point,
      // contenthash with length 12 chars [default: 20],
      filename: "[name].[contenthash:12].css",
    }),
    new webpack.DefinePlugin({
      "process.env.STRANGE_INDIAN_NAME": JSON.stringify("Vishwas"),
      // "process.env": { NODE_ENV: JSON.stringify("production") },
    }),
    new ESLintPlugin(),
  ],
};
