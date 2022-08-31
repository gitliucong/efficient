<template>
	<div>
		<div class="menus-top">
			<div>菜单名称 <el-input v-model="name" placeholder="请输入姓名"></el-input></div>
			<el-button icon="el-icon-search"> 查询</el-button>
			<el-button icon="el-icon-refresh-right"> 重置</el-button>
			<el-button class="added" type="primary" icon="el-icon-circle-plus-outline" @click="NewPosts">新增菜单</el-button>
		</div>
		<!-- 表格 -->
		<template>
			<el-table :data="tableData" border style="width: 100%" stripe>
				<el-table-column prop="m_name" label="菜单名称"> </el-table-column>
				<el-table-column prop="m_route" label="菜单路径"> </el-table-column>
				<el-table-column prop="m_sort" label="排序"> </el-table-column>
				<el-table-column prop="icon" label="菜单图标"> </el-table-column>
				<el-table-column prop="m_typ" label="菜单类型"> </el-table-column>
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
		<!-- 新增菜单对话框 -->
		<MenusDialog v-if="dialogVisible" ref="Visible" @close="close"></MenusDialog>
	</div>
</template>

<script>
import MenusDialog from './MenusDialog'
import { getMenus } from '../../../../api/api'

export default {
	name: 'MenusView',
	components: {
		MenusDialog
	},
	data() {
		return {
			name: '',
			tableData: [],
			currentPage: 1,
			pagesize: 1,
			flag: 1,
			dialogVisible: false,
			radio: 3
			// data: [
			// 	{
			// 		label: '一级 1',
			// 		children: [
			// 			{
			// 				label: '二级 1-1',
			// 				children: [
			// 					{
			// 						label: '三级 1-1-1'
			// 					}
			// 				]
			// 			}
			// 		]
			// 	},
			// 	{
			// 		label: '一级 2',
			// 		children: [
			// 			{
			// 				label: '二级 2-1',
			// 				children: [
			// 					{
			// 						label: '三级 2-1-1'
			// 					}
			// 				]
			// 			},
			// 			{
			// 				label: '二级 2-2',
			// 				children: [
			// 					{
			// 						label: '三级 2-2-1'
			// 					}
			// 				]
			// 			}
			// 		]
			// 	},
			// 	{
			// 		label: '一级 3',
			// 		children: [
			// 			{
			// 				label: '二级 3-1',
			// 				children: [
			// 					{
			// 						label: '三级 3-1-1'
			// 					}
			// 				]
			// 			},
			// 			{
			// 				label: '二级 3-2',
			// 				children: [
			// 					{
			// 						label: '三级 3-2-1'
			// 					}
			// 				]
			// 			}
			// 		]
			// 	}
			// ],
			// defaultProps: {
			// 	children: 'children',
			// 	label: 'label'
			// }
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
		getMenus().then((res) => {
			console.log(res.data.menusData)
			this.tableData = res.data.menusData
		})
	},
	mounted() {}
}
</script>
<style scoped lang="scss">
//第一行
.menus-top {
	display: flex;
	margin-bottom: 20px;
	.el-input {
		width: 400px;
		margin-right: 10px;
	}
}
</style>
