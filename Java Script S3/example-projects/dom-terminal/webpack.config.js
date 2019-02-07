const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const webpack = require("webpack");

module.exports = (env) => {

	const devMode = !(env.production);
	console.log(`
	****************************
	    env.production = ${env.production} 
	    devMod = ${devMode}
	****************************
	`);


	let config =  {
		mode: devMode ? "development" : "production",
		entry: {
			'template-program': './src/template-program/index.js',
			'random-fair': './src/random-fair/index.js',
			'random-experiment': './src/random-experiment/index.js'
		},
		output: {
			filename: devMode ? '[name].js' : '[name].[chunkhash:8].js',
			path: path.resolve(__dirname, 'dist')
		},
		optimization: {
			minimizer: [
				new TerserPlugin({
					test: /\.js(\?.*)?$/i,
					sourceMap: true
				}),
				new OptimizeCSSAssetsPlugin({})
			]
		},
		plugins: [
			new MiniCssExtractPlugin({
				filename: devMode ? '[name].css' : '[name].[chunkhash:8].css',
			}),
			new HtmlWebpackPlugin({
				template: "./src/template-program/index.html",
				filename: "template-program.html",
				chunks: ['template-program'],
				favicon: path.resolve(__dirname, 'src/favicon.ico')
			}),
            new HtmlWebpackPlugin({
                template: "./src/random-fair/index.html",
                filename: "random-fair.html",
                chunks: ['random-fair'],
                favicon: path.resolve(__dirname, 'src/favicon.ico')
            }),
			new HtmlWebpackPlugin({
				template: "./src/random-experiment/index.html",
				filename: "random-experiment.html",
				chunks: ['random-experiment'],
				favicon: path.resolve(__dirname, 'src/favicon.ico')
			}),
			
			/* In Windows there is no development tool to compile
				canvas which is necessary for JSXGraph
				so JXG is bind manual here (Jus because of Windows!) Canvas must be ignored
				*/
			/*new webpack.ProvidePlugin({
				JXG: path.resolve(__dirname, "src/jsxgraph/0.99.7/jsxgraphcore.js"),
			}),*/
			new webpack.IgnorePlugin({
				resourceRegExp: /^canvas$/
			})
		],

		module: {
			rules: [
				// For Edge and IE Browser only, not recommendation
				/*{
					test: /\.m?js$/,
					exclude: /(node_modules|bower_components)/,
					use: {
						loader: 'babel-loader'
					}
				},*/
				{
					test: /\.(png|jpg|gif|ico)$/,
					use: [
						{
							loader: 'file-loader',
							options: {
								name: devMode ? '[name].[ext]' : '[name].[hash:8].[ext]',
							},
						},
					],
				},
				{
					test: /\.(html)$/,
					use: {
						loader: 'html-loader',
						options: {
							attrs: ['link:href']
						}
					}
				},
				{
					test: /\.css$/,
					use: [
						devMode ? 'style-loader' : {
							loader: MiniCssExtractPlugin.loader,
							options: {
								sourceMap: true,
							}
						},
						{
							loader: "css-loader"
						}
					]
				}
			]
		},
		devtool: devMode ? "eval-source-map" : "source-map"
	};
	
	
	if (devMode) {
		console.log("expose dfhi as debug to gloable scope");
		config.module.rules.unshift({
			test: require.resolve('./src/dfhi.js'),
			use: [{
				loader: 'expose-loader',
				options: 'debug'
			}]
		})
	}
	
	return config;
};