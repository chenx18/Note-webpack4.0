const path  = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const merge = require('webpack-merge');

const devConfig = require('./dev.env.js');
const proConfig = require('./prod.env.js');

console.log(path.join(__dirname,'../src/main.js'))

const commonConfig  = {

  // 入口 （对象 或者 字符）
  entry: {
    index: path.join(__dirname,'../src/main.js'),
    another: path.join(__dirname,'../src/untils/another-module.js'),
  }, 
  //出口
  output: { 
    path: path.join(__dirname, '../dist')
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
      { // 处理scss文件的loader
        test:/\.scss$/,
        use: ['style-loader','css-loader','sass-loader']
      },  
      { // 处理less文件的loader
        test:/\.less$/,
        use: ['style-loader','css-loader','less-loader']
      },  
      { // 处理图片文件的loader
        test: /\.(png|svg|jpeg|jpg|gif)$/,
        use:[{
          loader:'file-loader',
          options:{
            name: '[name].[ext]',           //[path] 上下文环境路径
            publicPath:'assets/img/',  // 为你的文件配置自定义 public 发布目录
            outputPath: 'assets/img/'  // 输出路径
          }
        }]
      },         
      {  // 处理字体文件的loader
        test: /(iconfont.svg)|\.(woff|woff2|eot|ttf|otf)$/,
        use:[
          {
            loader: 'file-loader',
            options:{
              name: '[name].[ext]',
              publicPath:'assets/fonts/',  // 为你的文件配置自定义 public 发布目录
              outputPath: 'assets/fonts/'  // 输出路径
            }
          }
        ]
      },
      { // 处理ES6 es7
        test: /\.m?js$/,   //匹配JS文件 
        exclude: /(node_modules|bower_components)/,  //排除node_modules目录 
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',   //用来将ES6语法转换成浏览器能运行的ES5语法的。
            ],
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      }

    ]
  },

  // plugin是用于扩展webpack的功能，所有插件写入plugins数组
  plugins: [
    new CleanWebpackPlugin(),       // 清理dist
    new HtmlWebpackPlugin({         // 打包输出HTML
      template: path.join(__dirname, '../index.html'), // html模板所在的文件路径
      filename: 'index.html',           // 输出的html的文件名称
      title: 'webpack-note02',         // 生成html文件的标题
      hash: true
    }),
    new ExtractTextPlugin("assets/css/styles.css"),  // 分离css文件插件
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

module.exports = (env) => {
  console.log(env)
  if (env && env.NODE_ENV==='production'){
    return merge(commonConfig, proConfig)
  } else {
    return merge(commonConfig, devConfig)
  }
}