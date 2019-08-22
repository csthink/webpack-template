const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // css 单独打包
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // 压缩 css
const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); // 压缩 JS
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 创建HTML模板，动态引用静态文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 清理目录插件


module.exports = {
  entry: './src/index.js',
  mode: 'development',
  output: {
    filename: 'main.[hash:8].js',
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
      filename: '[name].[hash:8].css', // 最终输出的文件名
      chunkFilename: '[id].[hash:8].css'
    }),
    new OptimizeCssAssetsPlugin({}),
    new UglifyJsPlugin({
      cache: true, // 当 JS 没有发生变化则不压缩
      parallel: true, // 启用并行压缩
      sourceMap: true // 启用 sourceMap
    }),
    new HtmlWebpackPlugin({
      title: "Webpack study!", // 生成的文件标题
      filename: "index.html", // 最终生成的文件名
      template: path.join(__dirname, "template.html"), // 以 template.html为模板，把打包生成的js|css自动引入到这个html文件
      minify: { // 压缩选项
        collapseWhitespace: true, // 移除空格
        removeComments: true, // 移除注释
        removeAttributeQuotes: true, // 移除双引号
      }
    }),
    new CleanWebpackPlugin()
  ]
}
