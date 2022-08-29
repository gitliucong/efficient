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
			<el-button class="added" type="primary" icon="el-icon-circle-plus-outline">新增用户</el-button>
		</div>
		<!-- 表格 -->
		<template>
			<el-table :data="tableData" border style="width: 100%">
				<el-table-column prop="id" label="id" width="55"> </el-table-column>
				<el-table-column prop="username" label="用户名称"> </el-table-column>
				<el-table-column prop="accout" label="账号"> </el-table-column>
				<el-table-column prop="phone" label="手机号"> </el-table-column>
				<el-table-column prop="role_name" label="所属角色"> </el-table-column>
				<el-table-column prop="rank_name" label="所属职级"> </el-table-column>
				<el-table-column prop="dep_name" label="所属部门"> </el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
						<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
						<el-button size="mini" type="danger" @click="details(scope.$index, scope.row)">详情</el-button>
					</template>
				</el-table-column>
			</el-table>
		</template>
	</div>
</template>

<script>
export default {
	name: '',
	components: {},
	data() {
		return {
			name: '', //姓名
			phone: '', //手机号
			department: '' //部门
		}
	},
	methods: {
		handleEdit(index, row) {
			console.log(index, row)
		},
		handleDelete(index, row) {
			console.log(index, row)
		},
		details(index, row) {
			console.log(index, row)
		}
	},
	computed: {},
	created() {},
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
.el-input {
	width: 300px;
}
</style>