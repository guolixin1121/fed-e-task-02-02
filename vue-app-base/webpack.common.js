const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

function resolve(dir) {
	return path.join(__dirname, dir)
}
console.log('node env', process.env.NODE_ENV)
module.exports = {
	mode: 'none',
	entry: {
		main: path.join(__dirname, 'src/main.js')
	},
	module: {
		rules: [
			{
				test: /\.js$/g,
				use: 'babel-loader',
				include: [ resolve('src') ]
			},
			{
				test: /\.less$/,
				use: [
					process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
					'css-loader',
					'less-loader'
				]
			},
			{
				test: /\.css$/,
				use: [
					process.env.NODE_ENV !== 'production' ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
					'css-loader'
				]
			},
			{
				test: /\.vue$/,
				use: 'vue-loader'
			},
			{
				test: /\.png$/,
				use: {
					loader: 'url-loader',
					options: {
						esModule: false,
						limit: 10 * 1024
					}
				}
			}
		]
	},
	plugins: [
		new VueLoaderPlugin(),

		new HtmlWebpackPlugin({
			title: 'test',
			template: './public/index.html'
		})
	]
}
