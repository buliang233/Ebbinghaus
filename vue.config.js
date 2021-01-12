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
	
	css: {
		extract: false
	}
}
