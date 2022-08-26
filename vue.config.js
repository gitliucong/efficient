const { defineConfig } = require('@vue/cli-service')
console.log(process)
module.exports = defineConfig({
	transpileDependencies: true,
	lintOnSave: false,
	productionSourceMap: false,
	publicPath: './', //根目录
	outputDir: 'dist', //输出文件地址
	assetsDir: 'static', //静态资源文件放置
	devServer: {
		port: 8089, //端口号
		https: false,
		host: '0.0.0.0',
		open: true,
		//配置代理
		proxy: {
			'/api': {
				changeOrigin: true,
				target: 'http://www.baidu.com',
				pathRewrite: {
					'/api': ''
				}
			}
		}
	}
})
