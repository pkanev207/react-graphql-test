const { merge } = require("webpack-merge");

const commonConfig = require("./webpack.common.js");

// const getAddons = (addonsArgs) => {
//   //   "scripts": {
//   //   "build:analyze": "npm run build -- --env addon=bundleanalyze"
//   // },
//   const addons = Array.isArray(addonsArgs) ? addonsArgs : [addonsArgs];

//   return addons.filter(Boolean).map((name) => require(`./addons/webpack.${name}.js`)) || [];
// };

module.exports = ({ env }) => {
  const envConfig = require(`./webpack.${env}.js`);

  return merge(commonConfig, envConfig);
  // return merge(commonConfig, envConfig, ...getAddons(addon || []));
};
