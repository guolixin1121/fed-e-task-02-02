const merge = require('webpack-merge')
const common = require('./webpack.common')
const htmlWebpackPlugin = require('html-webpack-plugin')

const webpackConfig = merge(
	common,
	{
		// mode: 'development'
	}
)

module.exports = webpackConfig
