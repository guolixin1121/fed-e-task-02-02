# webpack

## 传统模块方式的问题
1. 浏览器兼容问题
   ES6需要转换成ES5
2. 模块请求频繁
   把多个模块打包合并，避免频繁请求
3. 所有前端资源都需要模块化 

## webpack特性
1. webpack通过loader对代码进行编译转换
2. code splitting拆分模块，避免文件过大或过下
3. 所有前端文件通过以资源模块处理，通过模块化方式定义和加载

## 工作模式(mode: 'value')
`production`: 自动启动优化插件
`development`: 
`none`：正常打包，不启动优化

## 自动化开发
### 自动编译打包
`--watch`: 此参数可以监听文件变化，自动打包输出

### 自动刷新浏览器
`BrowserSync`: 浏览器打开页面并自动刷新浏览器

### 最佳集成工具 - webpack dev server
自动编译 + 自动刷新浏览器   
中间结果不写入磁盘，效率更高   
通过代理解决本地环境下跨域问题   

```
devServer: {
  contentBase: ['./public'],  //
  proxy: {
    '/api/': {
      // http://localhot:8080/api/users => https://api.github.com/api/users
      target: 'https://api.github.com',
      // https://api.github.com/api/users => https://api.github.com/users
      pathRewrite: {
        '^/api': ''
      },
      // 不能把浏览器中localhost:8080作为主机名去服务器上访问，因为服务器不识别localhost
      // 需要以目标服务器的主机名api.github.com去服务器访问
      changeOrigin: true
    }
  }
}
```

### SourceMap
定义压缩前后的代码映射，方便调试

### HMR热更新 --hot
问题：页面自动刷新会重新打包并刷新页面，但是页面上所有的数据和状态都会消失。   
方案：热更新 - 局部更新模块，但运行状态不变
Q: 框架里已经内置了各类资源的局部模块更新机制，没有框架则需要手动添加更新逻辑

## 输出结果运行原理
1. 结果为一个立即执行(runtime)函数，参数为module数组，每一个module为参数列表相同的函数
   ···
   (function(modules){})
   ([function(module, __webpack_exports__. __webpack_require__){}])
   ···
2. 每个模块都包裹在module函数中，实现私有作用域
3. rumtime函数
   a. installedModule - 缓存已加载执行的模块
   b. __webpack_require__ - 加载并执行模块

## webpack loader
1. 负责加载非js类的其他资源文件
2. loader导出一个函数，入参source为资源文件，返回值必须是一段有效的js代码。输出后的js代码会作为module定义直接导出到生面说的module函数体内

## webpack plugin
一个函数或包含apply方法的对象，通过在webpack生命周期的钩子中挂载函数实现打包扩展