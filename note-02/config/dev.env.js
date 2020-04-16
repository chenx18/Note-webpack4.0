
const path  = require('path');
const webpack = require('webpack');

const devConfig = {
  mode: 'development',  
  // 出口
  output:{
    filename: '[name].js',      //输出文件的文件名
  },
  devtool: 'cheap-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      IS_PRODUCTION: JSON.stringify(false)
    })
  ],
  devServer: {
    open: true,                 // 自动打开浏览器
    port: 3001,                 // 指定启动运行端口
    contentBase: path.join(__dirname,'../dist'),   // 指定托管目录
    inline:true, // 实时更新
    hot:true,    // 启动热更新 只更新修改的部分，而不是刷新整个页面
    hotOnly:true,
    // proxy:{       // 代理
    //   '/':{
    //     target:'http://www.waliblog.com'
    //   },
    //   '/upload':{
    //     target:'http://www.waliblog.com'
    //   }
    // }
  },
 
}

module.exports = devConfig;