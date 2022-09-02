<template>
	<div>
		<!-- 已办事项 -->
		<div class="done">
			<!-- 头部 -->
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
			</div>
			<!-- 表格 -->
			<div class="table">
				<el-table border :data="tableData" stripe style="width: 100%">
					<el-table-column label="id" type="index"> </el-table-column>
					<el-table-column prop="username" label="申请人"> </el-table-column>
					<el-table-column prop="apply_type" label="审批类型"> </el-table-column>
					<el-table-column prop="times" label="申请时间"> </el-table-column>
					<el-table-column prop="approver" label="当前审批人"> </el-table-column>
					<el-table-column prop="state" label="审批状态"> </el-table-column>
					<el-table-column prop="department" label="所属部门"> </el-table-column>
					<el-table-column align="center" label="操作">
						<template slot-scope="scope">
							<el-button
								size="mini"
								type="warning"
								icon="el-icon-refresh-left"
								@click="handleEdit(scope.$index, scope.row)"
								>详情</el-button
							>
						</template>
					</el-table-column>
				</el-table>
				<!-- 分页 -->
				<div class="paging">
					<el-pagination background layout="prev, pager, next" :total="100"> </el-pagination>
				</div>
				<!-- 对话框 -->
				<Dialog v-if="dialogFormVisible" ref="Visible" @close="close"></Dialog>
			</div>
		</div>
	</div>
</template>

<script>
import Dialog from './Dialog'
import { getReplied } from '../../../../api/api'

export default {
	// eslint-disable-next-line vue/multi-word-component-names
	name: 'FinishedView',
	components: {
		Dialog
	},
	data() {
		return {
			tableData: [],
			value: '',
			name: '', //申请人
			state: '', //状态

			searchVal: '',
			searchStatus: '',
			options: [
				{
					value: '已通过',
					label: '已通过'
				},
				{
					value: '已驳回',
					label: '已驳回'
				},
				{
					value: '审批中',
					label: '审批中'
				},
				{
					value: '已撤销',
					label: '已撤销'
				}
			],
			// 详情参数
			dialogFormVisible: false,
			ruleForm: {
				name: '',
				region: '',
				reason: '' //理由
			},
			rules: {},
			formLabelWidth: '130px', // 选择日期
			value1: '', // 选择时间
			value2: ''
		}
	},
	created() {
		getReplied().then((res) => {
			console.log(res.data.repliedData)
			this.tableData = res.data.repliedData
		})
	},
	mounted() {},
	methods: {
		// 详情
		handleEdit(index, row) {
			console.log(index, row)
			this.dialogFormVisible = true
			this.$nextTick(() => {
				this.$refs.Visible.init(row)
			})
		},
		close() {
			this.dialogFormVisible = false
		}
	}
}
</script>
<style scoped lang="scss">
.demo-ruleForm {
	overflow: hidden;
	.add {
		background-color: #b886f8;
		border: 0;
	}
	.right {
		float: right;
	}
}

// 时间线
.date {
	margin-left: 50px;
	margin-bottom: 20px;
}
.done {
	padding: 25px;
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
	.table {
		margin-top: 20px;
		.edit {
			background-color: #f4c438;
			color: #fff;
		}
		.paging {
			float: right;
			margin-top: 20px;
		}
	}
}
</style>
