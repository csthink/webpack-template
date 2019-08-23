const path = require('path')
const merge = require('webpack-merge')
const commonConfig = require('./webpack.common.js')
const webpack = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin // 对打包后的文件进行数据分析，找到项目优化的方向,dev 打包后，会自动打开 http://127.0.0.1:8888/

const devConfig = {
  devtool: 'cheap-module-eval-source-map', // 开启 js 的 sourceMap,为了能方便定位错误
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: ''
    // publicPath: '/public/',
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'), // 本地服务器所加载的页面所在的目录
    compress: true, // 为所有服务启用gzip压缩
    hot: true, // 启动热更新替换特性，需要配合 webpack.HotModuleReplacementPlugin 插件
    overlay: { // 出现错误或者警告时候出现覆盖页面的弹层来报告信息
      warnings: true,
      error: true
    },
    // open: true, // 服务器将打开浏览器
    publicPath: '/',
    host: '0.0.0.0', // 启动服务器的 host
    port: '8000'
    // historyApiFallback: {
    // index: '/index.html' // 具体值与Webpack中output的 publicPath有关，若设置了 publicPath,需要加上这部分前缀
    // index: '/public/index.html' // 具体值与Webpack中output的 publicPath有关，若设置了 publicPath,需要加上这部分前缀
    // }
  },
  module: {
    rules: [
      {
        test: /\.(sc|c|sa)ss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { sourceMap: true }
          },
          {
            loader: 'postcss-loader',
            options: { sourceMap: true }
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
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new BundleAnalyzerPlugin(),
    new webpack.DefinePlugin({ // 创建全局常量
      PRODUCTION: JSON.stringify(false),
      SERVICE_URL: JSON.stringify('https://dev.csthink.com'),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]
}

module.exports = merge(commonConfig, devConfig)
