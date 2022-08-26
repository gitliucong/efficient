import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'home',
		component: HomeView,
		reactive: '/login'
	},
	{
		path: '/about',
		name: 'about',
		component: () => import('../views/AboutView.vue')
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
