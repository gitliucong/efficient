<template>
	<div>
		<!-- 新增部门对话框 -->
		<el-dialog
			:title="flag == 1 ? '新增部门' : '修改'"
			:visible.sync="dialogVisible"
			width="50%"
			label-position="right"
			@closed="nulls"
		>
			<el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px">
				<el-form-item label="部门名称" prop="d_name">
					<el-input v-model="ruleForm.d_name"></el-input>
				</el-form-item>
				<el-form-item label="部门层级" prop="d_hierarchy">
					<el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
				</el-form-item>

				<el-form-item label="备注" prop="d_comment">
					<el-input type="textarea" v-model="ruleForm.d_comment"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
					<el-button @click="resetForm('ruleForm')">取消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
// import { putDepartment } from '../../../../api/api'
export default {
	name: 'DivisDialog',
	components: {},
	data() {
		return {
			ruleForm: {
				d_name: '',
				d_comment: '',
				d_hierarchy: ''
			},
			// ruleForms: {},
			rules: {},
			dialogVisible: false,
			flag: 1,
			data: [
				{
					label: '一级 1',
					children: [
						{
							label: '二级 1-1',
							children: [
								{
									label: '三级 1-1-1'
								}
							]
						}
					]
				},
				{
					label: '一级 2',
					children: [
						{
							label: '二级 2-1',
							children: [
								{
									label: '三级 2-1-1'
								}
							]
						},
						{
							label: '二级 2-2',
							children: [
								{
									label: '三级 2-2-1'
								}
							]
						}
					]
				},
				{
					label: '一级 3',
					children: [
						{
							label: '二级 3-1',
							children: [
								{
									label: '三级 3-1-1'
								}
							]
						},
						{
							label: '二级 3-2',
							children: [
								{
									label: '三级 3-2-1'
								}
							]
						}
					]
				}
			],
			defaultProps: {
				children: 'children',
				label: 'label'
			}
		}
	},
	methods: {
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.dialogVisible = false
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
			this.ruleForm = JSON.parse(JSON.stringify(row))
		},
		/* 新增 */
		NewPosts() {
			this.flag = 1
			this.dialogVisible = true
		},
		handleNodeClick(data) {
			console.log(data)
		}
	},
	computed: {},
	created() {},
	mounted() {}
}
</script>
<style scoped lang="scss"></style>
