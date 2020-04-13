const path  = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  // 模式  development  production
  mode: 'development',  

  // 入口 （对象 或者 字符）
  entry: {
    index: './src/main.js'
  }, 

  // 出口
  output:{
    filename: '[name].js',
    path: path.resolve(__dirname,'dist')
  },

  // web服务
  devServer: {
    open: true,           // 自动打开浏览器
    port: 3000,           // 指定启动运行端口
    contentBase: "./dist",   // 指定托管目录
    hot: true,               // 启动热更新 只更新修改的部分，而不是刷新整个页面
  },

  // 使用 source map 追踪错误和警告
  devtool: 'inline-source-map',

  // 配置所有第三方 loader 模块
  module:{
    rules:[
      {test:/\.css$/,use: ['style-loader','css-loader']},   // 处理css文件的loader
      {test:/\.scss$/,use: ['style-loader','css-loader','sass-loader']},  // 处理scss文件的loader
      {test:/\.less$/,use: ['style-loader','css-loader','less-loader']},  // 处理less文件的loader
      {test: /\.(png|svg|jpg|gif)$/,use:['file-loader']},                 // 处理图片文件的loader
      {test: /\.(woff|woff2|eot|ttf|otf)$/,use:['file-loader']},          // 处理字体文件的loader
    ]
  },

  // plugin是用于扩展webpack的功能，所有插件写入plugins数组
  plugins: [
    new CleanWebpackPlugin(),       // 清理dist
    new HtmlWebpackPlugin({         // 打包输出HTML
      template: 'index.html',       // html模板所在的文件路径
      filename: 'index.html',       // 输出的html的文件名称
      title: 'wepack-demo',         // 生成html文件的标题
      hash: true
    }),
    new webpack.NamedModulesPlugin(),         // 打印更新的模块路径 
    new webpack.HotModuleReplacementPlugin()  // 热更新插件
  ]
}