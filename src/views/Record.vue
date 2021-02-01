<template>
	<div class="record">
		<el-container>
			<el-aside width="200px">
				<div class="menu">
					<el-button type="primary" round @click="create=true">增加记录</el-button>
					<el-button type="primary" round @click="modifyClick">修改记录</el-button>
					<el-button type="primary" round @click="deleteClick">删除记录</el-button>
					<el-button type="primary" round @click="timeClick">计时</el-button>
					<el-button type="primary" round @click="isFinished">完成复习</el-button>
				</div>
			</el-aside>
			<el-container>
				<el-main>
					<el-table :data="tableData"  style="width: 100%;" @row-click="rowClick" :highlight-current-row="true" :row-class-name="tableRowClassName">
						<el-table-column type="index" width="50" >
						</el-table-column>
						<el-table-column prop="day" label="日期" width="120">
						</el-table-column>
						<el-table-column prop="study" label="学习内容" width="440">
						</el-table-column>
						<el-table-column prop="time" label="学习时长(分钟)">
						</el-table-column>
						<el-table-column prop="review" label="复习" width="200">
						</el-table-column>
					</el-table>
				</el-main>
				<el-footer style="position: fixed;bottom: 0;width: 100%;">
					<el-pagination
						background
						layout="prev, pager, next"
						:total="120"
						style="margin: 0 auto;width: 60%;"
						@current-change="pageChange">
					</el-pagination>
				</el-footer>
			</el-container>
		</el-container>
		
		<record-create :create="create" @getCreateVisible="changeCreate"></record-create>
		<record-modify :modify="modify" :currentRow="currentRow" :currentPage="currentPage" @getModifyVisible="changeModify"></record-modify>
		<record-delete :deleteRecord="deleteRecord" :currentRow="currentRow" :currentPage="currentPage" @getDeleteVisible="changeDelete"></record-delete>
		
	</div>
</template>

<script>
	// @ is an alias to /src
	import RecordCreate from '../components/record/Create.vue'
	import RecordModify from '../components/record/Modify.vue'
	import RecordDelete from '../components/record/Delete.vue'
	export default {
		name: 'Record',
		data() {
			return {
				create:false,
				modify:false,
				deleteRecord:false,
				tableData: [],
				currentPage:1,
				currentRow:'',
			}
		},
		components: {
			RecordCreate,
			RecordModify,
			RecordDelete
		},
		mounted() {
			this.getData(1)
		},
		methods:{
			//删除事件
			deleteClick(){
				if(this.currentRow===""){
					this.$message.error('请先选择一条记录');
				}else{
					this.deleteRecord=true
				}
			},
			//修改页事件
			modifyClick(){
				if(this.currentRow===""){
					this.$message.error('请先选择一条记录');
				}else{
					this.modify=true
				}
			},
			//根据复习完成情况添加对应的背景色
			tableRowClassName(row){
				if(row.row.isFinish==="true"){
					return 'success-row'
				}else{
					return 'warning-row'
				}
			},
			//复习完成与否操作
			isFinished(){
				if(this.currentRow===""){
					this.$message.error('请先选择一条记录');
				}else{
					this.$message.success('已完成');
					let data = JSON.parse(localStorage.getItem('data'))
					data[this.currentPage-1].children[this.currentRow.tid].isFinish="true"
					localStorage.setItem("data",JSON.stringify(data))
					this.getData(this.currentPage)
				}
				this.currentRow=""
			},
			//计时
			timeClick(){
				if(this.currentRow===""){
					this.$message.error('请先选择一条记录');
				}else{
					this.$message.success('成功计时');
					let currentTime = new Date().getTime()
					let data = JSON.parse(localStorage.getItem('data'))
					
					if(data[this.currentPage-1].children[this.currentRow.tid].startTime.length <= data[this.currentPage-1].children[this.currentRow.tid].endTime.length){
						data[this.currentPage-1].children[this.currentRow.tid].startTime.push(currentTime)
						let newData = JSON.stringify(data)
						localStorage.setItem('data',newData)
					}else{
						data[this.currentPage-1].children[this.currentRow.tid].endTime.push(currentTime)
						let newData = JSON.stringify(data)
						localStorage.setItem('data',newData)
					}
					
				}
				this.currentRow=""
				
				this.getData(this.currentPage)
			},
			//选中当前行
			rowClick(row){
				this.currentRow = row
			},
			//添加记录模态框回调
			changeCreate(val){
				this.create = val
				this.getData(this.currentPage)
			},
			//修改记录模态框回调
			changeModify(val){
				this.modify = val
				this.getData(this.currentPage)
				this.currentRow=""
			},
			//修改记录模态框回调
			changeDelete(val){
				this.deleteRecord = val
				this.getData(this.currentPage)
				this.currentRow=""
			},
			//分页发生变化的回调
			pageChange(n){
				this.currentPage=n
				this.getData(n)
			},
			//取内存中的数据
			getData(n){
				this.tableData = JSON.parse(localStorage.getItem('data'))[n-1].children
				let len = this.tableData.length;
				for(let i=0;i<len;i++){
					
					// //计算学习时长
					if(this.tableData[i].startTime===[] || this.tableData[i].endTime===[] || this.tableData[i].startTime.length!==this.tableData[i].endTime.length){
						this.tableData[i].time=0
					}else{
						let time = 0
						for(let j=0;j<this.tableData[i].startTime.length;j++){
							time += parseInt(this.tableData[i].endTime[j])  -  parseInt(this.tableData[i].startTime[j]) 
						}
						this.tableData[i].time = Math.round(time/1000/60)  
					}
					
					//添加一个用于计算时长的id，用来data中定位
					this.tableData[i].tid = i 
					//计算该复习的day
					if(n===1){
						if(i===0){
							this.tableData[i].review=[]
						}
						else if(i===1){
							this.tableData[i].review=[1]
						}else if(i>=2 && i<=3){
							this.tableData[i].review=[" ",i," ",i-1]
						}else if(i>=4 && i<=6){
							this.tableData[i].review=[" ",i," ",i-1," ",i-3]
						}else{
							this.tableData[i].review=[" ",i," ",i-1," ",i-3," ",i-6]
						}
					}else{
						const bmc = JSON.parse(localStorage.getItem('data'))[n-2].children.length
						
						if(i===0){
							this.tableData[i].review=[" ",bmc <=0 ? " ":-bmc," ",bmc-1 <=0 ? " ":-(bmc-1)," ",bmc-3 <=0 ? " ":-(bmc-3)," ",bmc-6 <=0 ? " ":-(bmc-6)]
						}
						else if(i===1){
							this.tableData[i].review=[" ",i," ",bmc <=0 ? " ":-bmc," ",bmc-2 <=0 ? " ":-(bmc-2)," ",bmc-5 <=0 ? " ":-(bmc-5)]
						}else if(i===2){
							this.tableData[i].review=[" ",i," ",i-1," ",bmc-1 <=0 ? " ":-(bmc-1)," ",bmc-4 <=0 ? " ":-(bmc-4)]
						}else if(i===3){
							this.tableData[i].review=[" ",i," ",i-1," ",bmc <=0 ? " ":-bmc," ",bmc-3 <=0 ? " ":-(bmc-3)]
						}else if(i===4){
							this.tableData[i].review=[" ",i," ",i-1," ",i-3," ",bmc-2 <=0 ? " ":-(bmc-2)]
						}else if(i===5){
							this.tableData[i].review=[" ",i," ",i-1," ",i-3," ",bmc-1 <=0 ? " ":-(bmc-1)]
						}else if(i===6){
							this.tableData[i].review=[" ",i," ",i-1," ",i-3," ",bmc <=0 ? " ":-bmc]
						}else{
							this.tableData[i].review=[" ",i," ",i-1," ",i-3," ",i-6]
						}
						
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
				margin 18px
				width 150px
				height 50px
				font-size 20px
	.table-right
		width 200px
		
	.el-table .warning-row {
		background: red;
		
	}
	
	.el-table .success-row {
		background: lawngreen;
	}
</style>
