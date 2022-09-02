<template>
	<div>
		<!-- 新增岗位对话框 -->
		<el-dialog title="新增岗位" :visible.sync="dialogFormVisible" width="50%" label-position="right" @closed="nulls">
			<el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px">
				<el-form-item label="岗位名称" prop="j_name">
					<el-input v-model="ruleForm.j_name"></el-input>
				</el-form-item>
				<el-form-item label="关联职级">
					<el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
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
import { addjobs } from '../../../../api/api'
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
			dialogFormVisible: false,
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
		handleNodeClick(data) {
			console.log(data)
		},
		init(row) {
			this.dialogFormVisible = true
			console.log(row)
			this.ruleForm = row
		},
		submitForm() {
			// this.$refs[formName].validate((valid) => {
			// 	if (valid) {
			// 		alert('submit!')
			// 	} else {
			// 		console.log('error submit!!')
			// 		return false
			// 	}
			// })
			addjobs({ j_name: this.ruleForm.j_name, j_comment: this.ruleForm.j_comment }).then((res) => {
				console.log(res, '新增')
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
