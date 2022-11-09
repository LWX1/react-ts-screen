const {
	override,
	addWebpackAlias,
	addBabelPlugin,
	adjustStyleLoaders,
} = require("customize-cra");
const path = require("path");
const isProductionENV = process.env.NODE_ENV === "production";

// 配置生产环境打包不生成.map文件
if (isProductionENV) {
	process.env.GENERATE_SOURCEMAP = false;
}

module.exports = {
	webpack: override(
		addWebpackAlias({
			src: path.resolve(__dirname, "src"),
		}),
		adjustStyleLoaders((rule) => {
			if (rule.test.toString().includes("scss")) {
				rule.use.push({
					loader: require.resolve("sass-resources-loader"),
					options: {
						resources: "./src/assets/css/variable.scss",
					},
				});
			}
		}),
		addBabelPlugin([
			"import",
			{
				libraryName: "antd",
				libraryDirectory: "es",
				style: "css",
			},
		]),
		(config) => {
			config.optimization.splitChunks = {
				chunks: "async",
				minSize: 30000,
				minChunks: 2,
				// maxSize: 500 * 1024,
				maxAsyncRequests: 5,
				maxInitialRequests: 3,
				automaticNameDelimiter: "~",
				// name: true,
				cacheGroups: {
					moment: {
						chunks: "all",
						// chunks: "initial",
						name: "moment",
						test: /[\\/]node_modules[\\/]moment[\\/]/,
						priority: 100,
						reuseExistingChunk: true,
						enforce: true,
					},
					antdesign: {
						name: "antd",
						test: /[\\/]node_modules[\\/](antd|@ant-design)[\\/]/,
						priority: 100,
						reuseExistingChunk: true,
						enforce: true,
					},

					rcComponent: {
						chunks: "all",
						name: "rcComponent",
						test: /rc-[a-zA-Z]/,
						enforce: true,
					},

					react: {
						priority: 100,
						name: "react",
						reuseExistingChunk: true,
						test: /(react|react-dom|react-resizable|react-router-dom)/,
						enforce: true,
					},
					vendors: {
						chunks: "all",
						test: /[\\/]node_modules[\\/]/,
						priority: 10,
						reuseExistingChunk: true,
						reuseExistingChunk: true,
					},

					lib: {
						chunks: "all",
						name: "lib",
						minChunks: 2,
						priority: 20,
						// reuseExistingChunk: true
					},
				},
			};
			// console.dir(config);
			// console.dir(config.optimization.splitChunks.cacheGroups);
			return config;
		}
	),
};
