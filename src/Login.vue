<template>
	<div class="login">
		<vue-particle-line>
			<!-- 登录框 -->
			<div class="form">
				<el-form ref="form" :model="login" label-width="80px">
					<el-form-item class="ceshi" label="用户名">
						<el-input v-model="login.ebbName"></el-input>
					</el-form-item>
					<el-form-item label="密  码">
						<el-input type="password" v-model="login.passWord"></el-input>
					</el-form-item>
					<el-form-item class="submit">
						<el-button class="button" type="primary" @click="onSubmit">登录</el-button>
					</el-form-item>
				</el-form>
			</div>
			<!-- 提示框 -->
			<div @click="drawer = true" type="primary" class="pic">
				<div>
					<img src="./assets/images/ebbinghaus.jpg" alt="">
				</div>
				<div class="explain">
					<span>有问题？</span>
				</div>
			</div>
			<el-drawer title="我是标题" :visible.sync="drawer" :with-header="false" direction="ltr" >
				<div class="word" style="height: 100vh; overflow-y: scroll;">
					<el-tag>我的自述</el-tag>
					<p>你好!我叫Hermann Ebbinghaus</p>
					<p>保持和遗忘是一对冤家对头。你对以前学过的知识能够回忆起来，就是保持住了，如果回忆不起来或回忆错了，就是遗忘。</p>
					<p>经过我的研究，我发现在学习中记忆的内容遗忘是有规律的，遗忘的进程不是均衡的，不是固定的一天丢掉几个，转天又丢几个的，而是在记忆的最初阶段遗忘的速度很快，后来就逐渐减慢了，到了相当长的时候后，几乎就不再遗忘了，这就是遗忘的发展规律，即"先快后慢"的原则。观察这条遗忘曲线，你会发现，学到的知识在一天后，如不抓紧复习，就只剩下原来的25%。随着时间的推移，遗忘的速度减慢，遗忘的数量也就减少。</p>
					<p>重点来了！</p>
					<p>1、不同的人有不同的遗忘曲线。</p>
					<p>2、不同的记忆材料有不同的遗忘曲线。</p>
					<p>所以说，如果我的记忆法对你没用的话可不要赖我哦！自律最重要！</p>
					<p>关于记忆表格的使用可以自行百度。</p>
					<el-divider></el-divider>
					<el-tag type="success">登录页说明</el-tag>
					<p>项目目前还没有后端，只可以注册一个用户，第一次登录既自动注册，至于数据存在哪里，懂自懂。</p>
				</div>
			</el-drawer>
		</vue-particle-line> 
	</div>
</template>

<script>
	export default {
		name: 'Login',
		data(){
			return {
				login:{
					ebbName:'',
					passWord:''
				},
				drawer: false,
				data:[
						{
							id:1,
							month:'1月',
							children:[]
						},
						{
							id:2,
							month:'2月',
							children:[]
						},
						{
							id:3,
							month:'3月',
							children:[]
						},
						{
							id:4,
							month:'4月',
							children:[]
						},
						{
							id:5,
							month:'5月',
							children:[]
						},
						{
							id:6,
							month:'6月',
							children:[]
						},
						{
							id:7,
							month:'7月',
							children:[]
						},
						{
							id:8,
							month:'8月',
							children:[]
						},
						{
							id:9,
							month:'9月',
							children:[]
						},
						{
							id:10,
							month:'10月',
							children:[]
						},
						{
							id:11,
							month:'11月',
							children:[]
						},
						{
							id:12,
							month:'12月',
							children:[]
						},
						
					]
			}
		},
		methods:{
			onSubmit (){
				const ebbName = this.login.ebbName.trim()
				const passWord = this.login.passWord.trim()
				if(ebbName!=="" && passWord!==""){
					let user = {
						ebbName : ebbName,
						passWord : passWord
					}
					
					const userCopy = JSON.parse(localStorage.getItem('userCopy')) 
					
					if(userCopy){
						if(user.ebbName!==userCopy.ebbName || user.passWord!==userCopy.passWord){
							this.$message.error('信息错误');
						}else{
							this.storage(user)
						}
					}else{
						localStorage.setItem("data",JSON.stringify(this.data))
						this.storage(user)
						
					}	
				}else{
					this.$message.error('不可空登录哦');
				}
			},
			//存储并跳转
			storage(user){
				localStorage.setItem('user',JSON.stringify(user))
				localStorage.setItem('userCopy',JSON.stringify(user))
				location.href='/index.html'
			}
		}

	}
</script>

<style lang="stylus" scoped>
	.login
		position relative
		width 100vw 
		height 100vh
		.form
			position absolute
			top 0
			right 0
			bottom 0
			left 0
			margin auto
			width 400px
			height 165px
			color #FFFFFF
			.submit
				text-align center
		.pic
			position absolute
			padding 10px
			width 100px
			height 100px
			text-align center
			color #FFFFFF
			cursor pointer
			img
				width 80%
				height 80%
				border-radius 24px
			.explain
				margin-top 5px
			
	p
		text-indent 2em
	.login >>> .vue-particle-line .canvas[data-v-06727b55] {
		background-color #283644 
		z-index -1
	}
	.form >>> .el-form-item__label {
		color: #ffffff;
	}

	
</style>
