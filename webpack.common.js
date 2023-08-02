const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: {
		bundle: ['./src/app/main.js'],
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
	},
	resolve: {
		modules: [path.resolve(__dirname, 'src'), 'node_modules'],
		extensions: ['', '.js', '.sass'],
	},
	module: {
		rules: [
			{
				test: /\.(jpg|jpeg|png|svg)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 10000,
							name: 'images/[name].[ext]',
						},
					},
				],
			},
		],
	},
	plugins: [
		new CopyWebpackPlugin({
			patterns: [
				'src/index.html',
				{
					from: 'src/assets/images',
					to: 'images',
					noErrorOnMissing: true,
				},
			],
		}),
	],
};
