const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // css 单独打包
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // 压缩 css
const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); // 压缩 JS
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common');

let prodConfig = {
  mode: 'production',
  output: {
    filename: 'main.[hash].js',
    path: path.resolve(__dirname, 'dist')
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
            loader:"postcss-loader",
            options: {
              ident: "postcss",
              sourceMap: true,
              plugins: loader => [
                require('autoprefixer')(),
                // 这里可以使用更多配置，如上面提到的 postcss-cssnext 等
                // require('postcss-cssnext')()
              ]
            }
          },
          {
            loader: "sass-loader",
            options: { sourceMap: true }
          },
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[hash:8].css', // 最终输出的文件名
      chunkFilename: '[id].[hash:8].css'
    }),
    new OptimizeCssAssetsPlugin({}),
    new UglifyJsPlugin({
      cache: true, // 当 JS 没有发生变化则不压缩
      parallel: true, // 启用并行压缩
      sourceMap: true // 启用 sourceMap
    })
  ]
}

module.exports = merge(commonConfig, prodConfig)
