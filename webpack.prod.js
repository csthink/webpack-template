const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // css 单独打包
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin') // 压缩 css
const UglifyJsPlugin = require('uglifyjs-webpack-plugin') // 压缩 JS
const merge = require('webpack-merge')
const commonConfig = require('./webpack.common')

const prodConfig = {
  output: {
    filename: 'main.[contenthash:8].js',
    chunkFilename: '[name].chunk.[chunkhash:8].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: ''
  },
  module: {
    rules: [
      {
        test: /\.(sc|c|sa)ss$/,
        use: [
          MiniCssExtractPlugin.loader, // 将 CSS 抽取成单独文件
          {
            loader: 'css-loader',
            options: { sourceMap: true }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              sourceMap: true,
              plugins: loader => [
                require('autoprefixer')()
                // 这里可以使用更多配置，如上面提到的 postcss-cssnext 等
                // require('postcss-cssnext')()
              ]
            }
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].css', // 最终输出的文件名
      chunkFilename: '[id].[chunkhash:8].css',
      ignoreOrder: false
    }),
    new OptimizeCssAssetsPlugin({}),
    new UglifyJsPlugin({
      cache: true, // 当 JS 没有发生变化则不压缩
      parallel: true, // 启用并行压缩
      sourceMap: true // 启用 sourceMap
    }),
    new webpack.DefinePlugin({ // 创建全局常量
      PRODUCTION: JSON.stringify(true),
      SERVICE_URL: JSON.stringify('https://openapi.csthink.com'),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all'
    },
    runtimeChunk: {
      name: 'runtime'
    }
  }
}

module.exports = merge(commonConfig, prodConfig)
