<template>
	<nav class="navbar navbar-default navbar-fixed-top">
		<div class="container">
			<div class="navbar-header">

					<!-- Collapsed Hamburger -->
				<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#app-navbar-collapse">
					<span class="sr-only">Toggle Navigation</span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>

				<!-- Branding Image -->
				<a class="navbar-brand" href="/">
					Learn Programming Club
				</a>
			</div>

			<div class="collapse navbar-collapse" id="app-navbar-collapse">
				<!-- Left Side Of Navbar -->
				<ul class="nav navbar-nav">
						<li v-if="!loggedIn"><router-link :to="{ name: 'intro' }">Get Invite</router-link></li>
						<li v-if="loggedIn && user.isAdmin"><router-link :to="{ name: 'admin' }">Admin Panel</router-link></li>
						<li v-if="loggedIn"><router-link :to="{ name: 'my-blog' }">My Blog</router-link></li>
				</ul>

				<!-- Right Side Of Navbar -->
				<ul v-if="!loggedIn" class="nav navbar-nav navbar-right">
					<!-- Authentication Links -->
					<li><router-link :to="{ name: 'login' }">Login</router-link></li>
					<li><router-link :to="{ name: 'register' }">Register</router-link></li>
				</ul>

				<ul v-if="loggedIn" class="nav navbar-nav navbar-right">
					<!-- Authenticated Links -->
					<li class="dropdown">
						<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
							{{ user.firstName }}
							<span class="caret"></span>
						</a>
						<ul class="dropdown-menu">
							<li><router-link :to="{ name: 'profile' }">My Profile</router-link></li>
							<li role="separator" class="divider"></li>
							<li><a href="#" @click="logout">Logout</a></li>
						</ul>
					</li>
				</ul>
			</div>
		</div>
	</nav>
</template>

<script>
import storage from '../utils/Storage'

export default {
	data: function () {
		return {
			loggedIn: false,
			user: null
		}
	},
	created() {
		// Check if api_token is available
		const token = storage.getItem('api_token')
		const user = storage.getItem('user')

		if (token !== null && user !== null) {
			try {
				this.user = JSON.parse(user)
				this.loggedIn = true
			} catch (ex) {
				// Don't do anything
			}
		}
	},
	methods: {
		logout() {
			storage.removeItem('api_token')
			this.$router.push({ name: 'login' })
		}
	}
}
</script>
