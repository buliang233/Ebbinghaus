<template>
	<div id="app">
		<vue-particle-line>
			<el-container>
				<el-header>
					<el-switch
						style="display: block"
						v-model="value2"
						active-color="#13ce66"
						inactive-color="#ff4949"
						active-text="记录"
						inactive-text="统计"
						@change="getValue">
					</el-switch>
							
					<!-- <div id="nav">
						<router-link to="/" tag="button">record</router-link>
						<router-link to="/statistics" tag="button">statistics</router-link>
					</div> -->
				</el-header>

				<el-main>
					<keep-alive>
						<router-view />
					</keep-alive>
				</el-main>
				<div class="out">
					<el-popconfirm
						confirm-button-text='YES'
						cancel-button-text='NO'
						icon="el-icon-info"
						icon-color="red"
						title="确定要退出吗？"
						@confirm="out"
					>
						<el-button type="primary" slot="reference" circle>
							<i class="el-icon-circle-close"></i>
						</el-button>
					</el-popconfirm>
					
				</div>
			</el-container>
			

		</vue-particle-line>
		
	</div>
</template>



<script>
	export default {
		data() {
			return {
				//开关数据
				value2:''
			}
		},
		mounted() {
			
		},
		methods: {
			getValue(){
				if(this.$route.path==='/'){
					this.$router.push('/statistics')
				}else{
					this.$router.push('/')
				}
			},
			out(){
				localStorage.removeItem('user')
				location.reload()
			}
		},
		watch: {
			$route: {
				handler: function(val){
					//console.log(val)
					if(val.path==='/'){
						this.value2=true
					}else{
						this.value2=false
					}
				},
			}
		}
	}
</script>

<style lang="stylus" scoped>
	#app
		position relative
		width 100vw 
		height 100vh 
		color #FFFFFF

	// 粒子背景调整,不设置z-index页面内容不可用
	#app>>>.vue-particle-line .canvas[data-v-06727b55] {
		background-color #283644 
		z-index -1
	}
	::-webkit-scrollbar {
		/*隐藏滚轮*/
		display: none;
	}
	
	.el-container
		box-sizing content-box
		position absolute 
		top 0
		right 0
		bottom 0
		left 0
		margin auto
		width 80vw
		height 80vh
		opacity .9
		.out
			position absolute
			right 5%
			top 3%
			width 20px
			height 20px
			.el-button
				padding 5px
				font-size 24px
	.el-switch
		top 40%
		left 80%
		width 130px
		height 30px

</style>
