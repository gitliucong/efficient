<template>
	<div>
		<!-- 姓名   所属部门   手机号 -->
		<div class="user-top">
			<ul>
				<li>姓名: <el-input v-model="name" placeholder="请输入姓名"></el-input></li>
				<li>所属部门 <el-input v-model="phone" placeholder="请输入部门"></el-input></li>
				<li>手机号 <el-input v-model="department" placeholder="请输入手机号"></el-input></li>
			</ul>
		</div>
		<!-- 查询重置     新增用户 -->
		<div class="user-center">
			<div>
				<el-button icon="el-icon-search"> 查询</el-button>
				<el-button icon="el-icon-refresh-right"> 重置</el-button>
			</div>
			<el-button class="added" type="primary" icon="el-icon-circle-plus-outline" @click="dialogVisible = true"
				>新增用户</el-button
			>
		</div>
		<!-- 表格 -->
		<template>
			<el-table :data="tableData" border style="width: 100%" stripe>
				<el-table-column prop="id" label="id" width="55"> </el-table-column>
				<el-table-column prop="username" label="用户名称"> </el-table-column>
				<el-table-column prop="account" label="账号"> </el-table-column>
				<el-table-column prop="phone" label="手机号"> </el-table-column>
				<el-table-column prop="role_name" label="所属角色"> </el-table-column>
				<el-table-column prop="rank_name" label="所属职级"> </el-table-column>
				<el-table-column prop="dep_name" label="所属部门"> </el-table-column>
				<el-table-column label="操作">
					<template v-slot="scope">
						<el-button size="mini" type="info" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
						<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
						<el-button size="mini" @click="details(scope.$index, scope.row)">详情</el-button>
					</template>
				</el-table-column>
			</el-table>
		</template>
		<!-- 分页 -->
		<el-pagination
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
			:current-page="currentPage"
			:page-sizes="[1, 2, 3, 5]"
			:page-size="pagesize"
			layout="total, sizes, prev, pager, next, jumper"
			:total="this.tableData.length"
			align="right"
		>
		</el-pagination>
		<!-- 新增用户对话框 -->
		<el-dialog
			:title="flag == 1 ? '新增用户' : flag == 2 ? '修改用户' : '用户详情'"
			:visible.sync="dialogVisible"
			width="30%"
			label-position="right"
			@closed="nulls"
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
					<el-select v-model="ruleForm.role_name" placeholder="管理员角色">
						<el-option label="普通用户" value="shanghai"></el-option>
						<el-option label="部门管理员" value="beijing"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="所属岗位" prop="job_name">
					<el-select v-model="ruleForm.job_name" placeholder="销售岗">
						<el-option label="销售岗" value="shanghai"></el-option>
						<el-option label="技术" value="beijing"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="所属职级" prop="rank_name">
					<el-select v-model="ruleForm.rank_name" placeholder="1">
						<el-option label="2" value="shanghai"></el-option>
						<el-option label="3" value="beijing"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="所属部门" prop="dep_name">
					<el-select v-model="ruleForm.dep_name" placeholder="1">
						<el-option label="2" value="shanghai"></el-option>
						<el-option label="3" value="beijing"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="newAdd" v-show="flag != 3">{{ flag == 1 ? '新增' : '修改' }}</el-button>
					<el-button @click="dialogVisible = false">取消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
// import { getUsers } from '../untils/api'

import { getUsers } from '../../api/api'
export default {
	name: 'UserView',
	components: {},
	data() {
		return {
			name: '', //姓名
			phone: '', //手机号
			department: '', //部门
			tableData: [],
			currentPage: 1,
			pagesize: 1,
			dialogVisible: false,
			flag: 1, //1 新增  2修改  3详情
			ruleForm: {
				username: '', //用户名
				account: '', //账号
				phone: '', //手机
				role_name: '', //角色名称
				job_name: '', //所属岗位
				rank_name: '', //所属职级
				dep_name: '' //所属部门
			},
			rules: {
				username: [
					{ required: true, message: '请输入用户名', trigger: 'blur' },
					{ min: 3, max: 52, message: '长度在 3 到 5 个字符', trigger: 'blur' }
				],
				account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
				phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
				role_name: [{ type: 'date', required: true, message: '请选择角色名称', trigger: 'change' }],
				job_name: [{ type: 'date', required: true, message: '请选择所属岗位', trigger: 'change' }],
				rank_name: [{ required: true, message: '请选择所属职级', trigger: 'change' }],
				dep_name: [{ required: true, message: '请选择所属部门', trigger: 'change' }]
			}
		}
	},
	methods: {
		// 修改
		handleEdit(index, row) {
			// console.log(index, row)
			this.flag = 2
			this.dialogVisible = true
			this.ruleForm = row
		},
		// 删除
		handleDelete(index, row) {
			console.log(index, row)
		},
		// 新增
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
			this.getusers()
		},
		// 详情
		details(index, row) {
			// console.log(index, row)
			this.flag = 3
			this.dialogVisible = true
			this.ruleForm = row
		},
		nulls() {
			this.ruleForm = ''
		},
		handleSizeChange(val) {
			// console.log(`每页 ${val} 条`)
			this.pagesize = val
		},
		handleCurrentChange(val) {
			// console.log(`当前页: ${val}`)
			this.currentPage = val
		},
		getusers() {
			getUsers().then((res) => {
				console.log(res.data.userData)
				this.tableData = res.data.userData
			})
		}
	},
	computed: {},
	created() {
		this.getusers()
	},
	mounted() {}
}
</script>
<style scoped lang="scss">
.user-top {
	ul {
		display: flex;
		justify-content: space-between;
		li {
			width: 30%;
			text-align: left;
		}
	}
}
.user-center {
	display: flex;
	justify-content: space-between;
	margin: 25px 0;
	.added {
		margin-right: 150px;
	}
}
.el-select {
	width: 400px;
}
.el-input {
	width: 400px;
}
</style>
