<template>
	<div>
		<div class="approval-top">
			<el-button type="primary" icon="el-icon-plus" @click="NewPosts">添加审批类型</el-button>
		</div>
		<!-- 表格 -->
		<template>
			<el-table :data="tableData" border style="width: 100%" stripe>
				<el-table-column prop="id" label="id"> </el-table-column>
				<el-table-column prop="type_name" label="流程名称"> </el-table-column>
				<el-table-column prop="last_modifier" label="最后修改人"> </el-table-column>
				<el-table-column prop="last_times" label="最后修改时间"> </el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button size="mini" icon="el-icon-edit" type="info" @click="handleEdit(scope.$index, scope.row)"
							>编辑</el-button
						>
						<el-button size="mini" icon="el-icon-delete" type="danger" @click="handleDelete(scope.$index, scope.row)"
							>删除</el-button
						>
					</template>
				</el-table-column>
			</el-table>
		</template>
		<!-- 分页 -->
		<el-pagination background layout="prev, pager, next" :total="90" align="right"> </el-pagination>
		<!-- 添加流程对话框 -->
		<TypeDialog v-if="dialogVisible" ref="Visible" @close="close"></TypeDialog>
	</div>
</template>

<script>
import TypeDialog from './TypeDialog'
import { getFlowpathtype } from '../../../../api/api'
export default {
	name: 'ApprovalTypes',
	components: {
		TypeDialog
	},
	data() {
		return {
			tableData: [],
			dialogVisible: false,
			flag: 1
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
		handleDelete(index, row) {
			console.log(index, row)
		}
	},
	computed: {},
	created() {
		getFlowpathtype().then((res) => {
			console.log(res.data.flowpathtypeData)
			this.tableData = res.data.flowpathtypeData
		})
	},
	mounted() {}
}
</script>
<style scoped lang="scss">
.approval-top {
	text-align: left;
	margin: 20px 0;
}
.el-pagination {
	margin-top: 20px;
}
.el-select {
	width: 430px;
}
</style>
