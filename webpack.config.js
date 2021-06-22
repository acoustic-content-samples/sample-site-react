const HtmlWebpackPlugin = require('html-webpack-plugin'),
	ExtractTextPlugin = require('extract-text-webpack-plugin'),
	TerserPlugin = require('terser-webpack-plugin'),
	path = require('path'),
	webpack = require('webpack');

module.exports = {
	entry: {
		main: ['babel-polyfill', path.resolve(__dirname, 'src/app.jsx')],
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				loader: 'babel-loader',
				query: { compact: false },
				include: [
					path.resolve(__dirname, 'src'),
					path.resolve(
						__dirname,
						'node_modules/@acoustic-content-sdk/wch-flux-sdk'
					),
				],
			},
			{
				test: /\.s?css$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'sass-loader'],
				}),
			},
			{
				test: /\.(gif|png|jpg|woff2?|)$/,
				loader: 'url-loader?limit=8192&name=[name].[ext]',
			},
			{
				test: /\.svg$/,
				include: [/styles[\\/]layouts[\\/]images/],
				loader: 'file-loader?name=[name].[ext]',
			},
			{
				test: /\.svg$/,
				exclude: [/styles[\\/]layouts[\\/]images/],
				loader: 'svg-sprite-loader',
			},
		],
	},
	// devtool: 'source-map',
	output: {
		path: path.resolve(__dirname, 'dist/assets'),
		filename: '[name].js',
		chunkFilename: '[name].js',
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				vendors: {
					test: /node_modules/,
					name: 'vendors',
					enforce: true,
					chunks: 'all',
				},
			},
		},
		minimizer: [
			new TerserPlugin({
				cache: true,
				parallel: true,
				sourceMap: true, // Must be set to true if using source-maps in production
				terserOptions: {
					ecma: undefined,
					warnings: false,
					parse: {},
					compress: {},
					mangle: true, // Note `mangle.properties` is `false` by default.
					module: false,
					output: null,
					toplevel: false,
					nameCache: null,
					ie8: true,
					keep_classnames: undefined,
					keep_fnames: false,
					safari10: true,
				},
			}),
		],
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				BROWSER: JSON.stringify(true),
				NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
			},
		}),
		new webpack.NoEmitOnErrorsPlugin(),
		new ExtractTextPlugin('[name].css'),
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'src/index.html'),
		}),
	],
	resolve: {
		alias: {
			styles: path.resolve(__dirname, './styles'),
		},
		extensions: ['.js', '.jsx'],
	},
	devServer: {
		contentBase: path.join(__dirname, 'dist/assets'),
		historyApiFallback: true,
		https: false,
	},
};
