<template>
	<div class="record">
		<el-container>
			<el-aside width="200px">
				<div class="menu">
					<el-button type="primary" round @click="create=true">增加记录</el-button>
					<el-button type="primary" round>主要按钮</el-button>
					<el-button type="primary" round>主要按钮</el-button>
					<el-button type="primary" round>主要按钮</el-button>
				</div>
			</el-aside>
			<el-container>
				<el-main style="display: flex">
					<el-table :data="tableData" style="width: 100%;flex-grow: 2;">
						<el-table-column type="index" width="50">
						</el-table-column>
						<el-table-column prop="day" label="日期" width="180">
						</el-table-column>
						<el-table-column prop="study" label="学习内容" width="180">
						</el-table-column>
						<el-table-column prop="time" label="学习时长">
						</el-table-column>
						<el-table-column label="操作">
							<template >
								<el-button size="mini">计时</el-button>
							</template>
						</el-table-column>
					</el-table>
					<el-table :data="tableData1" style="width: 100%" class="table-right">
						<el-table-column prop="review" label="复习" width="180">
						</el-table-column>
						<el-table-column label="操作">
							<template >
								<el-button size="mini">完成</el-button>
							</template>
						</el-table-column>
					</el-table>
				</el-main>
				<el-footer style="position: fixed;bottom: 0;width: 100%;">
					<el-pagination
						background
						layout="prev, pager, next"
						:total="120"
						style="margin: 0 auto;width: 60%;">
					</el-pagination>
				</el-footer>
			</el-container>
		</el-container>
		
		<record-create :create="create" @getVisible="changeCreate"></record-create>
		
	</div>
</template>

<script>
	// @ is an alias to /src
	import RecordCreate from '../components/record/Create.vue'
	export default {
		name: 'Record',
		data() {
			return {
				create:false,
				tableData: [],
				tableData1:[]
			}
		},
		components: {
			RecordCreate
		},
		mounted() {
			this.getData(1)
		},
		methods:{
			changeCreate(val){
				this.create = val
			},
			getData(n){
				this.tableData = JSON.parse(localStorage.getItem('data'))[n-1].children
				
				let len = this.tableData.length;
				for(let i=0;i<len;i++){
					if(i===0){
						let review1 = {
							review:[]
						}
						this.tableData1.push(review1)
					}
					else if(i===1){
						let review1 = {
							review:[1]
						}
						this.tableData1.push(review1)
					}else if(i>=2 && i<=3){
						let review1 = {
							review:[" ",i," ",i-1]
						}
						this.tableData1.push(review1)
					}else if(i>=4 && i<=6){
						let review1 = {
							review:[" ",i," ",i-1," ",i-3]
						}
						this.tableData1.push(review1)
					}else{
						let review1 = {
							review:[" ",i," ",i-1," ",i-3," ",i-6]
						}
						this.tableData1.push(review1)
					}
				}
			}
		}
	}
</script>

<style lang="stylus">
	.el-aside
		padding 20px 0
		.menu
			position absolute
			display flex
			flex-direction column
			justify-content space-around
			align-items center
			.el-button
				margin 23px
				width 150px
				height 50px
				font-size 20px
	.table-right
		width 200px
</style>
