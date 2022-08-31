<template>
	<div>
		<div class="ranks-top">
			<div>职级名称 <el-input v-model="name" placeholder="请输入姓名"></el-input></div>
			<el-button icon="el-icon-search"> 查询</el-button>
			<el-button icon="el-icon-refresh-right"> 重置</el-button>
			<el-button class="added" type="primary" icon="el-icon-circle-plus-outline" @click="NewPosts">新增职级</el-button>
		</div>
		<!-- 表格 -->
		<template>
			<el-table :data="tableData" border style="width: 100%" stripe>
				<el-table-column prop="id" label="id"> </el-table-column>
				<el-table-column prop="r_name" label="职级名称"> </el-table-column>
				<el-table-column prop="r_comment" label="备注"> </el-table-column>
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
		<!-- 新增职级对话框 -->
		<RanksDialog v-if="dialogVisible" ref="Visible" @close="close"></RanksDialog>
	</div>
</template>

<script>
import RanksDialog from './RanksDialog'
import { getRanks } from '../../../../api/api'

export default {
	name: 'RanksView',
	components: {
		RanksDialog
	},
	data() {
		return {
			name: '',
			tableData: [],
			currentPage: 1,
			pagesize: 1,
			dialogVisible: false,
			flag: 1
		}
	},
	methods: {
		/* 修改 */
		handleEdit(index, row) {
			// console.log(index, row)
			this.flag = 1
			this.dialogVisible = true
			this.$nextTick(() => {
				this.$refs.Visible.init(row)
			})
		},
		/* 新增 */
		NewPosts() {
			this.flag = 2
			this.dialogVisible = true
			this.$nextTick(() => {
				this.$refs.Visible.NewPosts()
			})
		},
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
		getRanks().then((res) => {
			console.log(res.data.ranksData)
			this.tableData = res.data.ranksData
		})
	},
	mounted() {}
}
</script>
<style scoped lang="scss">
//第一行
.ranks-top {
	display: flex;
	margin-bottom: 20px;
	.el-input {
		width: 400px;
		margin-right: 10px;
	}
}
</style>
