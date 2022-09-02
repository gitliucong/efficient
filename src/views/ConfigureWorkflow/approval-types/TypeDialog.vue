<template>
	<div>
		<!-- 添加流程对话框 -->
		<el-dialog :title="flag == 1 ? '添加流程类型' : '编辑'" :visible.sync="dialogVisible" width="30%" @closed="nulls">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<el-form-item label="类型名称" prop="type_name">
					<el-input v-model="ruleForm.type_name" placeholder="借款"></el-input>
				</el-form-item>
				<el-form-item label="类型模型" prop="type_board">
					<el-select v-model="ruleForm.type_board" placeholder="请假模板">
						<el-option label="请假模板" value="qingjia"></el-option>
						<el-option label="用户模板" value="yonghu"></el-option>
						<el-option label="借款模板" value="jiekuan"></el-option>
						<el-option label="出差模板" value="chuchai"></el-option>
						<el-option label="报销模板" value="baoxiao"></el-option>
						<el-option label="转正模板" value="zhuanzheng"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button @click="resetForm('ruleForm')">取消</el-button>
					<el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
export default {
	name: 'TypeDialog',
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
		// 确定
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
		//   取消
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
