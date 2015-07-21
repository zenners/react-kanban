var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var HtmlwebpackPlugin = require('html-webpack-plugin');

var TARGET = process.env.TARGET;
var ROOT_PATH = path.resolve(__dirname);

var common = {
	entry: [
		path.resolve(ROOT_PATH, 'app/index')
	],
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	output: {
		path: path.resolve(ROOT_PATH, 'build'),
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.css$/,
				loaders: ['style', 'css']
			}
		]
	},
	plugins: [
		new HtmlwebpackPlugin({
			title: 'Kanban App'
		})
	]
}

if (TARGET === 'build'){
	module.exports = merge(common, {
		module:{
			loaders: [
				{
					test: /\.jsx?$/,
					loader: 'babel?stage=1',
					include: path.resolve(ROOT_PATH, 'app')
				}
			]
		},
		plugins: [
			new webpack.optimize.UglifyJsPlugin({
				compress: {
					warnings: false
				}
			}), 
			new webpack.DefinePlugin({
				'process.env': {
					'NODE_ENV': JSON.stringify('production')
				}
			})
		]
	})
}

if (TARGET === 'dev'){
	module.exports = merge(common, {
		module: {
			loaders: [
				{
					test:/\.jsx?$/,
					loaders: ['react-hot', 'babel', 'flowcheck', 'babel?stage=1&blacklist=flow'],
					include: path.resolve(ROOT_PATH, 'app')
				}
			]
		}
	})
}