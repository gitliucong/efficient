import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'main',
		component: () => import('../components/MyMain.vue'),
		reactive: '/login',
		children: [
			{
				path: '/home',
				name: 'home',
				component: HomeView
			},
			{
				path: '/about',
				name: 'about',
				component: () => import('../views/AboutView.vue')
			},
			{
				path: '/user',
				name: 'user',
				component: () => import('../views/UserView.vue')
			},
			{
				path: '/role',
				name: 'role',
				component: () => import('../views/RoleView.vue')
			},
			{
				path: '/menus',
				name: 'menus',
				component: () => import('../views/MenusView.vue')
			},
			{
				path: '/rank',
				name: 'rank',
				component: () => import('../views/RanksView.vue')
			},
			{
				path: '/job',
				name: 'job',
				component: () => import('../views/JobsView.vue')
			},
			{
				path: '/divisional',
				name: 'divisional',
				component: () => import('../views/DivisionalView.vue')
			},
			{
				path: '/login-oper',
				name: 'login-oper',
				component: () => import('../views/LoginOperView.vue')
			},
			{
				path: '/oper',
				name: 'oper',
				component: () => import('../views/OperView.vue')
			},
			{
				path: '/approval',
				name: 'approval',
				component: () => import('../views/ApprovalView.vue')
			},
			{
				path: '/approval-types',
				name: 'approval-types',
				component: () => import('../views/ApprovalTypes.vue')
			},
			{
				path: '/material-ment',
				name: 'material-ment',
				component: () => import('../views/MaterialMent.vue')
			}
		]
	},

	{
		path: '/login',
		name: 'login',
		component: () => import('../views/LoginView.vue')
	}
]

const router = new VueRouter({
	routes
})

export default router
