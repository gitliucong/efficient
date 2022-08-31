<template>
	<div>
		<div class="divisional-top">
			<div>部门名称 <el-input v-model="name" placeholder="请输入姓名"></el-input></div>
			<el-button icon="el-icon-search"> 查询</el-button>
			<el-button icon="el-icon-refresh-right"> 重置</el-button>
			<el-button class="added" type="primary" icon="el-icon-circle-plus-outline" @click="NewPosts">新增部门</el-button>
		</div>
		<!-- 表格 -->
		<template>
			<el-table :data="tableData" border style="width: 100%" stripe>
				<el-table-column prop="id" label="id"> </el-table-column>
				<el-table-column prop="d_name" label="部门名称"> </el-table-column>
				<el-table-column prop="d_comment" label="备注"> </el-table-column>
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
		<!-- 新增部门对话框 -->
		<DivisDialog v-if="dialogVisible" ref="Visible" @close="close"></DivisDialog>
	</div>
</template>

<script>
import DivisDialog from './DivisDialog'
import { getDepartment } from '../../../../api/api'

export default {
	name: 'DivisionalView',
	components: {
		DivisDialog
	},
	data() {
		return {
			name: '',
			tableData: [],
			currentPage: 1,
			pagesize: 1,
			ruleForm: {},
			rules: {},
			dialogVisible: false
		}
	},
	methods: {
		/* 修改 */
		handleEdit(index, row) {
			// console.log(index, row)
			this.flag = 2
			this.dialogVisible = true
			this.$nextTick(() => {
				this.$refs.Visible.init(row)
			})
		},
		/* 新增 */
		NewPosts() {
			this.flag = 1
			this.dialogVisible = true
			this.$nextTick(() => {
				this.$refs.Visible.NewPosts()
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
		}
	},
	computed: {},
	created() {
		getDepartment().then((res) => {
			console.log(res.data.departmentData)
			this.tableData = res.data.departmentData
		})
	},
	mounted() {}
}
</script>
<style scoped lang="scss">
//第一行
.divisional-top {
	display: flex;
	margin-bottom: 20px;
	.el-input {
		width: 400px;
		margin-right: 10px;
	}
}
</style>
