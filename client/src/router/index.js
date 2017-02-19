import Vue from 'vue'
import Router from 'vue-router'

import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'

import Intro from '../components/Intro.vue'
import Invite from '../components/Invite.vue'
import Success from '../components/Success.vue'
import AdminPanel from '../components/AdminPanel.vue'
import Profile from '../components/Profile.vue'

Vue.use(Router)

export default new Router({
	mode: 'history',
	scrollBehavior: () => ({ y: 0 }),
	routes: [
		{
			path: '/',
			component: Home,
			children: [
				{
					path: '',
					component: Intro,
					name: 'intro'
				},
				{
					path: 'invite',
					component: Invite,
					name: 'invite'
				},
				{
					path: 'success',
					component: Success,
					name: 'success'
				},
				{
					path: '/profile',
					name: 'profile',
					component: Home
				},
				{
					path: '/admin-panel',
					name: 'admin-panel',
					component: AdminPanel,
				}
			]
		},
		{
			path: '/register',
			name: 'register',
			component: Register
		},
		{
			path: '/login',
			name: 'login',
			component: Login,
		},
		{
			path: '/my-blog',
			name: 'my-blog',
			component: Register
		}
	]
})
