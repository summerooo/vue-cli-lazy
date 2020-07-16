// gzip
const CompressionPlugin = require('compression-webpack-plugin')
// drop console
const TerserPlugin = require('terser-webpack-plugin')
const proxy = require('./src/dev').proxy

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
								},
                output:{
                  // 去掉注释内容
                  comments: false
                }
							}
						})
					]
				},
        // 配置如何展示性能提示。例如,如果一个资源超过 250kb,webpack 会对此输出一个警告来通知你
        performance: {
          hints: false
        }
			}
		}
	},

	devServer: {
    port: 8008,
		proxy: proxy
	},
  // history  ->  '/'    hash  ->  './' 
	publicPath: undefined,
	outputDir: undefined,
	assetsDir: undefined,
	parallel: undefined,
	css: {
    loaderOptions: {
      sass: {
        data: '@import \'@/assets/css/variable.scss\';'
      }
    }
  }
}
