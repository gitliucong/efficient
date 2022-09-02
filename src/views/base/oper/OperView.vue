<template>
	<div>
		<div class="loginoper-top">
			<div>
				<span class="loginoper-name">操作人</span> <el-input v-model="name" placeholder="请输入姓名"></el-input>
			</div>
			<el-date-picker
				v-model="value2"
				type="datetimerange"
				:picker-options="pickerOptions"
				range-separator="至"
				start-placeholder="开始日期"
				end-placeholder="结束日期"
				align="right"
			>
			</el-date-picker>
		</div>
		<div class="loginoper-btn">
			<el-button icon="el-icon-search"> 查询</el-button>
			<el-button icon="el-icon-refresh-right"> 重置</el-button>
		</div>
		<!-- 表格 -->
		<template>
			<el-table :data="tableData" border style="width: 100%" stripe>
				<el-table-column prop="id" label="id" width="55"> </el-table-column>
				<el-table-column prop="username" label="操作人"> </el-table-column>
				<el-table-column prop="router" label="操作路径"> </el-table-column>
				<el-table-column prop="operation" label="操作动作"> </el-table-column>
				<el-table-column prop="times" label="操作时间"> </el-table-column>
			</el-table>
		</template>
		<!-- 分页 -->
		<div class="loginoper-bottom">
			<p>时间戳: {{ time }}</p>
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
		</div>
	</div>
</template>

<script>
import { getLogs } from '../../../../api/api'

export default {
	name: 'OperView',
	components: {},
	data() {
		return {
			name: '',
			tableData: [],
			currentPage: 1,
			pagesize: 1,

			time: '',
			value2: '',
			pickerOptions: {
				shortcuts: [
					{
						text: '最近一周',
						onClick(picker) {
							const end = new Date()
							const start = new Date()
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
							picker.$emit('pick', [start, end])
						}
					},
					{
						text: '最近一个月',
						onClick(picker) {
							const end = new Date()
							const start = new Date()
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
							picker.$emit('pick', [start, end])
						}
					},
					{
						text: '最近三个月',
						onClick(picker) {
							const end = new Date()
							const start = new Date()
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
							picker.$emit('pick', [start, end])
						}
					}
				]
			}
		}
	},
	methods: {
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
		getLogs().then((res) => {
			console.log(res.data.logsData)
			this.tableData = res.data.logsData
		})
		setInterval(() => {
			this.time = new Date().toLocaleString()
		}, 1000)
	},
	mounted() {}
}
</script>
<style scoped lang="scss">
//第一行
.loginoper-top,
.loginoper-btn {
	display: flex;
	margin-bottom: 20px;
	.el-input {
		width: 400px;
		margin-right: 10px;
	}
}
.loginoper-bottom {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin: 20px 0;
}
.loginoper-name {
	font-size: 14px;
	color: #606266;
}
</style>
