const { override, addWebpackAlias, addBabelPlugin } = require("customize-cra");
const path = require("path");
const isProductionENV = process.env.NODE_ENV === "production";

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
			config.optimization.concatenateModules = false;
			config.optimization.splitChunks = {
				chunks: "all",
				minSize: 30000,
				minChunks: 2,
				// maxSize: 500 * 1024,
				maxAsyncRequests: 5,
				maxInitialRequests: 3,
				automaticNameDelimiter: "~",
				name: true,
				cacheGroups: {
					echarts: {
						// chunks: "initial", // initial处理import；async 处理import()；all处理两种
						// minChunks: 1,
						name: "echarts",
						test: /[\\/]node_modules[\\/]echarts[\\/]/,
						priority: 100,
						// reuseExistingChunk: true,
						enforce: true, // 忽略最小最大size 和request 次数等，单独创建
					},
					lodash: {
						// name: "lodash",
						minChunks: 1,
						test: /[\\/]node_modules[\\/]lodash[\\/]/,
						priority: 100,
						// reuseExistingChunk: true,
						// enforce: true
					},
					moment: {
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
						test: /[\\/]node_modules[\\/]/,
						priority: 10,
						reuseExistingChunk: true,
						reuseExistingChunk: true,
					},

					lib: {
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
