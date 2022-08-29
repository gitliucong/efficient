import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [{
		path: '/',
		name: 'main',
		component: () => import("../components/MyMain.vue"),
		reactive: '/login',
		children: [{
				path: '/home',
				name: 'home',
				component: HomeView
			},
			{
				path: '/about',
				name: 'about',
				component: () => import('../views/AboutView.vue')
			}, {
				path: '/user',
				name: 'user',
				component: () => import('../views/UserView.vue')
			},
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
