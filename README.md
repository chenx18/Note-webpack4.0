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
    - "dev": "webpack-dev-server --open --port 3000 --hot --contentBase src --hot"   // “--open --port 3000 --contentBase src --hot” 传递的参数
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
  
  1. 加载 CSS ( style-loader css-loader )  
    - npm install --save-dev style-loader css-loader

  2. 加载 scss ( sass-loader node-sass )   
    - npm install --save-dev sass-loader node-sass 

  3. 加载 less  ( less less-loader ) 
    - npm install --save-dev less less-loader

  2. 加载图片 ( file-loader   )   
    - npm install --save-dev file-loader

  3. 加载字体 ( file-loader   ) 


##  ExtractTextPlugin（分离css文件）
  - 它会将所有的入口 chunk(entry chunks)中引用的 *.css，移动到独立分离的 CSS 文件
  - 因此，你的样式将不再内嵌到 JS bundle 中，而是会放到一个单独的 CSS 文件（即 styles.css）当中。  
  - 如果你的样式文件大小较大，这会做更快提前加载，因为 CSS bundle 会跟 JS bundle 并行加载。
  - npm install --save-dev extract-text-webpack-plugin  安装后运行报错则运行下面命令重新安装
  - 报错安装 cnpm install --save-dev extract-text-webpack-plugin@4.0.0-beta.0

## source map （错误追踪）
  - 为了更容易地追踪错误和警告，JavaScript 提供了 source map 功能，将编译后的代码映射回原始源代码   
  - 生产环境中使用 source-map 选项，在开发环境中用到 inline-source-map    

  ```js
    // 生产环境 source-map
    // 开发环境 inline-source-map 
    devtool: 'inline-source-map'
  ```

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
  1. 目录结构   
    ```js
    note-02
      |- node_modules
      |- config
        |- index.js         // 通用配置
        |- dev.env.js       // 开发环境
        |- prod.env.js      // 生产环境
      |- dist
      |- src
        |- untils
        |- main.js
      |- package.json
    ```
  2. development 开发环境    
    -   
  
  - production 生产环境   
    - 避免在生产中使用 inline-*** 和 eval-***，因为它们可以增加 bundle 大小，并降低整体性能。  

  
  3. webpack-merge 合并配置  
    - 配置通用配置，分离出 通用 开发 生产 环境代码    
    - npm install --save-dev webpack-merge    
    - 分别在 开发环境（dev.env.js） 和  生产环境（prod.env.js）导入通用配置，把对应环境配置抽离到 开发 or 生产 文件内     
    - 修改 NPM script 命令， dev对应开发环境， build 对应 生产环境    
  
  4. 指定环境  
    - 许多 library 将通过与 process.env.NODE_ENV 环境变量关联，以决定 library 中应该引用哪些内容  
    -  process.env.NODE_ENV 可获取环境名


