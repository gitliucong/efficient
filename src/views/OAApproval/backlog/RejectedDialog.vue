<template>
	<div>
		<el-dialog :visible.sync="dialogFormVisible" width="30%">
			<span slot="footer" class="dialog-footer">
				<el-card class="box-card">
					<p><i class="el-icon-success yes"></i>确认通过该申请</p>
					<el-input type="textarea" :rows="2" placeholder="通过理由" v-model="textarea"> </el-input>
					<el-button @click="dialogVisible = false">取 消</el-button>
					<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
				</el-card>
				<el-card class="box-card">
					<p><i class="el-icon-wind-power"></i>确认驳回该请求</p>
					<el-input type="textarea" :rows="2" placeholder="驳回理由" v-model="textarea"> </el-input>
					<el-button @click="dialogVisible = false">取 消</el-button>
					<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
				</el-card>
			</span>
		</el-dialog>
	</div>
</template>

<script>
export default {
	name: 'RejectedDialog',
	components: {},
	data() {
		return {
			textarea: '',
			dialogFormVisible: false
		}
	},
	methods: {
		handleClose(done) {
			this.$confirm('确认关闭？')
				.then(() => {
					done()
				})
				.catch(() => {})
		},
		rejected() {
			this.dialogFormVisible = true
		}
	},

	computed: {},
	created() {},
	mounted() {}
}
</script>
<style scoped lang="scss">
.box-card {
	width: 520px;
	margin: 50px 0;
	// padding: 0 100px;
	p {
		text-align: left;
		margin: 15px 0;
		.yes {
			color: green;
		}
	}
	.el-button {
		margin-top: 15px;
	}
}
</style>
