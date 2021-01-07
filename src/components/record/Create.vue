<template>
	<div>
		<el-dialog title="创建记录" :visible.sync="dialogFormVisible" :modal="false" @close="changeVisible">
			<el-form ref="form" :model="form" label-width="80px">
				<el-form-item label="活动时间">
					<el-col>
						<el-date-picker type="date" placeholder="选择日期" v-model="form.time" style="width: 100%;"></el-date-picker>
					</el-col>
				</el-form-item>
				<el-form-item label="活动名称">
					<el-input v-model="form.study"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="dialogFormVisible = false;onSubmit()">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		props: ['create'],
		data() {
			return {
				dialogFormVisible: this.create,
				form: {
					time: '',
					study: ''
				}
			}
		},
		methods: {
			changeVisible() {
				this.$emit("getVisible", false)
			},
			dateFormat(dateData) {
				var date = new Date(dateData)
				var y = date.getFullYear()
				var m = date.getMonth() + 1
				m = m < 10 ? ('0' + m) : m
				var d = date.getDate()
				d = d < 10 ? ('0' + d) : d
				const time = y + '-' + m + '-' + d
				return time
			},
			onSubmit() {
				this.form.time = this.dateFormat(this.form.time)
				let data = JSON.parse(localStorage.getItem('data'))
				let month = this.form.time.substr(5,2)
				let day = this.form.time.substr(8,2)
				data[month-1].children.push({id:month+day,day:this.form.time,study:[this.form.study],time:''})
				let newData = JSON.stringify(data) 
				localStorage.setItem('data',newData)
				location.reload()
			},
			

		},
		watch: {
			create() {
				this.dialogFormVisible = this.create
			}
		}
	}
</script>

<style>
</style>
