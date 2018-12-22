// gzip
const CompressionPlugin = require('compression-webpack-plugin')
// drop console
const TerserPlugin = require('terser-webpack-plugin')
module.exports = {
	runtimeCompiler: undefined,
	productionSourceMap: false,

	configureWebpack() {
		if (process.env.NODE_ENV === 'production') {
			return {
				plugins: [
					new CompressionPlugin({
						test: /\.js$|\.html$|.\css/, //匹配文件名
						threshold: 10240, //对超过10k的数据压缩
						deleteOriginalAssets: false //不删除源文件
					})
				],
				optimization: {
					minimizer: [
						new TerserPlugin({
							terserOptions: {
								compress: {
									drop_console: true,
									warnings: false,
									drop_debugger: true
								}
							}
						})
					]
				}
			}
		}
	},

	devServer: {
		proxy: {
			'/api': {
				target: 'http://192.168.10.104:8090',
				pathRewrite: {
					'^/api': '/'
				}
			}
		}
	},

	baseUrl: './',
	outputDir: undefined,
	assetsDir: undefined,
	parallel: undefined,
	css: undefined
}
