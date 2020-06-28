# 郭丽新 | Part02 | Module02 
## 简答题
### 1. Webpack 的构建流程主要有哪些环节？如果可以请尽可能详尽的描述 Webpack 打包的整个过程。
webpack打包主要分：加载资源，打包资源，输出资源。   
1. 通过各类资源对应的loader将资源加载并转换成合法的JS语法文件
   Webpack本身只能处理JS资源，对于其他如图片、样式等类型的资源，都需要通过对应的loader去加载。   
   而其他资源文件都是将结果直接附加在js文件里，所以加载后的资源需要转换成合法的JS。   
   如url-loader将图片、文件等转换成base64字符串，并将变量exports出去。
2. 加载后的资源文件可以通过plugins做后期处理后再次输出资源，
   通过插件可以将加载后的资源进行二次加工，对其进行合并、压缩、挪移、自动输出html、启动代码拆分等优化和扩展操作
3. 最终将处理后的资源输出到指定的目录
   webpack将加载并优化处理过的代码输出到指定的目录

webpack可以通过配置文件对打包的过程进行定制和扩展，包括entry、output、loader、plugins、devServer等等

### 2. Loader 和 Plugin 有哪些不同？请描述一下开发 Loader 和 Plugin 的思路。
两者参与在Webpack的不同阶段，loader负责加载资源文件并转换成JS语法，而plugin负责对加载和转换后的资源进行二次加工处理。
**Loader**
`loader`负责加载资源，它是一个函数，入参source为原始的资源文件内容，函数负责将原始文件内容转换成合法的JS语法。

比如：将html-loader会将html文件里的字符串赋值给变量后，exports出去作为模块的对外成员。babel-loader通过babel的转换插件将ES6的JS文件转换成es5后，exports出去

``` javascript
// 加载markdown文件： 将md格式转换成html格式后exports出去
const marked = require('marked')

module.exports = (source) => {
	const html = marked(source)
	return `module.exports = ${JSON.stringify(html)}`
}
```

**plugin**
`plugin`负责对加载后的资源做优化和扩展，增强打包的能力。 它是一个函数或包含apply方法的对象，通过在webpack生命周期的钩子(hooks)中挂载函数实现打包扩展。   
注册插件入参为[`compiler`引擎](https://www.webpackjs.com/api/compiler-hooks/)，可在compiler的各类hooks中注册插件。   
插件函数入参为[`complication`](https://www.webpackjs.com/api/compilation-hooks/)，`compilation` 实例能够访问所有的模块和它们的依赖（大部分是循环依赖）。它会对应用程序的依赖图中所有模块进行字面上的编译(literal compilation)。在编译阶段，模块会被加载(loaded)、封存(sealed)、优化(optimized)、分块(chunked)、哈希(hashed)和重新创建(restored)。

比如： `uglify`插件负责将js文件进行压缩，`copy`插件负责将不需要打包的静态文件copy到输出目录

``` javascript
class MyPlugin {
	apply(compiler) {
		compiler.hooks.emit.tap('MyPlugin', (complication) => {
			for (let name in complication.assets) {
				if (name.endsWith('.js')) {
					const content = complication.assets[name].source()
					const contentWithoutComments = content.replace(/\/\*\*+\*\//g, '')
					complication.assets[name] = {
						source: () => contentWithoutComments,
						size: () => contentWithoutComments.length
					}
				}
			}
		})
	}
}
```

## 代码题
vue-app-base目录里