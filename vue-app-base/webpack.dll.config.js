const webpack = require('webpack')
const path = require('path')

module.exports = {
	entry: {
		vendor: [ 'vue' ]
	},
	output: {
		path: path.join(__dirname, 'dist'),
		filename: '[name].js',
		library: '[name]_library'
	},
	plugins: [
		new webpack.DllPlugin({
			context: __dirname,
			path: path.join(__dirname, 'dist', '[name].manifest.json'),
			name: '[name]_library'
		})
	]
}
