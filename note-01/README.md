## 安装 webpack webpack-cli
  - npm install webpack webpack-cli --save-dev
  - npx webpck    零配置打包
  - npx webpck --config webpack.config.js  指定打包配置文件为webpack.config.js

## NPM 脚本(npm script)：
  - 配置package.json代替npx命令
  - npm run build
    - "build":"webpck" 对应 npx webpck
    - "build":"webpck --config webpack.config.js" 对应 npx webpck --config webpack.config.js
  - npm run dev
    - "dev": "webpack-dev-server"   // 相当启动 webpack-dev-server
    - "dev": "webpack-dev-server --open --port 3000 --contentBase src --hot"   // “--open --port 3000 --contentBase src --hot” 传递的参数
    - 另一种方式则在 webpck.config 中配置 devServer

## webpack-dev-server 
  - 提供一个简单的 web 服务器，并且能够实时重新加载(live reloading)  
  - npm install --save-dev webpack-dev-server  
  - npx webpack-dev-server 则可直接运行项目  
  - 使用NPM 脚步配置则可以使用 npm run dev 运行  
  - webpck.config 中配置 devServer，devServer会在内存中创建类似的dist目录，在由浏览器打开进行预览  

  ```js
    // web服务
    devServer: {
      open: true,           // 自动打开浏览器
      port: 3000,           // 指定启动运行端口
      contentBase: "./dist",// 指定托管目录
      hot: true,            // 启动热更新
    }
  ```


## HtmlWebpackPlugin  （管理输出）
  - HtmlWebpackPlugin 会默认生成 index.html 文件
  - npm install --save-dev html-webpack-plugin

## clean-webpack-plugin
  - 清理 /dist 文件夹
  - npm install clean-webpack-plugin --save-dev

## loader 
  > webpack 最出色的功能之一就是，除了 JavaScript，还可以通过 loader 引入任何其他类型的文件    
  > 全部安装： npm install --save-dev style-loader css-loader sass-loader node-sass file-loader
  1. 加载 CSS ( style-loader css-loader )  
    - npm install --save-dev style-loader css-loader
  2. 加载 scss ( sass-loader node-sass )   
    - npm install --save-dev sass-loader node-sass 
  3. 加载 less  ( less less-loader ) 
    - npm install --save-dev less less-loader
  2. 加载图片 ( file-loader   )   
    - npm install --save-dev file-loader
  3. 加载字体 ( file-loader   ) 
  
## source map （错误追踪）

  1. 为了更容易地追踪错误和警告，JavaScript 提供了 source map 功能，将编译后的代码映射回原始源代码   
  2. webpack.config.js 添加配置 devtool: 'inline-source-map',

## 模块热替换
  > 允许在运行时更新各种模块，而无需进行完全刷新
  - 实际更新 webpack-dev-server 的配置 和 使用 webpack 内置的 HMR 插件
  - devServer 添加 hot属性，值为 true
  - plugins 添加 
    - new webpack.NamedModulesPlugin(); // 打印更新的模块路径 
    - new webpack.HotModuleReplacementPlugin(); // 热更新插件

  ```js
    const webpack = require('webpack'); // 引入依赖

    devServer: {
      contentBase: "./dist",   // 指定托管目录
      hot: true,               // 启动热更新 第一步
    },

    plugins: [
      // 启动热更新第二步
      new webpack.NamedModulesPlugin(),         // 打印更新的模块路径 
      new webpack.HotModuleReplacementPlugin()  // 热更新插件
    ]
  ```

## 生产环境构建
  - development 开发环境
  - production 生产环境