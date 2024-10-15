// See the shakacode/shakapacker README and docs directory for advice on customizing your webpackConfig.
const { generateWebpackConfig, merge } = require("shakapacker");

const webpackConfig = generateWebpackConfig();
const vueConfig = require("./rules/vue");
const customConfig = require("./rules/custom");

module.exports = merge(customConfig, vueConfig, webpackConfig);
