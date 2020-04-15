[webpack](https://webpack.docschina.org/guides/)  
[webpack 分类](https://waliblog.com/category/webpack/)   

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
  - 使用devServer的好处   
      - 自动打开浏览器页面
      - 调试接口
      - 实时刷新
      - 热更新
      - 使用代理
      - 局域网访问 

  ```js
    // web服务
    devServer: {
      open: true,           // 启动时默认打开浏览器
      port: 3000,           // 指定启动运行端口
      contentBase: path.join(__dirname, 'dist'),// 指定托管目录
      hot: true,            // 启动热更新
      proxy:{         // 代理
      	'/':{
      		target:'http://www.waliblog.com'
      	},
      	'/upload':{
      		target:'http://www.waliblog.com'
      	}
      }
    }
  ```


## HtmlWebpackPlugin  （管理输出）
  - HtmlWebpackPlugin 会在打包结束后，自动生成一个html文件，并把打包生成的js自动引入到这个html文件中
  - npm install --save-dev html-webpack-plugin
 
## clean-webpack-plugin
  - 清理 /dist 文件夹
  - npm install clean-webpack-plugin --save-dev

## loader 
  > webpack 最出色的功能之一就是，除了 JavaScript，还可以通过 loader 引入任何其他类型的文件    
  > oader 让 webpack 能够去处理其他类型的文件，并将它们转换为有效 模块，以供应用程序使用，以及被添加到依赖图中。
  
  1. loader 有两个属性： 
    - test 属性，用于标识出应该被对应的 loader 进行转换的某个或某些文件  
    - use 属性，表示进行转换时，应该使用哪个 loader  

  2. loader执行顺序:  

  ```js
   // rules执行顺序由右往左，由下往上。所以会先执行sass-loader -> css-loader -> style-loader
    rules:[
      {
        test:/\.css$/,
        use:[
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  ```  

  3. 加载 CSS ( style-loader css-loader )  
    - npm install --save-dev style-loader css-loader

  4. 加载 scss ( sass-loader node-sass )   
    - npm install --save-dev sass-loader node-sass 

  5. 加载 less  ( less less-loader )   
    - npm install --save-dev less less-loader

  6. 加载图片 ( file-loader / html-loader  )   
    - npm install --save-dev file-loader html-loader

  7. 加载字体 ( file-loader   ) 

  8. 添加厂商前缀和postCss
    - 不管是写css,sass,less,postCss样式，在css3新特性下，我们是要添加浏览器厂商前缀的
    - 如果没有浏览器厂商前缀，同一套样式不同浏览器展现的样式是不同的


## ExtractTextPlugin（分离css文件）
  - 它会将所有的入口 chunk(entry chunks)中引用的 *.css，移动到独立分离的 CSS 文件
  - 因此，你的样式将不再内嵌到 JS bundle 中，而是会放到一个单独的 CSS 文件（即 styles.css）当中。  
  - 如果你的样式文件大小较大，这会做更快提前加载，因为 CSS bundle 会跟 JS bundle 并行加载。
  - npm install --save-dev extract-text-webpack-plugin  安装后运行报错则运行下面命令重新安装
  - 报错安装 cnpm install --save-dev extract-text-webpack-plugin@4.0.0-beta.0

## source map （错误映射）
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
      contentBase: path.join(__dirname, 'dist'),   // 指定托管目录
      inline:true, //实时更新
      hot:true,    //热替换
      hotOnly:true,
    },

    plugins: [
      // 启动热更新第二步
      new webpack.NamedModulesPlugin(),         // 打印更新的模块路径 
      new webpack.HotModuleReplacementPlugin()  // 热更新插件
    ]
  ```

## 环境构建   
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
  
  3. production 生产环境   
    - 避免在生产中使用 inline-*** 和 eval-***，因为它们可以增加 bundle 大小，并降低整体性能。  

  
  4. webpack-merge 合并配置  
    - 配置通用配置，分离出 通用 开发 生产 环境代码    
    - npm install --save-dev webpack-merge    
    - 分别在 开发环境（dev.env.js） 和  生产环境（prod.env.js）导入通用配置，把对应环境配置抽离到 开发 or 生产 文件内     
    - 修改 NPM script 命令， dev对应开发环境， build 对应 生产环境    
  
  5. 指定环境  
    - 许多 library 将通过与 process.env.NODE_ENV 环境变量关联，以决定 library 中应该引用哪些内容  
    -  process.env.NODE_ENV 可获取环境名



## 代码分离三个方法

  1. 入口起点：使用 entry 配置手动地分离代码    
    - 如果入口 chunks 之间包含重复的模块，那些重复模块都会被引入到各个 bundle 中    

    ```js
      // 直接在入口写入配置 打包后在dist文件中就存在 index.js  another.js
      // 但是 两个js文件中存在依赖的公共模块并未提取分离 此时打包后的文件依旧很大
      entry: {
        index: path.join(__dirname,'../src/main.js'),
        another: path.join(__dirname,'../src/untils/another-module.js'),
      }, 
    ```

  2. 防止重复：
    - CommonsChunkPlugin 插件可以将公共的依赖模块提取到已有的入口 chunk 中，或者提取到一个新生成的 chunk；(webpack 4.0 已废弃)
    - 使用 SplitChunks 插件 看下方具体使用

  3. 动态导入：通过模块的内联函数调用来分离代码。   

## splitChunks  分块策略

  [SplitChunks插件]('https://webpack.docschina.org/plugins/split-chunks-plugin/#src/components/Sidebar/Sidebar.jsx')

  ```js
    //optimization与entry/plugins同级
    optimization:{
      splitChunks:{
        cacheGroups:{
          commons:{
            name: "commons",    // 拆分块的名称, true将基于块和缓存组密钥自动生成一个名称。提供字符串或函数将允许您使用自定义名称
            chunks: "initial",  //选择哪些块进行优化, 有效值为all，async和initial
            minChunks: 2,       // 拆分前必须共享模块的最小块数
          }
        }
      }
    }
  ```

## 懒加载

## 缓存
  > 1 浏览器使用一种名为 缓存 的技术, 可以通过命中缓存，以降低网络流量，使网站加载速度更快，    
  > 2 但是 我们在部署新版本时不更改资源的文件名，浏览器可能会认为它没有被更新，就会使用它的缓存版本  

  1. 输出文件的文件名  
    - 通过使用 output.filename 进行文件名替换，可以确保浏览器获取到修改后的文件；  
    - 使用 [contenthash] 替换，根据资源内容创建出唯一 hash。  
    - 资源内容发生变化时，[contenthash] 也会发生变化

    ```js
      output: {
        filename: '[name].[contenthash].js',
        path: path.join(__dirname,'../dist')
      }
    ```

  2. 模块标识符



## 处理ES6语法( Babel )

```js
  // 安装
  // babel-loader的作用正是实现对使用了ES2015+语法的.js文件进行处理
  // babel-core的作用在于提供一系列api,当webpack使用babel-loader处理文件时，babel-loader实际上调用了babel-core的api
  // babel-preset-env的作用是告诉babel使用哪种转码规则进行文件处理
  npm install -D babel-loader @babel/core @babel/preset-env webpack

  // 配置
    // 1. webpack.config.js中增加匹配规则
    module.exports = {
      module:{  
        rules:[   
          {
            test:/\.js$/,   //匹配JS文件  
            use:'babel-loader',
            exclude:/node_modules/   //排除node_modules目录
          }
        ]
      }
    }
    //2. Babel配置文件
    // 在项目根路径下创建名为 .babelrc 的Babel配置文件（规范的JSON格式，无注释、字符串必须双引号等等），配置规则。plugins插件；presets预设、语法。
    {
      "presets": ["@babel/env"]
    }
    //或者 在package.json中配置。
    "babel":{
      "presets": ["@babel/env"]
    }

```

## 环境变量

## MiniCssExtractPlugin

## DefinePlugin
  - 允许创建一个在编译时可以配置的全局常量

  ```js
    plugins: [
      new webpack.DefinePlugin({
        'DEV': JSON.stringify('production'),
      })
    ],
    new webpack.DefinePlugin({
      IS_PRODUCTION: JSON.stringify(true),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    });
  ```

## 待
  - 转化es6
  - 处理js
  - 处理jq
  - 全局变量引入问题
  - 图片处理
  - 打包文件分类
  - 打包多页应用
  - 跨域配置
  - resolve属性配置 
  - 定义环境变量
  - 区分不同环境
  - noParse
  - lgnorePlugin
  - dllPlugin
  - happypack
  - webpack 自带优化
  - 抽离公共代码
  - 懒加载
  - 热更新
  - tapable
  - AsyncParralleHook
  - AsyncSeriesWaterfall
  - webpack手写
  - webpack分析及处理
  - 创建依赖关系
  - AST递归解析
  - 生成打包结果
  - 增加loader
  - 增加plugins
  - loader
  - loader配置
  - babel-loader
  - banner-loader
  - file-loader url-loader
  - less-loader css-loader
  


