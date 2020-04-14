const path  = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const webpack = require('webpack');

console.log('__dirname', path.join(__dirname,'../dist'))

module.exports = {

  // 入口 （对象 或者 字符）
  entry: {
    index: path.join(__dirname,'../src/main.js'),
    another: path.join(__dirname,'../src/untils/another-module.js'),
  }, 

  // 出口
  output:{
    filename: '[name].[chunkhash].js',
    path: path.join(__dirname,'../dist')
  },

  // 配置所有第三方 loader 模块
  module:{
    rules:[
      { // 处理css文件，分离css文件
        test:/\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },   
      {test:/\.scss$/,use: ['style-loader','css-loader','sass-loader']},  // 处理scss文件的loader
      {test:/\.less$/,use: ['style-loader','css-loader','less-loader']},  // 处理less文件的loader
      {test: /\.(png|svg|jpg|gif)$/,use:['file-loader']},                 // 处理图片文件的loader
      {test: /\.(woff|woff2|eot|ttf|otf)$/,use:['file-loader']},          // 处理字体文件的loader
    ]
  },

  // plugin是用于扩展webpack的功能，所有插件写入plugins数组
  plugins: [
    new ExtractTextPlugin("css/styles.css"),  // 分离css文件插件
    new CleanWebpackPlugin(),       // 清理dist
    new HtmlWebpackPlugin({         // 打包输出HTML
      template: path.join(__dirname, '../index.html'), // html模板所在的文件路径
      filename: 'index.html',           // 输出的html的文件名称
      title: 'webpack-note02',         // 生成html文件的标题
      hash: true
    }),
    // new webpack.NamedModulesPlugin(),           // 打印更新的模块路径 
    // new webpack.HotModuleReplacementPlugin(),   // 热更新插件
    new webpack.HashedModuleIdsPlugin(),
  ],
  // 优化
  optimization:{
    // 代码分离
    splitChunks:{
      cacheGroups:{
        commons:{
          name: "commons",
          chunks: "initial",
          minChunks: 2
        }
      }
    }
  }
}