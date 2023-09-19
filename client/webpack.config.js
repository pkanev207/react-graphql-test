const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
// TypeError: webpack.DefinePlugin is not a constructor:
// const { webpack } = require("webpack");
const webpack = require("webpack");
const dotEnv = require("dotenv-webpack");

const isDevelopment = process.env.NODE_ENV !== "production";

module.exports = {
  mode: isDevelopment ? "development" : "production",
  // default value:
  target: "web",
  devServer: {
    open: true,
    hot: true,
  },
  devtool: "cheap-module-source-map",
  // entry: "./src/index.js", // main js
  entry: "./src/index.tsx",
  resolve: {
    // allows to skip extensions when importing
    extensions: [".tsx", ".ts", ".jsx", ".js"],
  },
  output: {
    path: path.resolve(__dirname, "dist"), // output folder
    publicPath: "/",
    filename: "bundle.js",
  },
  module: {
    rules: [
      // {
      //   test: /\.(ts|js)x?$/,
      //   exclude: /node_modules/,
      //   use: {
      //     loader: "babel-loader",
      //     options: {
      //       presets: ["@babel/preset-env", "@babel/preset-react"],
      //     },
      //   },
      // },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: "ts-loader",
      },
      {
        test: /\.(js|jsx)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"], // for styles
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: "graphql-tag/loader",
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: "asset/inline",
      },
    ],
  },
  plugins: [
    new dotEnv(),
    new HtmlWebpackPlugin({
      template: "./src/index.html", // base html
      // template: path.resolve(__dirname, "..", "./src/index.html"),
    }),
    new webpack.DefinePlugin({
      "process.env.STRANGE_INDIAN_NAME": JSON.stringify("Vishwas"),
    }),
    new ReactRefreshWebpackPlugin(),
  ],
};
