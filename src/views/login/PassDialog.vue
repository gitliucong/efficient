<template>
	<div>
		<el-dialog title="修改密码" :visible.sync="dialogFormVisible" width="600px" @closed="nulls">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<el-form-item label="用户名" prop="account">
					<el-input v-model="ruleForm.account" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="新密码" prop="password">
					<el-input v-model="ruleForm.password" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="再次输入" prop="code">
					<el-input v-model="ruleForm.code" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitForm('ruleForm')">确认</el-button>
					<el-button @click="resetForm('ruleForm')">取消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
export default {
	name: 'PassDialog',
	components: {},
	data() {
		// 用户名校验
		var checkUserName = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请输入用户名'))
			} else {
				if (this.ruleForm.userName !== '') {
					this.$refs.ruleForm.validateField('checkPass')
				}
				callback()
			}
		} // 密码校验
		var validatePass = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请输入密码'))
			} else {
				if (this.ruleForm.password !== '') {
					this.$refs.ruleForm.validateField('checkPass')
				}
				callback()
			}
		} // 再次输入密码校验
		var validatePass2 = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请再次输入密码'))
			} else if (value !== this.ruleForm.code) {
				callback(new Error('两次输入密码不一致!'))
			} else {
				callback()
			}
		}
		return {
			ruleForm: {
				account: '',
				password: '',
				code: ''
			},
			rules: {
				account: [{ validator: checkUserName, trigger: 'blur' }],
				password: [{ validator: validatePass, trigger: 'blur' }],
				code: [{ validator: validatePass2, trigger: 'blur' }]
			},
			dialogFormVisible: false
		}
	},
	methods: {
		forget() {
			this.dialogFormVisible = true
		},
		xiugai() {
			this.dialogFormVisible = true
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
.el-input {
	width: 400px;
}
</style>
