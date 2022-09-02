<template>
	<div>
		<!-- 姓名   所属部门   手机号 -->
		<div class="user-top">
			<el-form :inline="true" :model="formInline" class="demo-form-inline" >
				<el-form-item label="用户名">
					<el-input v-model="formInline.username" placeholder="请输入用户名"></el-input>
				</el-form-item>
				<el-form-item label="所属部门">
					<el-input v-model="formInline.dep_name" placeholder="请输入所属部门"></el-input>
				</el-form-item>
				<el-form-item label="手机号">
					<el-input v-model="formInline.phone" placeholder="请输入手机号"></el-input>
				</el-form-item>
			</el-form>
		</div>
		<!-- 查询重置     新增用户 -->
		<div class="user-center">
			<div>
				<el-button icon="el-icon-search"> 查询</el-button>
				<el-button icon="el-icon-refresh-right"> 重置</el-button>
			</div>
			<el-button class="added" type="primary" icon="el-icon-circle-plus-outline" @click="NewPosts">新增用户</el-button>
		</div>
		<!-- 表格 -->
		<template>
			<el-table
				:data="tableData"
				border
				style="width: 100%"
				stripe
				:header-cell-style="{ 'text-align': 'center' }"
				:cell-style="{ 'text-align': 'center' }"
			>
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
		<!-- 新增对话框 -->
		<UserDialog v-if="dialogFormVisible" ref="dialogForm" @close="close" @submitForm="submitForm"> </UserDialog>
	</div>
</template>

<script>
import UserDialog from './UserDialog'
// import { getUsers } from '../untils/api'

import { getUsers } from '../../../../api/api'
export default {
	name: 'UserView',
	components: {
		UserDialog
	},
	data() {
		return {
			department: '',
			tableData: [],
			currentPage: 1,
			pagesize: 1,
			dialogFormVisible: false,
			/* 1 新增  2修改  3详情 */
			flag: 1,
			formInline:{
				username:'',
				dep_name:'',
				phone:'',
			}
		}
	},
	methods: {
		/* 删除 */
		handleDelete(index, row) {
			console.log(index, row)
		},
		/* 修改 */
		handleEdit(index, row) {
			console.log(row)
			this.flag = 2
			this.dialogFormVisible = true
			this.$nextTick(() => {
				this.$refs.dialogForm.init(row)
			})
		},

		/* 详情 */
		details(index, row) {
			// console.log(index, row)
			this.flag = 3
			this.dialogFormVisible = true
			// this.ruleForm = row
			this.$nextTick(() => {
				this.$refs.dialogForm.deta(row)
			})
		},
		NewPosts() {
			this.flag = 1
			this.dialogFormVisible = true
			this.$nextTick(() => {
				console.log(this.$refs.dialogForm)
				this.$refs.dialogForm.NewPosts()
			})
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
		},
		close() {
			this.dialogFormVisible = false
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
	display: flex;
	align-items: center;
	
}
.user-center {
	display: flex;
	justify-content: space-between;
	margin-bottom: 20px;
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
.el-pagination {
	margin-top: 20px;
}
.el-form-item{
	margin:  20px;
}
</style>
