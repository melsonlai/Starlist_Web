var path = require("path");

const srcPath = path.resolve(__dirname, "./src");
const distPath = path.resolve(__dirname, "./dist");

module.exports = {
	context: srcPath, 
	resolve: {
		alias: {	
		}
	}, 
	entry: {
		index: "./index.jsx", 
		vendor: ["react", "react-dom"]
	}, 
	output: {
		path: distPath, 
		filename: "[name].bundle.js"
	}, 
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/, 
				exclude: [/node_modules/], 
				use: [
					loader: "babel-loader", 
					options: {
						presets: [
							[
								"es2015", {
									modules: false
								}
							]
						]
					}
				]
			}, {
				test: /\.css$/, 
				use: [
					"style-loader", 
					{
						loader: "css-loader", 
						options: {
							url: false
						}
					}
				]
			}
		]
	}, 
	plugins: [new webpack.optimize.CommonsChunkPlugin({
		name: "vendor", 
		filename: "vendor.bundle.js", 
		minChunks: 2
	})
	], 
	devServer: {
		contentBase: distPath, 
		compress: true, 
		port: 8080
	}, 
	devtool: "cheap-source-map"
};
