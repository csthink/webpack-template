const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 创建HTML模板，动态引用静态文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 清理目录插件

module.exports = {
  entry: './src/index.js',
  resolve: {
    alias: {
      '@' : path.resolve(__dirname, 'src/'),
      'assets' : path.resolve(__dirname, 'src/assets/')
    },
    // extensions: [".js", ".json"] // 自动解析指定的扩展名文件,这里是默认值
  },
  externals: { // 将这些不需要打包的模块从输出的 bundle 中排除
    jquery: 'jQuery',
    lodash: '_'
  },
  module: {
    noParse: function(content){
      return /jquery|lodash/.test(content);
    },
    rules: [
      {
        test: /\.js$/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            cacheDirectory: true // 构建时会缓存文件夹，后续从缓存中读取，将提高打包效率
          }
        }],
        exclude: /(node_modules|bower_components)/,
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        include: [path.resolve(__dirname, 'src/')],
        use: [
          {
            loader: 'url-loader', // 根据图片大小，把图片转换成 base64
            options: { limit: 10000 },
          },
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: { progressive: true, quality: 65 },
              optipng: { enabled: false },
              pngquant: { quality: '65-90', speed: 4 },
              gifsicle: { interlaced: false },
              webp: { quality: 75 }
            }
          },
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        include: [path.resolve(__dirname, 'src/')],
        use: [ 'file-loader' ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Webpack study!", // 生成的文件标题
      filename: "index.html", // 最终生成的文件名
      template: path.resolve(__dirname, "src/index.html"), // 以 src/index.html为模板，把打包生成的js|css自动引入到这个html文件
      minify: { // 压缩选项
        collapseWhitespace: true, // 移除空格
        removeComments: true, // 移除注释
        removeAttributeQuotes: true, // 移除双引号
      }
    }),
    new CleanWebpackPlugin()
  ]
}
