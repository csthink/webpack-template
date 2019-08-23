const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin') // 创建HTML模板，动态引用静态文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin') // 清理目录插件
const devMode = process.env.NODE_ENV !== 'production' // 当前执行环境是否是开发模式

module.exports = {
  mode: devMode ? 'development' : 'production',
  entry: './src/index.js',
  target: 'web',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      assets: path.resolve(__dirname, 'src/assets/')
    }
    // extensions: [".js", ".json"] // 自动解析指定的扩展名文件,这里是默认值
  },
  // externals: { // 将这些不需要打包的模块从输出的 bundle 中排除
  // jquery: 'jQuery',
  // lodash: '_'
  // },
  module: {
    noParse: function (content) {
      return /jquery|lodash/.test(content)
    },
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        include: [path.resolve(__dirname, 'src/')],
        use: [
          {
            loader: 'url-loader', // 根据图片大小，把图片转换成 base64
            options: {
              name: '[path]/[name].[hash:8].[ext]',
              limit: 10240 // 图片小于limit(单位byte, 10KB)的时候会把图片 base64 编码,大于就会打包成文件格式
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: { progressive: true, quality: 65 },
              optipng: { enabled: false },
              pngquant: { quality: '65-90', speed: 4 },
              gifsicle: { interlaced: false },
              webp: { quality: 75 }
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        include: [path.resolve(__dirname, 'src/')],
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path]/[name].[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      // title: 'Webpack study!', // 生成的文件标题,没有 template 选项时配合 filename 使用生效
      filename: 'index.html', // 最终生成的文件名
      template: path.resolve(__dirname, 'src/index.html'), // 以 src/index.html为模板，把打包生成的js|css自动引入到这个html文件
      minify: { // 压缩选项
        collapseWhitespace: true, // 移除空格
        removeComments: true // 移除注释
        // removeAttributeQuotes: true // 移除双引号
      }
    }),
    new CleanWebpackPlugin()
  ]
}
