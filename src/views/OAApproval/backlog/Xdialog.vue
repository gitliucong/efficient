<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div>
		<el-dialog title="审批详情" :visible.sync="dialogVisible" align="left">
			<el-steps :space="200" :active="1" finish-status="success">
				<el-step title="已完成"></el-step>
				<el-step title="进行中"></el-step>
				<el-step title="步骤 3"></el-step>
			</el-steps>
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<el-form-item label="申请人" prop="username">
					<el-input v-model="ruleForm.username"></el-input>
				</el-form-item>
				<el-form-item label="审批类型" prop="apply_type">
					<el-select v-model="ruleForm.apply_type" placeholder="请假申请">
						<el-option label="区域一" value="shanghai"></el-option>
						<el-option label="区域二" value="beijing"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="申请时间" required>
					<el-col :span="11">
						<el-form-item prop="date1">
							<el-date-picker
								type="date"
								placeholder="选择日期"
								v-model="ruleForm.start_times"
								style="width: 100%"
							></el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="1">-</el-col>
					<el-col :span="11">
						<el-form-item prop="date2">
							<el-time-picker placeholder="选择时间" v-model="ruleForm.end_times" style="width: 100%"></el-time-picker>
						</el-form-item>
					</el-col>
				</el-form-item>
				<el-form-item label="所属部门" prop="region">
					<el-select v-model="ruleForm.departmnt" placeholder="人事部">
						<el-option label="区域一" value="shanghai"></el-option>
						<el-option label="区域二" value="beijing"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="理由" prop="desc">
					<el-input type="textarea" v-model="ruleForm.desc"></el-input>
				</el-form-item>
				<el-form-item class="form-right">
					<el-button type="primary" @click="submitForm('ruleForm')">通过</el-button>
					<el-button @click="resetForm('ruleForm')">驳回</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
export default {
	name: 'XdialogView',
	components: {},
	data() {
		return {
			dialogVisible: false,
			ruleForm: {},
			rules: {}
		}
	},
	methods: {
		details(row) {
			this.dialogVisible = true
			this.ruleForm = row
		}
	},
	computed: {},
	created() {},
	mounted() {}
}
</script>
<style scoped lang="scss"></style>
