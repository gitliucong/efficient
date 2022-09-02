<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div>
		<el-dialog title="收货地址" :visible.sync="addDialog">
			<el-form ref="form" :model="addForm" label-width="80px" class="demo-ruleForm">
				<el-form-item label="活动区域">
					<el-select v-model="addForm.region" placeholder="请选择活动区域">
						<el-option label="区域一" value="shanghai"></el-option>
						<el-option label="区域二" value="beijing"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="活动时间">
					<el-col :span="11">
						<el-date-picker
							type="date"
							placeholder="选择日期"
							v-model="addForm.date1"
							style="width: 100%"
						></el-date-picker>
					</el-col>
					<el-col :span="1">-</el-col>
					<el-col :span="11">
						<el-time-picker placeholder="选择时间" v-model="addForm.date2" style="width: 100%"></el-time-picker>
					</el-col>
				</el-form-item>

				<el-steps :space="200" :active="1" finish-status="success">
					<el-step title="已完成"></el-step>
					<el-step title="进行中"></el-step>
					<el-step title="步骤 3"></el-step>
				</el-steps>

				<el-form-item class="form-right">
					<el-button type="primary" @click="recall">撤回</el-button>
					<el-button>取消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
export default {
	name: 'StartView',
	components: {},
	data() {
		return {
			addForm: {},
			addDialog: false
		}
	},
	methods: {
		NewPosts() {
			this.addDialog = true
		},
		// 撤回
		recall() {
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
	computed: {},
	created() {},
	mounted() {}
}
</script>
<style scoped lang="scss"></style>
