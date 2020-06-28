## 处理vue文件
安装vue-loader, vue-template-compiler, vue-style-loader，@vue/cli-plugin-babel

``` javascript
import { VueLoaderPlugin } = require('vue-loader')
module.exports = {
  ...
  module: {
    rules: [
       // 加载.vue文件
       {
         test: /\.vue$/,
         use: 'vue-loader'
       },
       // 应用在.js及vue的script块
       {
         test: /\.js$/,
         use: 'babel-loader'
       },
       // 应用在.css及vue的style块
       {
         test: /\.css$/,
         use: ['vue-style-loader', 'css-loader']
       }
    ]
  },
  plugins: [
    // vue加载的配置，必须引入
    // 不引入会报错：vue-loader was used without the corresponding plugin. Make sure to include VueLoaderPlugin in your webpack config.
    new VueLoaderPlugin()
  ]
}
```

## eslint
安装必要包
```yarn add eslint babel-eslint eslint-plugin-vue ```
指定lint参数
```yarn eslint --ext .js,.vue src```


## 打包问题汇总
1. vue-loader的16版本打包会出错
```export 'createNode' (imported as __createNode) was not found in Vue```类似这样很多wanring
方案： vue-loader降版本处理

2. . vue文件中的图片打包不对
```<img alt="Vue logo" src="[object Module]">```图片无法加载
方案： `url-loader`的 option 增加`esModule: false`
``` json
{
  test: /\.png$/,
  use: {
    loader: 'url-loader',
    options: {
      esModule: false,  // 增加此配置
      limit: 10 * 1024
    }
  }
}
```

3. webpack-dev-server启动后没有打开页面，而是把项目以目录结构打开
dev模式也要使用html-webpack-plugin生成html

4. 上述方案可以打开页面，但是页面报错 
```
Uncaught TypeError: Cannot convert undefined or null to object
    at hasOwnProperty (<anonymous>)
    at module.exports (VM28 has.js:4)
    at module.exports (VM91 well-known-symbol.js:19)
    at eval (array-species-create.js:7)
    at Object../node_modules/core-js/internals/array-species-create.js?ca96 (main.js:587)
    at __webpack_require__ (main.js:20)
    at eval (array-iteration.js:9)
    at Object../node_modules/core-js/internals/array-iteration.js?c666 (main.js:463)
    at __webpack_require__ (main.js:20)
    at eval (es.symbol.js:73)
``` 
方案：html-webpack-plugin为什么必须放在webpack.prod.js, 放在webpack.common.js里不可以？

5. vscode保存文件时报eslint错误
```
ESLint: Failed to load plugin 'vue' declared in 'vue-app-base\package.json': createRequire is not a function Referenced from: D:\projects\my\lagou\fed-e-task-02-02\vue-app-base\package.json. Please see the 'ESLint' output channel for details.
```