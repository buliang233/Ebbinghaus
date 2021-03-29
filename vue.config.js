const CompressionWebpackPlugin = require('compression-webpack-plugin');


module.exports = {
	publicPath: './' ,
	//多页打包配置
	pages: {
		index: {
			// 入口文件
			entry: 'src/main.js',
			/*这个是根入口文件*/
			// 模板文件
			template: 'public/index.html',
			// 输出文件
			filename: 'index.html',
			// 页面title
			title: 'Index Page'
		},
		login: {
			entry: 'src/login.js',
			template: 'public/login.html',
			filename: 'login.html',
			title: 'Login Page'
		}
	},
	productionSourceMap: false,
	chainWebpack: config => {
        config.module
            .rule('images')
            .use('image-webpack-loader')
            .loader('image-webpack-loader')
            .options({ bypassOnDebug: true })
            .end()
    },
	configureWebpack: config => {
		config.plugins.push(
	      new CompressionWebpackPlugin({
	          filename: info => {
	            return `${info.path}.gz${info.query}`
	          },
	          algorithm: 'gzip',
	          threshold: 1024, // 只有大小大于该值的资源会被处理 10240
	          test: new RegExp('\\.(' + ['js'].join('|') + ')$'
	          ),
	          minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
	          deleteOriginalAssets: false // 删除原文件
	      })
	    )
	},
	
	css: {
		extract: false
	}
}
