<template>
	<div>
		<div class="aside-header">
			<img src="/icon.png" alt="" />
			<p>OA管理系统</p>
			<i class="el-icon-s-fold fold"></i>
		</div>
		<el-menu
			default-active="2"
			class="el-menu-vertical-demo"
			@open="handleOpen"
			@close="handleClose"
			background-color="#7aabf6"
			text-color="#fff"
			active-text-color="#ffd04b"
			align="left"
			router
			:collapse="isCollapse"
		>
			<el-menu-item index="/home">
				<i class="el-icon-s-home"></i>
				<span slot="title">首页</span>
			</el-menu-item>
			<el-submenu index="1">
				<template slot="title">
					<i class="el-icon-setting"></i>
					<span>基础配置</span>
				</template>
				<el-menu-item-group>
					<el-menu-item index="/user">用户管理</el-menu-item>
					<el-menu-item index="1-2">角色管理</el-menu-item>
				</el-menu-item-group>
			</el-submenu>
		</el-menu>
	</div>
</template>

<script>
export default {
	name: '',
	components: {},
	data() {
		return {
			isCollapse: false
		}
	},
	methods: {
		handleOpen(key, keyPath) {
			// console.log(key, keyPath)
		},
		handleClose(key, keyPath) {
			// console.log(key, keyPath)
		}
	},
	computed: {},
	created() {},
	mounted() {}
}
</script>
<style scoped lang="scss">
.aside-header {
	position: relative;
	display: flex;
	align-items: center;
	padding: 20px;
	img {
		width: 36px;
		height: 36px;
	}
	p {
		font-size: 20px;
		margin-left: 10px;
		color: #fff;
	}
	i {
		position: absolute;
		top: -285px;
		right: -150px;
		z-index: 90;
		font-size: 28px;
		color: #bbb;
	}
}
.el-menu-item.is-active {
	color: #fff !important;
	background-color: #ffd04b !important;
}

.el-menu-item,
.el-submenu__title {
	i {
		color: #fff;
	}
}
::v-deep .el-submenu__icon-arrow {
	color: #fff;
}
</style>