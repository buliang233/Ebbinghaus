<template>
	<div class="login">
		<vue-particle-line>
			<div class="form">
				<el-form ref="form" :model="login" label-width="80px">
					<el-form-item class="ceshi" label="用户名">
						<el-input v-model="login.name"></el-input>
					</el-form-item>
					<el-form-item label="密码">
						<el-input v-model="login.password"></el-input>
					</el-form-item>
					<el-form-item class="submit">
						<el-button class="button" type="primary" @click="onSubmit">立即创建</el-button>
					</el-form-item>
				</el-form>
			</div>
		</vue-particle-line>
	</div>
</template>

<script>
	export default {
		name: 'Login',
		data(){
			return {
				login:{
					name:'',
					password:''
				}
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
			height 300px
			color #FFFFFF
			.submit
				text-align center
	.login >>> .vue-particle-line .canvas[data-v-06727b55] {
		background-color #283644 
		z-index -1
	}
	.form >>> .el-form-item__label {
		color: #ffffff;
	}
	
</style>
