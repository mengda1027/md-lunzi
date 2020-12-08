const config = require("./webpack.common")
const merge = require("webpack-merge")

module.exports = merge(config, {
  mode: "development",
  devtool: "eval-source-map",
  devServer: {
    host: "localhost",
    port: 8877,
    hot: true,
    open: true,
  },
})
