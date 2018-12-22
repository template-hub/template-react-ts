const path = require('path')
const webpack = require('webpack')
const threadLoader = require('thread-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

threadLoader.warmup({}, [
  'babel-loader'
])

module.exports = {
  entry: {
    app: './src/index'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  optimization: {
    splitChunks: {
      chunks: 'initial',
      name: true,
      cacheGroups: {
        commons: {
          test: /node_modules/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    }
  },
  resolve: {
    extensions: ['.wasm', '.mjs', '.js', '.json', '.jsx', '.ts', '.tsx']
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: /\.module\.scss$/,
        use: [
          process.env.NODE_ENV === 'development'
            ? 'style-loader'
            : { loader: MiniCssExtractPlugin.loader }
        ].concat({
          loader: 'css-loader',
          options: {
            importLoaders: 2
          }
        }, 'postcss-loader', 'sass-loader')
      },
      {
        test: /\.module\.scss$/,
        use: [
          process.env.NODE_ENV === 'development'
            ? 'style-loader'
            : { loader: MiniCssExtractPlugin.loader }
        ].concat({
          loader: 'css-loader',
          options: {
            modules: true,
            localIdentName: '[local]_[hash:base64:5]',
            importLoaders: 2
          }
        }, 'postcss-loader', 'sass-loader')
      },
      {
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        use: [
          'thread-loader'
        ].concat(
          process.env.NODE_ENV === 'development'
            ? [
              {
                loader: 'cache-loader',
                options: {
                  cacheDirectory: path.resolve(__dirname, '.cache')
                }
              }
            ] : []
        ).concat({
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        })
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      templateParameters: {
        title: require('./package.json').name,
        reactRootId: 'root'
      },
      template: path.resolve(__dirname, 'template.html')
    }),
    new webpack.DefinePlugin({
      'GLOBAL_NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'GLOBAL_API_HOST': JSON.stringify(process.env.PRE ? 'https://api.baidu.pre.com' : 'https://api.baidu.com')
    })
  ]
}
