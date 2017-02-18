import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import Intro from '../components/Intro.vue'
import Invite from '../components/Invite.vue'
import Success from '../components/Success.vue'

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
				}
			]
		}
	]
})
