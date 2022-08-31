<template>
	<div>
		<!-- 新增岗位对话框 -->
		<el-dialog title="新增岗位" :visible.sync="dialogFormVisible" width="30%" label-position="right" @closed="nulls">
			<el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px">
				<el-form-item label="岗位名称" prop="j_name">
					<el-input v-model="ruleForm.j_name"></el-input>
				</el-form-item>
				<el-form-item label="备注" prop="j_comment">
					<el-input type="textarea" v-model="ruleForm.j_comment"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitForm('ruleForm')">新增</el-button>
					<el-button @click="resetForm('ruleForm')">取消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
export default {
	name: 'JobsDialog',
	components: {},
	data() {
		return {
			ruleForm: {
				j_name: '',
				j_comment: ''
			},
			rules: {},
			dialogFormVisible: false
		}
	},
	methods: {
		init(row) {
			this.dialogFormVisible = true
			console.log(row)
			this.ruleForm = row
		},
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					alert('submit!')
				} else {
					console.log('error submit!!')
					return false
				}
			})
		},
		resetForm(formName) {
			this.$refs[formName].resetFields()
			this.dialogFormVisible = false
		},
		NewPosts() {
			this.dialogFormVisible = true
		},
		nulls() {
			this.ruleForm = {
				j_name: '',
				j_comment: ''
			}
		}
	},

	computed: {},
	created() {},
	mounted() {}
}
</script>
<style scoped lang="scss"></style>
