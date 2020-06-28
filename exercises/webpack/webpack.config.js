const path = require('path')
const webpack = require('webpack')
const html = require('html-webpack-plugin')

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

module.exports = {
	mode: 'none',
	output: {
		filename: 'bundle.js',
		path: path.join(__dirname, 'output')
	},
	devServer: {
		// contentBase: [ './public' ], //
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
	},
	module: {
		rules: [
			{
				test: /.md$/,
				use: './markdown-loader'
			}
		]
	},
	plugins: [ new html(), new MyPlugin(), new webpack.HotModuleReplacementPlugin() ]
}
