<template>
	<div>
		<!-- 新增用户对话框 -->
		<el-dialog
			:title="flag == 1 ? '新增用户' : flag == 2 ? '修改用户' : '用户详情'"
			:visible.sync="dialogFormVisible"
			width="50%"
			label-position="left"
			@closed="nulls"
			align="left"
		>
			<el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px">
				<el-form-item label="用户名称" prop="username">
					<el-input v-model="ruleForm.username"></el-input>
				</el-form-item>
				<el-form-item label="账号" prop="account">
					<el-input v-model="ruleForm.account"></el-input>
				</el-form-item>
				<el-form-item label="手机号" prop="phone">
					<el-input v-model="ruleForm.phone"></el-input>
				</el-form-item>
				<el-form-item label="角色名称" prop="role_name">
					<el-select v-model="ruleForm.role_name" placeholder="管理员角色" size="medium">
						<el-option label="管理员角色" value="管理员角色"></el-option>
						<el-option label="普通用户" value="普通用户"></el-option>
						<el-option label="部门管理员" value="部门管理员"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="所属岗位" prop="job_name">
					<el-select v-model="ruleForm.job_name" placeholder="销售岗">
						<el-option label="销售岗" value="销售岗"></el-option>
						<el-option label="技术岗" value="技术岗"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="所属职级" prop="rank_name">
					<el-select v-model="ruleForm.rank_name" placeholder="1">
						<el-option label="1" value="总经理"></el-option>
						<el-option label="2" value="部门经理"></el-option>
						<el-option label="3" value="副主任"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="所属部门" prop="dep_name">
					<el-select v-model="ruleForm.dep_name" placeholder="1">
						<el-option label="1" value="总经办"></el-option>
						<el-option label="2" value="人事部"></el-option>
						<el-option label="3" value="采购部"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitForm('ruleForm')" v-show="flag != 3">{{
						flag == 1 ? '新增' : '修改'
					}}</el-button>
					<el-button @click="resetForm('ruleForm')">取消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
export default {
	name: 'UserDialog',
	components: {},
	data() {
		return {
			dialogFormVisible: false,
			flag: 1,
			ruleForm: {
				/* 用户名 */
				username: '',
				/* 账号 */
				account: '',
				/* 手机 */
				phone: '',
				/* 角色名称 */
				role_name: '',
				/* 所属岗位 */
				job_name: '',
				/* 所属职级 */
				rank_name: '',
				/* 所属部门 */
				dep_name: ''
				/* 1 新增  2修改  3详情 */
			},
			/* 验证 */
			rules: {
				username: [
					{ required: true, message: '请输入用户名', trigger: 'blur' },
					{ min: 3, max: 52, message: '长度在 3 到 5 个字符', trigger: 'blur' }
				],
				account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
				phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
				role_name: [{ type: 'string', required: true, message: '请选择角色名称', trigger: 'change' }],
				job_name: [{ type: 'string', required: true, message: '请选择所属岗位', trigger: 'change' }],
				rank_name: [{ required: true, message: '请选择所属职级', trigger: 'change' }],
				dep_name: [{ required: true, message: '请选择所属部门', trigger: 'change' }]
			}
		}
	},
	methods: {
		init(row) {
			this.flag = 2
			this.dialogFormVisible = true
			console.log(row)
			this.ruleForm = row
		},
		NewPosts() {
			this.flag = 1
			this.dialogFormVisible = true
		},
		deta(row) {
			this.flag = 3
			this.dialogFormVisible = true
			this.ruleForm = row
		},
		/* 新增 */
		newAdd() {
			this.flag = 1
			this.dialogVisible = false
			this.ruleForm = {
				username: '', //用户名
				account: '', //账号
				phone: '', //手机
				role_name: '', //角色名称
				job_name: '', //所属岗位
				rank_name: '', //所属职级
				dep_name: '' //所属部门
			}
			// this.getusers()
		},
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					// alert('submit!')
					this.$emit('submitForm', this.ruleForm)
				} else {
					console.log('error submit!!')
					return false
				}
			})
			// console.log(formName)
		},
		resetForm(formName) {
			this.$refs[formName].resetFields()
			this.$emit('close')
		},
		nulls() {
			this.resetForm('ruleForm')
		}
	},
	computed: {},
	created() {},
	mounted() {}
}
</script>
<style scoped lang="scss">
.el-select{
	width: 95%;
}
.el-input{
	width: 95%;
}
</style>
