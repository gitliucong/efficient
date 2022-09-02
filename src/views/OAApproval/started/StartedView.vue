/* eslint-disable no-dupe-keys */
<template>
	<div>
		<div class="top">
			<p>
				<span>审批类型</span>
				<el-select v-model="value" placeholder="请选择">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
				</el-select>
			</p>
			<p>
				<span>申请人</span>
				<el-input v-model="searchVal" placeholder="请输入账号"></el-input>
			</p>
			<p>
				<span>审批状态</span>
				<el-input v-model="searchStatus" placeholder="请输入状态"></el-input>
			</p>
		</div>

		<div class="btn-box">
			<el-button icon="el-icon-search">查询</el-button>
			<el-button icon="el-icon-refresh-right">重置</el-button>
			<el-button type="info" @click="NewPosts">新增申请</el-button>
		</div>

		<el-table
			:data="tableData"
			style="width: 100%"
			max-height="250"
			border
			:header-cell-style="{ 'text-align': 'center' }"
			:cell-style="{ 'text-align': 'center' }"
			stripe
		>
			<el-table-column label="id" type="index"> </el-table-column>
			<el-table-column prop="username" label="申请人"> </el-table-column>
			<el-table-column prop="apply_type" label="审批类型"> </el-table-column>
			<el-table-column prop="times" label="申请时间"> </el-table-column>
			<el-table-column prop="approver" label="当前审批人"> </el-table-column>
			<el-table-column prop="state_name" label="审批状态"> </el-table-column>
			<el-table-column prop="department" label="所属部门"> </el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button size="mini" type="warning" icon="el-icon-chat-dot-round" @click="details(scope.row)"
						>详情</el-button
					>
					<el-button size="mini" type="danger" icon="el-icon-refresh-right" @click="recalls">撤回</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!-- 分页 -->
		<div class="page-box">
			<el-pagination background layout="prev, pager, next" :total="100"> </el-pagination>
		</div>
		<!-- 审批详情弹出框 -->
		<DetailsDialog v-if="dialogFormVisible" ref="Visible" @close="close"></DetailsDialog>
		<!-- 新增申请弹出框 -->
		<Dialog v-if="addDialog" ref="dialog"></Dialog>
	</div>
</template>

<script>
import Dialog from './Dialog'
import DetailsDialog from './detailsDialog'
import { getMapplys } from '../../../../api/api'

export default {
	components: {
		Dialog,
		DetailsDialog
	},
	data() {
		return {
			options: [
				{
					value: '选项1',
					label: '黄金糕'
				}
			],
			value: '',
			searchVal: '',
			searchStatus: '',
			// 表格数据
			tableData: [],
			dialogFormVisible: false,
			// 选择日期
			value1: '',
			// 选择时间
			value2: '',
			// 新增申请弹框状态
			addDialog: false
		}
	},
	methods: {
		// 新增申请
		NewPosts() {
			this.addDialog = true
			this.$nextTick(() => {
				this.$refs.dialog.NewPosts()
			})
		},
		/* 修改 */
		details(row) {
			this.dialogFormVisible = true
			this.$nextTick(() => {
				this.$refs.Visible.init(row)
			})
		},
		close() {
			this.dialogFormVisible = false
		},
		// 撤回
		recalls() {
			this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(() => {
					this.$message({
						type: 'success',
						message: '删除成功!'
					})
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					})
				})
		}
	},
	// eslint-disable-next-line no-dupe-keys
	created() {
		getMapplys().then((res) => {
			console.log(res.data.mapplysData)
			this.tableData = res.data.mapplysData
		})
	}
}
</script>
<style scoped lang="scss">
.demo-ruleForm {
	overflow: hidden;
	.form-right {
		float: right;
		.el-button:nth-child(1) {
			background-color: #b886f8;
			color: #fff;
		}
	}
}
.appStep {
	width: 100%;
	display: flex;
}
.el-dialog {
	.el-input {
		width: 50%;
	}
}
.el-steps {
	margin-left: 20%;
}
.top {
	width: 100%;
	display: flex;
	p {
		display: flex;
		align-items: center;
		text-align: center;
		span {
			display: inline-block;
			width: 120px;
		}
	}
}
.btn-box {
	margin: 20px;
	text-align: left;
}
.page-box {
	width: 100%;
	.el-pagination {
		float: right;
	}
}
.el-table {
	margin: 20px 0;
}
</style>
