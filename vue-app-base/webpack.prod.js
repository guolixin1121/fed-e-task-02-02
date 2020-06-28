process.env.NODE_ENV = 'production'
const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common')
const CopyPlugin = require('copy-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const path = require('path')

const webpackConfig = merge(common, {
	// mode: 'production',
	plugins: [
		// new BundleAnalyzerPlugin(),
		new MiniCssExtractPlugin('main.css'),
		new OptimizeCSSAssetsPlugin(),
		new CopyPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, './public/favicon.ico'),
					to: path.resolve(__dirname, './dist/favicon.ico')
				}
			]
		}),
		new webpack.DllReferencePlugin({
			context: __dirname,
			manifest: require('./dist/vendor.manifest.json')
		})
	]
})

module.exports = webpackConfig
