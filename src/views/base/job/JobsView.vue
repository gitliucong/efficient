<template>
	<div>
		<div class="jobs-top">
			<div>岗位名称 <el-input v-model="name" placeholder="请输入姓名"></el-input></div>
			<el-button icon="el-icon-search"> 查询</el-button>
			<el-button icon="el-icon-refresh-right"> 重置</el-button>
			<el-button class="added" type="primary" icon="el-icon-circle-plus-outline" @click="NewPosts">新增岗位</el-button>
		</div>
		<!-- 表格 -->
		<template>
			<el-table :data="tableData" border style="width: 100%" stripe>
				<el-table-column prop="id" label="id"> </el-table-column>
				<el-table-column prop="j_name" label="岗位名称"> </el-table-column>
				<el-table-column prop="j_comment" label="备注"> </el-table-column>
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
			:total="0"
			align="right"
		>
		</el-pagination>
		<!-- 新增岗位对话框 -->
		<JobsDialog v-if="dialogFormVisible" ref="dialogForm" @close="close"></JobsDialog>
	</div>
</template>

<script>
import JobsDialog from './JobsDialog'
import { getJobs } from '../../../../api/api'

export default {
	name: 'JobsView',
	components: {
		JobsDialog
	},
	data() {
		return {
			name: '',
			tableData: [],
			currentPage: 1,
			pagesize: 1,
			dialogFormVisible: false
		}
	},
	methods: {
		/* 修改 */
		handleEdit(index, row) {
			// console.log(index, row)
			// this.dialogForm.init
			this.dialogFormVisible = true
			this.$nextTick(() => {
				this.$refs.dialogForm.init(row)
			})
		},
		NewPosts() {
			this.dialogFormVisible = true
			this.$nextTick(() => {
				console.log(this.$refs.dialogForm)
				this.$refs.dialogForm.NewPosts()
			})
		},
		/* 关闭弹窗 */
		close() {
			this.dialogFormVisible = false
		},
		handleDelete(index, row) {
			console.log(index, row)
		},
		handleSizeChange(val) {
			// console.log(`每页 ${val} 条`)
			this.pagesize = val
		},
		handleCurrentChange(val) {
			// console.log(`当前页: ${val}`)
			this.currentPage = val
		}
	},
	computed: {},
	created() {
		getJobs().then((res) => {
			console.log(res.data.jobsData)
			this.tableData = res.data.jobsData
		})
	},
	mounted() {}
}
</script>
<style scoped lang="scss">
//第一行
.jobs-top {
	display: flex;
	margin-bottom: 20px;
	.el-input {
		width: 400px;
		margin-right: 10px;
	}
}
</style>
