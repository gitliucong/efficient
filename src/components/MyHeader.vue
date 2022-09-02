/* eslint-disable no-undef */
<template>
	<div>
		<div class="header-box">
			<div></div>
			<div class="header-right">
				<el-badge :value="12" class="item">
					<i class="el-icon-s-flag"></i>
				</el-badge>
				<el-badge :value="10" class="item" type="warning">
					<i class="el-icon-message-solid"></i>
				</el-badge>
				<el-badge :value="12" class="item" type="primary">
					<i class="el-icon-document"></i>
				</el-badge>
				<i class="el-icon-rank" @click="fullScreen"></i>
				<div class="demo-type">
					<div>
						<el-avatar icon="el-icon-user-solid"></el-avatar>
					</div>
				</div>
				<el-col :span="12">
					<el-dropdown>
						<span class="el-dropdown-link"> 超级管理员 </span>
						<el-dropdown-menu slot="dropdown">
							<ul class="dropdown">
								<li @click="xiugai">修改密码</li>
								<li>退出登录</li>
								<li>个人中心</li>
								<li>选择目录</li>
							</ul>
						</el-dropdown-menu>
					</el-dropdown>
				</el-col>
			</div>
		</div>
		<PassDialog v-if="dialogFormVisible" ref="dialogForm"></PassDialog>
	</div>
</template>

<script>
import PassDialog from '../views/login/PassDialog'
export default {
	name: 'MyHeader',
	components: {
		PassDialog
	},
	data() {
		return {
			isfullScreen: true,
			dialogFormVisible: false
		}
	},
	methods: {
		xiugai() {
			this.dialogFormVisible = true
			this.$nextTick(() => {
				this.$refs.dialogForm.xiugai()
			})
		},
		/* 全屏放大 */
		fullScreen() {
			if (this.isfullScreen) {
				var docElm = document.documentElement
				if (docElm.requestFullscreen) {
					docElm.requestFullscreen()
				} else if (docElm.mozRequestFullScreen) {
					docElm.mozRequestFullScreen()
				} else if (docElm.webkitRequestFullScreen) {
					docElm.webkitRequestFullScreen()
					// eslint-disable-next-line no-undef
				} else if (elem.msRequestFullscreen) {
					// eslint-disable-next-line no-undef
					elem.msRequestFullscreen()
				}
				this.isfullScreen = false
			} else {
				if (document.exitFullscreen) {
					document.exitFullscreen()
				} else if (document.mozCancelFullScreen) {
					document.mozCancelFullScreen()
				} else if (document.webkitCancelFullScreen) {
					document.webkitCancelFullScreen()
				} else if (document.msExitFullscreen) {
					document.msExitFullscreen()
				}
				this.isfullScreen = true
			}
		}
	},
	computed: {},
	created() {},
	mounted() {}
}
</script>
<style scoped lang="scss">
.header-box {
	height: 60px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 20px;
	border-bottom: 1px solid #ccc;
	.header-right {
		display: flex;
		align-items: center;
		.demo-type {
			margin: 0 20px;
		}
		i {
			margin: 0 15px;
			font-size: 22px;
			color: #9a9a9a;
		}
	}
	.fold {
		font-size: 36px;
		color: #9a9a9a;
	}
}
.dropdown {
	li {
		padding: 10px;
	}
}
::v-deep .el-badge__content.is-fixed {
	position: absolute;
	top: -3px;
	right: 20px;
	transform: translateY(-50%) translateX(100%);
}
::v-deep .el-badge__content {
	border-radius: 5px;
	color: #fff;
	display: inline-block;
	font-size: 12px;
	height: 24px;
	line-height: 24px;
	padding: 0 6px;
	text-align: center;
	white-space: nowrap;
	border: 1px solid #fff;
}
</style>
