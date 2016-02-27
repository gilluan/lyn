/* eslint-disable */
var path = require("path");
var webpack = require("webpack");

var CopyWebpackPlugin = require("copy-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
    "js/app.js": "./web/static/js/app.js",
    "js/admin.js": "./web/static/js/admin.js",

    "css/app.css": "./web/static/css/app.scss",
    "css/admin.css": "./web/static/css/admin.scss",
  },

  output: {
    path: "./priv/static",
    filename: "[name]"
  },

  resolve: {
    modulesDirectories: [
      __dirname + "/node_modules",
      __dirname + "/web/static/js"
    ],
    alias: {
      phoenix_html:
        __dirname + "/deps/phoenix_html/web/static/js/phoenix_html.js",
      phoenix:
        __dirname + "/deps/phoenix/web/static/js/phoenix.js"
    }
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ["babel-loader"],
        include: __dirname
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract("css!sass?outputStyle=expanded&sourceMap&includePaths[]="
                  + (path.resolve(__dirname + "/node_modules/bootstrap/scss")))
      },
    ],
  },

  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.Tether": "tether"
    }),
    new ExtractTextPlugin("[name]", {
      allChunks: true
    }),
    new CopyWebpackPlugin([{ from: "./web/static/assets" }])
  ]
};
