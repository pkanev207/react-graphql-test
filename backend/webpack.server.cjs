/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const webpackNodeExternals = require("webpack-node-externals");

const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = {
  // target: "node",
  mode: "development",
  entry: "./index.ts",
  resolve: {
    modules: [path.resolve(__dirname, "./src"), path.resolve(__dirname, "./node_modules/")],
    // allows to skip extensions when importing
    extensions: [".tsx", ".ts", ".jsx", ".js"],
  },
  output: {
    path: path.resolve(__dirname, "dist"), // output folder
    publicPath: "/",
    filename: "bundle.cjs",
    clean: true,
    assetModuleFilename: "images/[name][ext][query]",
  },
  // For Webpack 5, replace target: 'node' with the externalsPreset object:
  externalsPresets: { node: true },
  externals: [webpackNodeExternals()],
  module: {
    rules: [
      {
        test: /\.(ts|js)?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-typescript"],
            // presets: [
            //   [
            //     "@babel/preset-env",
            //     {
            //       targets: {
            //         browsers: ["last 2 versions"],
            //       },
            //       modules: process.browser ? false : "commonjs",
            //     },
            //   ],
            // ],
          },
        },
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
  // plugins: [new ESLintPlugin()],
};
