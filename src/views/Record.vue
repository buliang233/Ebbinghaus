<template>
	<div class="record">
		<el-container>
			<el-aside width="200px">
				<div class="menu">
					<el-button type="primary" round>主要按钮</el-button>
					<el-button type="primary" round>主要按钮</el-button>
					<el-button type="primary" round>主要按钮</el-button>
					<el-button type="primary" round>主要按钮</el-button>
				</div>
			</el-aside>
			<el-main>
				<el-table :data="tableData" style="width: 100%">
					<el-table-column prop="date" label="日期" width="180">
					</el-table-column>
					<el-table-column prop="name" label="姓名" width="180">
					</el-table-column>
					<el-table-column prop="address" label="地址">
					</el-table-column>
				</el-table>
			</el-main>
		</el-container>
	</div>
</template>

<script>
	// @ is an alias to /src

	export default {
		name: 'Record',
		data() {
			return {
				tableData: [{
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1517 弄'
				}, {
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1519 弄'
				}, {
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1516 弄'
				}, {
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1519 弄'
				}, {
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1519 弄'
				}, {
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1519 弄'
				}, {
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1519 弄'
				}]
			}
		},
		components: {}
	}
</script>

<style lang="stylus">
	.el-aside
		padding 20px 0
		.menu
			display flex
			flex-direction column
			justify-content space-around
			align-items center
			height 100%
			.el-button
				margin 10px
				width 150px
				height 50px
				font-size 20px
</style>
