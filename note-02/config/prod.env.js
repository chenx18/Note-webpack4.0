
const path  = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const proConfig ={
  mode: 'production',
  devtool: 'cheap-source-map',
  plugins: [
    new CleanWebpackPlugin(),  // 清理dist
    new UglifyJSPlugin(),
    new webpack.HashedModuleIdsPlugin(),   // 模块标识符
    new webpack.DefinePlugin({
      IS_PRODUCTION: JSON.stringify(true),
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ],
  // 出口
  output:{
    filename: '[name].[contenthash].js',     // 输出文件名添加 contenthash 
  },
}
module.exports = proConfig;