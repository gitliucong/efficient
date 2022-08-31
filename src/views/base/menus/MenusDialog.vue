<template>
	<div>
		<!-- 新增菜单对话框 -->
		<el-dialog
			:title="flag == 1 ? '新增菜单' : '修改'"
			:visible.sync="dialogVisible"
			width="30%"
			label-position="right"
			@closed="nulls"
		>
			<el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px">
				<el-form-item label="菜单类型" prop="radio">
					<el-radio-group v-model="radio">
						<el-radio :label="3">菜单</el-radio>
						<el-radio :label="6">目录</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="菜单名称" prop="m_name">
					<el-input v-model="ruleForm.m_name"></el-input>
				</el-form-item>
				<el-form-item label="菜单路径" prop="m_route">
					<el-input v-model="ruleForm.m_route"></el-input>
				</el-form-item>
				<el-form-item label="菜单图标" prop="icon">
					<el-input v-model="ruleForm.icon"></el-input>
				</el-form-item>
				<el-form-item label="上级菜单">
					<!-- <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree> -->
				</el-form-item>
				<el-form-item label="排序" prop="m_sort">
					<el-input v-model="ruleForm.m_sort"></el-input>
				</el-form-item>
				<!-- <el-cascader :options="options" :props="{ multiple: true, checkStrictly: true }" clearable></el-cascader> -->
				<el-form-item label="备注" prop="comment">
					<el-input type="textarea" v-model="ruleForm.comment"></el-input>
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
	name: 'MenusDialog',
	components: {},
	data() {
		return {
			ruleForm: {},
			rules: {},
			dialogVisible: false,
			flag: 1,
			radio: 3
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
