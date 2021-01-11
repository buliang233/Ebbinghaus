<template>
	<div>
		<el-dialog title="创建记录" :visible.sync="dialogFormVisible" :modal="false" @close="changeVisible" >
			<el-form ref="form" :model="form" label-width="80px" v-if="form">
				<el-form-item label="学习内容">
					<el-input type="textarea" v-model="form.study"></el-input>
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
		props: ['modify','currentRow','currentPage'],
		data() {
			return {
				dialogFormVisible: this.modify,
				// form: {
				// 	day: '',
				// 	study: ''
				// }
				form:''
			}
		},
		methods: {
			onSubmit(){
				let data = JSON.parse(localStorage.getItem('data'))
				data[this.currentPage-1].children[this.form.tid].study = this.form.study
				localStorage.setItem('data',JSON.stringify(data))
			},
			changeVisible() {
				this.$emit("getModifyVisible", false)
			},
		},
		watch: {
			modify() {
				this.dialogFormVisible = this.modify
			},
			currentRow(){
				this.form = this.currentRow
			}
		}
	}
</script>

<style>
</style>
