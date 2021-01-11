<template>
	<div>
		<el-dialog title="创建记录" :visible.sync="dialogFormVisible" :modal="false" @close="changeVisible">
			<h1>
				确定删除{{currentRow.day}}这条记录吗？
			</h1>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="dialogFormVisible = false;onSubmit()">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		props: ['deleteRecord', 'currentRow', 'currentPage'],
		data() {
			return {
				dialogFormVisible: this.deleteRecord,
			}
		},
		methods: {
			onSubmit(){
				let data = JSON.parse(localStorage.getItem('data'))
				data.[this.currentPage-1].children.splice(this.form.tid,1)
				localStorage.setItem('data',JSON.stringify(data))
				
			},
			changeVisible() {
				this.$emit("getDeleteVisible", false)
			},
		},
		watch: {
			deleteRecord() {
				this.dialogFormVisible = this.deleteRecord
			},
			currentRow() {
				this.form = this.currentRow
			}
		}
	}
</script>

<style>
</style>
