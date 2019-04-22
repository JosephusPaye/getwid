const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// Set different CSS extraction for editor only and common block styles
const blocksCSSPlugin = new ExtractTextPlugin({
	filename: './assets/css/blocks.style.css'
});
const editBlocksCSSPlugin = new ExtractTextPlugin({
	filename: './assets/css/blocks.editor.css'
});

// Configuration for the ExtractTextPlugin.
const extractConfig = {
	use: [
		{
			loader: 'raw-loader'
		},
		{
			loader: 'postcss-loader',
			options: {
				plugins: [require('autoprefixer')]
			}
		},
		{
			loader: 'sass-loader',
			query: {
				outputStyle:
					'production' === process.env.NODE_ENV ? 'compressed' : 'nested'
			}
		}
	]
};

const config = {
	entry: {
		'./assets/js/editor.blocks': './src/index.js',
		'./assets/js/frontend.blocks': './src/frontend.js'
	},
	output: {
		path: path.resolve(__dirname),
		filename: '[name].js'
	},
	devtool: 'production' !== process.env.NODE_ENV ? 'cheap-eval-source-map' : false,
	watch: 'production' !== process.env.NODE_ENV,
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test: /style\.s?css$/,
				use: blocksCSSPlugin.extract(extractConfig)
			},
			{
				test: /editor\.s?css$/,
				use: editBlocksCSSPlugin.extract(extractConfig)
			},
		]
	},
	externals: {
		'react': 'React',
		'react-dom': 'ReactDOM',
		'lodash': 'lodash',
		'@wordpress/i18n': { this: [ 'wp', 'i18n' ] }
	},
	resolve: {
		alias: {
			GetwidControls: path.resolve(__dirname, 'src/controls/'),
			GetwidUtils: path.resolve(__dirname, 'src/utils/'),
			GetwidVendor: path.resolve(__dirname, 'vendors/'),
		}
	},
	plugins: [
		blocksCSSPlugin,
		editBlocksCSSPlugin
	],
	stats: { children: false },
};

module.exports = config;
