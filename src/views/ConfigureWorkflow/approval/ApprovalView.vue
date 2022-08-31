<template>
	<div>
		<div class="approval-top">
			<el-button type="primary" icon="el-icon-plus" @click="NewPosts">添加审批流程</el-button>
		</div>
		<!-- 表格 -->
		<template>
			<el-table :data="tableData" border style="width: 100%" stripe>
				<el-table-column prop="id" label="id"> </el-table-column>
				<el-table-column prop="process_type" label="流程名称"> </el-table-column>
				<el-table-column prop="state" label="状态">
					<template slot-scope="scope">
						<el-tag :type="scope.row.state == '启用' ? 'success' : 'danger'">{{ scope.row.state }}</el-tag>
					</template>
				</el-table-column>
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
		<!-- 审批流程类型 -->
		<AppDialog v-if="dialogVisible" ref="Visible" @close="close"></AppDialog>
	</div>
</template>

<script>
import AppDialog from './AppDialog'
import { getApprovalprocess } from '../../../../api/api'
export default {
	name: 'ApprovalView',
	components: {
		AppDialog
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
		getApprovalprocess().then((res) => {
			console.log(res.data.approvalprocessData)
			this.tableData = res.data.approvalprocessData
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
