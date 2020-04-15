
const path  = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');


const proConfig ={
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new UglifyJSPlugin(),
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