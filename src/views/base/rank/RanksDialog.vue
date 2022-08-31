<template>
	<div>
		<!-- 新增职级对话框 -->
		<el-dialog
			:title="flag == 1 ? '新增职级' : '编辑'"
			:visible.sync="dialogVisible"
			width="30%"
			label-position="right"
			@closed="nulls"
		>
			<el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px">
				<el-form-item label="职级名称" prop="r_name">
					<el-input v-model="ruleForm.r_name"></el-input>
				</el-form-item>

				<el-form-item label="备注" prop="r_comment">
					<el-input type="textarea" v-model="ruleForm.r_comment"></el-input>
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
	name: 'RanksDialog',
	components: {},
	data() {
		return {
			ruleForm: {},
			rules: {},
			dialogVisible: false,
			flag: 1
		}
	},
	methods: {
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
			this.$emit('close')
		},
		nulls() {
			this.resetForm('ruleForm')
		},
		/* 修改 */
		init(row) {
			this.flag = 2
			this.dialogVisible = true
			this.ruleForm = row
		},
		/* 新增 */
		NewPosts() {
			this.flag = 1
			this.dialogVisible = true
		}
	},
	computed: {},
	created() {},
	mounted() {}
}
</script>
<style scoped lang="scss"></style>
