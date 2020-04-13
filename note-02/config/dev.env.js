const merge = require('webpack-merge');
const common = require('./index');

module.exports = merge(common, {
  mode: 'development',  
  devtool: 'inline-source-map',
  devServer: {
    open: true,           // 自动打开浏览器
    port: 3001,           // 指定启动运行端口
    contentBase: "./../dist",   // 指定托管目录
    hot: true,               // 启动热更新 只更新修改的部分，而不是刷新整个页面
  },
})