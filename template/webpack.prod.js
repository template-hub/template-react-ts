const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const merge = require('webpack-merge')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const common = require('./webpack.common.js')

const config = merge(common, {
  mode: 'production',
  devtool: process.env.SOURCE_MAP ? 'source-map' : false,
  output: {
    filename: '[name].[chunkhash:8].js'
  },
  module: {
    rules: [
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].[contenthash:8].css',
      chunkFilename: '[id].css'
    })
  ]
})

if (process.env.ANALYSIS) {
  config.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = config
