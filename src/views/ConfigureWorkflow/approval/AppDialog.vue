<template>
	<div>
		<!-- 审批流程类型 -->
		<el-dialog
			:title="flag == 1 ? '审批流程' : '编辑'"
			:visible.sync="dialogVisible"
			width="30%"
			align="left"
			@closed="nulls"
		>
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<el-form-item label="类型模型" prop="region">
					<el-select v-model="ruleForm.region" placeholder="请假流程">
						<el-option label="请假流程" value="qingjia"></el-option>
						<el-option label="出差流程" value="chuchai"></el-option>
						<el-option label="出差流程" value="chuchai"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="状态" prop="resource">
					<el-radio-group v-model="ruleForm.resource">
						<el-radio label="启用"></el-radio>
						<el-radio label="禁用"></el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="流程说明" prop="desc">
					<el-input type="textarea" v-model="ruleForm.desc"></el-input>
				</el-form-item>

				<el-form-item>
					<el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
					<el-button @click="resetForm('ruleForm')">取消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
export default {
	name: 'AppDialog',
	components: {},
	data() {
		return {
			dialogVisible: false,
			ruleForm: {},
			rules: {},
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
