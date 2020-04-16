# WebPack 入门
[webpack](https://webpack.docschina.org/guides/)  
[webpack 分类](https://waliblog.com/category/webpack/) 
## 1. npm install
  > npm install --save 、--save-dev 、-D、-S 的区别  

  ```js
    // 安装包信息会写入 dependencies 中
    // dependencies 生产阶段的依赖,也就是项目运行时的依赖
    npm install --save  <=> npm install -S 

    
    // 安装包写入 devDependencies 中
    // devDependencies 开发阶段的依赖,在开发过程中需要的依赖，只在开发阶段起作用的
    npm install --save-dev <=> npm install -D 
  ```

## 2. NPM 脚本(npm script)
> npm 允许在package.json文件里面，使用scripts字段定义脚本命令  
  ```js
    // 
    // npm run build
      "build":"webpck" <=> npx webpck
      "build":"webpck --config webpack.config.js"  <=>  npx webpck --config webpack.config.js

    // npm run dev
      "dev": "webpack-dev-server"   <=>  webpack-dev-server
      "dev": "webpack-dev-server --open --port 3000 --hot --contentBase src --hot"   // “--open --port 3000 --contentBase src --hot” 传递的参数

    // note-2 配置如下
    "scripts": {
      "build": "webpack --env.NODE_ENV=production --config config/index.js",
      "dev": "webpack-dev-server --colors --config config/index.js"
    },
  ```

  ##### 2.2 cross-env (process.env)
  [webpack4环境配置之process.env](https://www.jianshu.com/p/19d199f93045)
  > cross-env是一个跨平台设置环境变量的第三方包，它可以让你只配置一行命令，就能轻松地在多个平台设置环境变量  
  
  ```js
    // 安装 npm install --save-dev cross-env 
    // package.json
    {
      ...
      "scripts": {
        "dev": "cross-env NODE_ENV=development webpack-dev-server --open --hot",
        "build": "cross-env NODE_ENV=production webpack --mode=production  --progress --hide-modules"
      },
    }
  ```


## 3. webpack webpack-cli 安装 
  - npm install webpack webpack-cli --save-dev  
  - 安装完成 可以使用 [webpack命令行](https://webpack.docschina.org/api/cli/)  
  - 为了让打包更便捷，可以通过 ***NPM 脚本*** 配置npm命令 
    ```js
    // 打包命令
      npx webpck    // 零配置打包
      npx webpck --config webpack.config.js  // 指定了打包配置文件(webpack.config.js)

    // webpack-dev-server 运行项目  
    // 注： 需安装 webpack-dev-server 插件
      npx webpack-dev-server
    ```
  
## 4. loader 
  > loader 是 webpack 的核心概念之一，基本工作流是将一个文件以字符串的形式读入，对其进行语法分析及转换；  
  > 所有载入的模块最终都会经过**moduleFactory**处理，转成javascript可以识别和运行的代码，从而完成模块的集成  
  
  ##### 4.1 loader 有两个属性： 
    - test 属性，用于标识出应该被对应的 loader 进行转换的某个或某些文件  
    - use 属性，表示进行转换时，应该使用哪个 loader  

  ##### 4.2 loader执行顺序  
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

  ##### 4.3 CSS ( style-loader css-loader )   
    - npm install --save-dev style-loader css-loader

  ##### 4.4 scss ( sass-loader node-sass )   
    - npm install --save-dev sass-loader node-sass 

  ##### 4.5 less  ( less less-loader )   
    - npm install --save-dev less less-loader

  ##### 4.6 图片 ( file-loader / html-loader  )   
    - npm install --save-dev file-loader html-loader

  ##### 4.7 字体 ( file-loader   ) 

  ##### 4.8 [添加厂商前缀和postCss](https://waliblog.com/webpack/2019/05/17/webpack-3.html)
    - 不管是写css,sass,less,postCss样式，在css3新特性下，我们是要添加浏览器厂商前缀的
    - 如果没有浏览器厂商前缀，同一套样式不同浏览器展现的样式是不同的

## 5. HtmlWebpackPlugin（管理输出）
  > HtmlWebpackPlugin 会在打包结束后，自动生成一个html文件，并把打包生成的js自动引入到这个html文件中  
  ```js
    // 安装： npm install --save-dev html-webpack-plugin
    const HtmlWebpackPlugin = require('html-webpack-plugin');
    plugins: [
      new HtmlWebpackPlugin({                               // 打包输出HTML
        template: path.join(__dirname, '../index.html'),    // html模板所在的文件路径
        filename: 'index.html',                             // 输出的html的文件名称
        title: 'webpack-note02',                            // 生成html文件的标题
        hash: true                                          // 哈希
      }),
    ],
  ```

## 6. clean-webpack-plugin （清除dist目录）
  > 清理 /dist 文件夹 
  ```js
    // 安装 npm install clean-webpack-plugin --save-dev
    const {CleanWebpackPlugin} = require('clean-webpack-plugin');
    plugins: [
      new CleanWebpackPlugin(),       // 清理dist
    ],
  ```

## 6. webpack-dev-server ( web 服务器) AND 热模块替换
  - 提供一个简单的 web 服务器，并且能够实时重新加载(live reloading)  
  - webpck.config 中配置 devServer，devServer会在内存中创建类似的dist目录，在由浏览器打开进行预览 
  - 使用devServer的好处   
      - 自动打开浏览器页面
      - 调试接口
      - 实时刷新
      - 热更新
      - 使用代理
      - 局域网访问 

    ```js
      // 安装： npm install --save-dev webpack-dev-server
      devServer: {
        contentBase: path.join(__dirname, 'dist'),// 指定托管目录
        open: true,     // 启动时默认打开浏览器
        port: 3000,     // 指定启动运行端口
        inline:true,    // 实时更新
        hot: true,      // 启动热更新
        hotOnly:true,   // 启动热更新
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

## 7. SourceMap （源码映射）
  > 为了更容易地追踪错误和警告，JavaScript 提供了 source map 功能，将编译后的代码映射回原始源代码   
  - **开发模式：devtool:"cheap-eval-source-map"**  
  - **生产模式：devtool:"cheap-source-map"**  

## 8. 处理ES6语法( Babel )

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

## 9. 代码分割    
  - 入口文件：通过手动配置webpack多个为入口   
  - 避免重复：使用SplitChunks插件删除并提取出公共代码块作为单独的一个chunk ( CommonsChunkPlugin webpack 4.0 已废弃)  
  - 动态导入：调用模块内的内联函数如import()或者require.ensure()异步加载代码块    
  - [代码分割实践 ]('https://waliblog.com/webpack/2019/05/25/webpack-11.html')    
  
  ##### 9.1 手动配置webpack多个为入口  
  ```js
    // main.js
      console.log('main Module Loaded!');

    // another.js
      import _ from 'lodash';
      console.log(
        _.join(['A', 'Module', 'Loaded!'], ' ')
      );
    // webpack.config
      let path = require('path');
      module.exports = {
        mode: 'production',
        entry: {  //配置多个入口文件打包成多个代码块
          index: path.join(__dirname,'../src/main.js'),
          another: path.join(__dirname,'../src/untils/another.js'),
        },
        output: {
          filename: '[name].js',
          path: path.join(__dirname, 'dist')
        },
        module: { }
      }
    // 这样配置可以使得无关系的两个js模块可以并行加载，这种方式相比较于加载一个等价大小的js模块有速度上的提升。
    // 注： 但是也存在以下问题
    // 1.如果index.js也引入了lodash，那么lodash将会同时打包到两个js模块中
    // 2.不灵活，不能根据核心应用程序的逻辑来动态分割代码
  ```

  ##### 9.2 SpiltChunksPlugin [官方文档]('https://webpack.docschina.org/plugins/split-chunks-plugin/#src/components/Sidebar/Sidebar.jsx') 
  ```js
    //optimization与entry/plugins同级
    optimization:{
      splitChunks:{
        chunks: "all",          // async: 打包异步引入的代码块   all:  同步、异步   initial: 同步代码
        minSize: 30000,         // 字节  超出30kb的代码块
        minChunks: 1,           // 模块被使用次数
        maxAsyncRequests: 5,    // 同时加载的模块数 最多打包出的个数
        maxInitialRequests: 3,  // 首页 或 入口处
        automaticNameDelimiter: '~',    //
        name: true,
        cacheGroups:{   // 缓存组
          vendors: {   // vendors: false  打包的文件名不再添加vendors
            test: /[\\/]node_modules[\\/]/,
            name: 'commons',   // 拆分的名称
            priority: -10     // 优先级，当一个模块都符合cacheGroups分组条件，将按照优先权进行分组，priority值越大，优先权越高
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true   //  一个模块被打包过，不会重复打包
          }
        }
      }
    }
  ```

## 10. 开发和生产模块化区分  
  ##### 10.1 development 开发环境：
  - 在开发模式中，为了便于代码调试方便我们快速定位错误，不会压缩混淆源代码  
  - 模块热更新 （本地开启服务，实时更新）  
  - sourceMap (方便打包调试)  
  - 接口代理　 (配置proxyTable解决开发环境中的跨域问题)
  - 代码规范检查
    
  ##### 10.2 production 生产环境   
  - 生成模式中，就不需要调试代码，而是需要更快的页面加载，缓存优化等来提高用户体验  
  - 提取公共代码
  - 压缩混淆
  - 文件压缩/base64编码
  - 去除无用的代码

  ##### 10.3 共同点
  - 同样的入口
  - 同样的代码处理(loader处理)
  - 同样的解析配置

  ##### 10.4 webpack-merge 拼接开发环境和生产环境   
  ```js
    // 安装： npm install --save-dev webpack-merge
    // 结构：
    //  |- node_modules
    //  |- config
    //    |- index.js         // 通用配置
    //    |- dev.env.js       // 开发环境
    //    |- prod.env.js      // 生产环境
    //  |- dist
    //  |- src
    //    |- untils
    //    |- main.js
    //  |- package.json

    // 详细配置参考 note-02

  ```

## 11. 提取css文件
  - [extract-text-webpack-plugin](https://www.npmjs.com/package/extract-text-webpack-plugin)  
  - [mini-css-extract-plugin](https://www.npmjs.com/package/mini-css-extract-plugin)  
    - 如果当前项目是webpack3.x版本，使用extract-text-webpack-plugin； 
    - 如果当前项目是webpack4.x版本（但已有extract-text-webpack-plugin配置），可以继续用extract-text-webpack-plugin，但必须用对应的beta版本，且这个beta版本不支持生成hash；  
    - 如果当前项目是webpack4.x版本, 使用mini-css-extract-plugin

  ##### 11.1 extract-text-webpack-plugin
  ```js
    // 安装：
      // npm install --save-dev extract-text-webpack-plugin  安装后运行报错则运行下面命令重新安装
      // cnpm install --save-dev extract-text-webpack-plugin@4.0.0-beta.0

    // index.js
    const ExtractTextPlugin = require("extract-text-webpack-plugin");
    module:{
      rules:[
        { // 处理css文件，分离css文件
          test:/\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: "css-loader"
          })
        }
      ]
    }
    plugins: [
      new ExtractTextPlugin("assets/css/styles.css"),  // 分离后css文件名
    ],
  ```

  ##### 11.2 mini-css-extract-plugin
  - 此插件将CSS提取到单独的文件中。它为每个包含CSS的JS文件创建一个CSS文件。它支持CSS和SourceMaps的按需加载。  
  - webpack 需要 4.0 上。
  ```js
  // 安装：
    // npm install --save-dev mini-css-extract-plugin
    const MiniCssExtractPlugin = require("mini-css-extract-plugin");
    module.exports = {
      plugins: [
        new MiniCssExtractPlugin({
          filename: "[name].css",
          chunkFilename: "[id].css"
        })
      ],
      module: {
        rules: [
          {test: /\.css$/,
            use: [
              {
                loader: MiniCssExtractPlugin.loader,
              },
              "css-loader"
            ]
          }
        ]
      }
    }
  ```
  

## 12. 缓存
  > 1 浏览器使用一种名为 缓存 的技术, 可以通过命中缓存，以降低网络流量，使网站加载速度更快，    
  > 2 但是 我们在部署新版本时不更改资源的文件名，浏览器可能会认为它没有被更新，就会使用它的缓存版本  

  1. 输出文件的文件名  
    - 通过使用 output.filename 进行文件名替换，可以确保浏览器获取到修改后的文件；  
    - 使用 [contenthash] 替换，根据资源内容创建出唯一 hash。  
    - 资源内容发生变化时，[contenthash] 也会发生变化
  2. 模块标示符 (推荐用于生产环境构建)

    ```js
      // 可只在生产环境添加 contenthash
      output: {
        filename: '[name].[contenthash].js',
        path: path.join(__dirname,'../dist')
      }
      plugins: [
        new webpack.HashedModuleIdsPlugin(),   // 模块标识符 (推荐用于生产环境构建)
      ],
    ```

## 13. DefinePlugin
  - 允许创建一个在编译时可以配置的全局常量

  ```js
    plugins: [
      new webpack.DefinePlugin({
        IS_PRODUCTION: JSON.stringify(true),
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      })
    ],
  ```
## 14. [使用环境变量](https://www.webpackjs.com/guides/environment-variables/) 

## 14. [懒加载](https://www.webpackjs.com/guides/lazy-loading/)

## 16. [dll](https://waliblog.com/webpack/2019/06/05/webpack-22.html)
  > DLL(Dynamic Link Library)文件为动态链接库文件,在Windows中，许多应用程序并不是一个完整的可执行文件，它们被分割成一些相对独立的动态链接库，即DLL文件，放置于系统中。当我们执行某一个程序时，相应的DLL文件就会被调用  

## 15. 多页面打包配置
  - 多页面应用就是多个html文件。实现多页面webpack配置基本思路就是采用**多个入口配置**，
  - 然后**配置多个html-webpack-plugin**来生成多个html文件  
  - HtmlWebpackPlugin 中设置 **chunks** ，每个html只引入对应的js和css
  
  ```js
    const path  = require('path');
    const webpack = require('webpack');

    const HtmlWebpackPlugin = require('html-webpack-plugin');
    const ExtractTextPlugin = require("extract-text-webpack-plugin");  //css样式提取
    const MiniCssExtractPlugin = require("mini-css-extract-plugin");   //css样式提取
    const merge = require('webpack-merge');

    const devConfig = require('./dev.env.js');
    const proConfig = require('./prod.env.js');
    const devMode = process.env.NODE_ENV !== 'production';  // 环境变量

    const commonConfig  = {
      // 入口
      entry: {
        // index.html 的入口文件
        index: path.join(__dirname,'../src/main.js'),
        another: path.join(__dirname,'../src/untils/another.js'),
        // login.html 的入口文件
        login: path.join(__dirname,'../src/login/login.js')
      }, 
      output: { 
        path: path.join(__dirname, '../dist')
      },
      module:{},

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
  ```

  


