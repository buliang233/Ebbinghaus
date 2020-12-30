<template>
	<div id="app">
		<vue-particle-line>
			<div id="nav">
				<router-link to="/">Home</router-link> |
				<router-link to="/statistics">Statistics</router-link>
			</div>
			<router-view />
		</vue-particle-line>
	</div>
</template>

<style lang="stylus" scoped>
	// 粒子背景调整,不设置z-index页面内容不可用
	#app >>> .vue-particle-line .canvas[data-v-06727b55] {
		background-color #283644 
		z-index -1
	}
	#app 
		width 100vw 
		height 100vh 
		color #FFFFFF
</style>
