const path = require('path');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

let devConfig = {
  mode: 'development',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
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
            loader: "postcss-loader",
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
  }
}

module.exports = merge(commonConfig, devConfig)
