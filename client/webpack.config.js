var HTMLWebpackPlugin = require('html-webpack-plugin');
var HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
	template: __dirname + '/app/index.html',
	filename: 'index.html',
	inject: 'body'
});


module.exports = {
	entry: __dirname + '/app/index.js',
	mode: process.env.NODE_ENV === "production" ? "production" : "development",
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				use: ['style-loader', 'css-loader','sass-loader']
			},
			{
				test: /\.css$/,
				exclude: /node_modules/,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.svg$/,
				loader: 'svg-inline-loader'
			}
		]
	},
	output: {
		filename: 'transformed.js',
		path: __dirname + '/build',
		publicPath: '/'
	},
	devServer: {
		historyApiFallback: true
	},
	plugins: [
		HTMLWebpackPluginConfig
	]
};
