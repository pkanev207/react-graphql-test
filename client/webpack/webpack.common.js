const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const DotEnv = require("dotenv-webpack");

module.exports = {
  // default value:
  target: "web",
  entry: path.resolve(__dirname, "..", "./src/index.tsx"),
  context: path.resolve(__dirname, ".."),
  // context: __dirname, // to automatically find tsconfig.json
  module: {
    rules: [
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
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"],
  },
  plugins: [
    new DotEnv(),
    // new DotEnv({ path: path.resolve(__dirname, "..", "./.env.development") }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "Hello Webpack bundled JavaScript Project",
      template: path.resolve(__dirname, "..", "./src/index.html"),
    }),
  ],
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "../dist"), // output folder
    publicPath: "auto",
    clean: true,
    assetModuleFilename: "images/[name][ext][query]",
  },
  // output: {
  //   path: path.resolve(__dirname, "..", "../dist"),
  //   filename: "bundle.js",
  // },
  devServer: {
    static: path.resolve(__dirname, "..", "./dist"),
  },
};
