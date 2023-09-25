// const path = require("path");
// const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const webpack = require("webpack");
// TypeError: webpack.DefinePlugin is not a constructor:
// const { webpack } = require("webpack");

// const DotEnv = require("dotenv-webpack");
// const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = {
  mode: "development",
  // // default value:
  // target: "web",
  // entry: "./src/index.tsx",
  // context: path.resolve(__dirname, ".."),
  // // context: __dirname, // to automatically find tsconfig.json
  devServer: {
    open: true,
    hot: true,
    devMiddleware: {
      index: true,
      writeToDisk: true,
    },
    historyApiFallback: true,
  },
  devtool: "eval-source-map",
  // devtool: "source-map",
  // devtool: "cheap-module-source-map",
  // entry: "./src/index.js", // main js
  // resolve: {
  //   // allows to skip extensions when importing
  //   extensions: [".tsx", ".ts", ".jsx", ".js"],
  // },
  // output: {
  //   filename: "[name].bundle.js",
  //   path: path.resolve(__dirname, "./dist"), // output folder
  //   publicPath: "auto",
  //   clean: true,
  //   assetModuleFilename: "images/[name][ext][query]",
  // },
  module: {
    rules: [
      // {
      //   test: /\.(ts|js)x?$/,
      //   exclude: /node_modules/,
      //   use: {
      //     loader: "babel-loader",
      //     options: {
      //       presets: [
      //         "@babel/preset-env",
      //         "@babel/preset-react",
      //         "@babel/preset-typescript",
      //       ],
      //     },
      //   },
      // },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        // use: "ts-loader",
        loader: "ts-loader",
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"],
          },
        },
      },
      // {
      //   test: /\.css$/,
      //   // exclude modules for the regular rule:
      //   exclude: /\.module\.css$/,
      //   use: ["style-loader", "css-loader"],
      // },
      {
        // for modules only:
        test: /\.css$/,
        include: /\.module\.css/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              // enables css modules for this files:
              modules: {
                // readable classnames for development:
                localIdentName: "[local]--[md4:hash:7]",
              },
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          // replace to make separate css file:
          // MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
        ],
        // Webpack processes loaders from right to left
      },
      // {
      //   test: /\.(graphql|gql)$/,
      //   exclude: /node_modules/,
      //   loader: "graphql-tag/loader",
      // },
      // {
      //   test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
      //   type: "asset/resource",
      // },
      // {
      //   test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
      //   type: "asset/inline",
      // },
    ],
  },
  plugins: [
    // new DotEnv({ path: path.resolve(__dirname, "..", "./.env.development") }),
    // new CleanWebpackPlugin(),
    // new HtmlWebpackPlugin({
    //   // filename: "index.html",
    //   title: "Hello nasty Html-Webpack-Plugin!",
    //   template: "./src/index.html",
    //   // template: path.resolve(__dirname, "..", "./src/index.html"),
    // }),
    new webpack.DefinePlugin({
      "process.env.STRANGE_INDIAN_NAME": JSON.stringify("Vishwas"),
      // "process.env": { NODE_ENV: JSON.stringify("development") },
    }),
    new ReactRefreshWebpackPlugin(),
    new ESLintPlugin(),
    new ForkTsCheckerWebpackPlugin(),
  ],
  watchOptions: {
    // don't use this pattern, if you have a monorepo with linked packages
    ignored: /node_modules/,
  },
};

// Later on you can specify rules in this file.
// But first, let's try to start your app again.
// You might run (again) into Parsing errors such as
// "The keyword 'import' is reserved" or
// "The keyword 'export' is reserved".
// The error happens, because ESLint does not know about Babel enabled
//  JavaScript features yet.
// For instance, the import or export statements are
// JavaScript ES6 features. Therefore, you have to use
// babel-eslint node package to lint source code that is valid
// Babel interpreted JavaScript. From your project's root
// directory type

// const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

// module.exports = {
//   context: __dirname,
//   entry: "./src/index.ts",
//   resolve: {
//     extensions: [".ts", ".tsx", ".js"],
//   },
//   module: {
//     rules: [
//       {
//         test: /\.tsx?$/,
//         loader: "babel-loader",
//       },
//     ],
//   },
//   plugins: [
//     new ForkTsCheckerWebpackPlugin({
//       typescript: {
//         diagnosticOptions: {
//           semantic: true,
//           syntactic: true,
//         },
//         mode: "write-references",
//       },
//     }),
//   ],
// };
