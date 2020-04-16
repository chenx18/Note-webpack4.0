const path  = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");  //css样式提取
const MiniCssExtractPlugin = require("mini-css-extract-plugin");   //css样式提取
const merge = require('webpack-merge');

const devConfig = require('./dev.env.js');
const proConfig = require('./prod.env.js');
const devMode = process.env.NODE_ENV !== 'production';  // 环境变量

// console.log(path.join(__dirname,'../src/main.js'))
// console.log('devMode', process.env.NODE_ENV)   // 读取cross-env 配置的环境变量 (npm script)

const commonConfig  = {

  // 入口 （对象 或者 字符）
  entry: {
    index: path.join(__dirname,'../src/main.js'),
    another: path.join(__dirname,'../src/untils/another.js'),
    login: path.join(__dirname,'../src/login/login.js')
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
        use: [
          { loader: MiniCssExtractPlugin.loader },
          'css-loader'
        ]
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

    // 打包生成对应的html文件
    new HtmlWebpackPlugin({  
      filename: 'index.html',           // 打包生成的文件地址及文件名       
      template: path.join(__dirname, '../index.html'), // html模板所在的文件路径
      minify:{    //对html文件进行压缩
        removeAttributeQuotes:true,  //去掉属性的双引号
        removeComments: true,        //去掉注释
        collapseWhitespace: true,    //去掉空白
      },
      title: 'webpack-note02',          // 设置该页面的title标题标签
      chunks:['index','another'],       // 每个html只引入对应的js和css
      // inject:'body',                    // 所有js资源插入到head标签中
      hash: true                        //避免缓存js
    }),

    // 打包生成对应的html文件
    new HtmlWebpackPlugin({ 
      template: path.join(__dirname, '../src/login/login.html'), // html模板所在的文件路径
      filename: 'login/login.html',           // 打包生成的文件地址及文件名
      minify:{    //对html文件进行压缩
        removeAttributeQuotes:true,  //去掉属性的双引号
        removeComments: true,        //去掉注释
        collapseWhitespace: true,    //去掉空白
      },
      title: 'loginoing',               // 设置该页面的title标题标签
      chunks:['login'],                 // 配置这个html 包含 入口模块
      // inject:'body',                    // 所有js资源插入到head标签中
      hash: true
    }),

    // 分离css文件插件
    new MiniCssExtractPlugin({         
      filename: devMode?"assets/css/[name].css":"assets/css/[name].[hash:7].css",
      chunkFilename: devMode?"assets/css/[id].css":"assets/css/[id].[hash:7].css"
    }), 
    
  ],
  // 优化
  optimization:{
    // 代码分离
    splitChunks:{
      cacheGroups:{
        vendors: {   // 分组名称
          test: /[\\/]node_modules[\\/]/,
          name: 'commons',   // 拆分的名称
          chunks: 'all',    // 设置代码分割类型
          priority: -10     //有限权，当一个模块都符合cacheGroups分组条件，将按照优先权进行分组，priority值越大，优先权越高
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  }
}

module.exports = (env) => {
  if (env && env.NODE_ENV==='production'){
    return merge(commonConfig, proConfig)
  } else {
    return merge(commonConfig, devConfig)
  }
}