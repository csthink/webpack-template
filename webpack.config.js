const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    noParse: function(content){
      return /jquery|lodash/.test(content);
    },
    rules: [
      {
        test: /\.(sc|c|sa)ss$/,
        use: [
          // 'style-loader',
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
            loader:"sass-loader",
            options:{ sourceMap: true }
          },
        ]
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css', // 最终输出的文件名
      chunkFilename: '[id].css'
    })
  ]
}
