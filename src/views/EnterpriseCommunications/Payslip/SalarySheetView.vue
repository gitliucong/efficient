<template>
	<div>
		<!-- 姓名   所属部门   手机号 -->
		<div class="salaey-top">
			<ul>
				<li>姓名: <el-input v-model="name" placeholder="请输入姓名"></el-input></li>
				<li>账号 <el-input v-model="department" placeholder="请输入部门"></el-input></li>
				<li>手机号 <el-input v-model="phone" placeholder="请输入手机号"></el-input></li>
			</ul>
		</div>
		<!-- 查询重置     新增用户 -->
		<div class="salaey-center">
			<div class="salaey-btn">
				<el-button icon="el-icon-search"> 查询</el-button>
				<el-button icon="el-icon-refresh-right"> 重置</el-button>
				<el-button> 下载工资条模板</el-button>
				<el-upload
					class="upload-demo"
					action="https://jsonplaceholder.typicode.com/posts/"
					:on-preview="handlePreview"
					:on-remove="handleRemove"
					:before-remove="beforeRemove"
					multiple
					:limit="3"
					:on-exceed="handleExceed"
					:file-list="fileList"
				>
					<el-button size="small" type="primary">点击上传</el-button>
					<!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
				</el-upload>
			</div>
			<el-button class="added" type="primary" icon="el-icon-circle-plus-outline" @click="NewPosts">新增用户</el-button>
		</div>
		<!-- 表格 -->
		<template>
			<el-table :data="tableData" border style="width: 100%" stripe>
				<el-table-column prop="id" label="id" width="55"> </el-table-column>
				<el-table-column prop="username" label="姓名"> </el-table-column>
				<el-table-column prop="days" label="出勤"> </el-table-column>
				<el-table-column prop="miner_days" label="旷工"> </el-table-column>
				<el-table-column prop="leave_days" label="请假"> </el-table-column>
				<el-table-column prop="basic_salary" label="基本工资"> </el-table-column>
				<el-table-column prop="post_salary" label="岗位工资"> </el-table-column>
				<el-table-column label="操作">
					<template v-slot="scope">
						<el-button size="mini" type="info" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
						<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
		<SalaryDialog v-if="dialogFormVisible" ref="dialogForm" @close="close"> </SalaryDialog>
	</div>
</template>

<script>
import SalaryDialog from './SalaryDialog'
// import { getUsers } from '../untils/api'

import { getPayroll } from '../../../../api/api'
export default {
	name: 'UserView',
	components: {
		SalaryDialog
	},
	data() {
		return {
			/* 姓名 */
			name: '',
			/* 手机号 */
			phone: '',
			/* 部门 */
			department: '',
			tableData: [],
			currentPage: 1,
			pagesize: 1,
			dialogFormVisible: false,
			/* 1 新增  2修改  3详情 */
			flag: 1,
			fileList: [
				// {
				// 	name: 'food.jpeg',
				// 	url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
				// },
				// {
				// 	name: 'food2.jpeg',
				// 	url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
				// }
			]
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
		/* 新增 */
		NewPosts() {
			this.flag = 1
			this.dialogFormVisible = true
			this.$nextTick(() => {
				console.log(this.$refs.dialogForm)
				this.$refs.dialogForm.NewPosts()
			})
		},
		close() {
			this.dialogFormVisible = false
		},
		handleSizeChange(val) {
			// console.log(`每页 ${val} 条`)
			this.pagesize = val
		},
		handleCurrentChange(val) {
			// console.log(`当前页: ${val}`)
			this.currentPage = val
		},
		getpayroll() {
			getPayroll().then((res) => {
				console.log(res.data.payrollData)
				this.tableData = res.data.payrollData
			})
		},
		/* 上传 */
		handleRemove(file, fileList) {
			console.log(file, fileList)
		},
		handlePreview(file) {
			console.log(file)
		},
		handleExceed(files, fileList) {
			this.$message.warning(
				`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`
			)
		},
		beforeRemove(file) {
			return this.$confirm(`确定移除 ${file.name}？`)
		}
	},
	computed: {},
	created() {
		this.getpayroll()
	},
	mounted() {}
}
</script>
<style scoped lang="scss">
.salaey-top {
	ul {
		display: flex;
		justify-content: space-between;
		li {
			width: 30%;
			text-align: left;
		}
	}
}
.salaey-center {
	display: flex;
	justify-content: space-between;
	margin: 25px 0;
	.salaey-btn {
		display: flex;
		align-items: center;
		.upload-demo {
			margin-left: 20px;
		}
	}
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
