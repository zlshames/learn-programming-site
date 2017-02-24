<template>
	<div>
		<navigation></navigation>

		<div class="page-container">
			<div v-if="error.length > 0" class="alert alert-danger">
				<strong>Error!</strong> {{ error }}
			</div>

			<user-profile
				v-if="error.length == 0"
				:info="userInfo">
			</user-profile>
		</div>

		<footer-template></footer-template>
	</div>
</template>

<script>
import FooterTemplate from '../components/Footer.vue'
import Navigation from '../components/Navigation.vue'
import UserProfile from '../components/UserProfile.vue'

import request from 'superagent'
import config from '../utils/Config'
import storage from '../utils/Storage'

export default {
	components: {
		Navigation,
		UserProfile,
		FooterTemplate
	},
	data() {
		return {
			userInfo: {
				id: '',
				firstName: '',
				lastName: '',
				email: '',
				position: '',
				field: '',
				skillLevel: '',
				createdAt: ''
			},
			error: ''
		}
	},
	created() {
		let postUrl = ''

		if (this.$route.name == 'profile') {
			postUrl = '/' + this.$route.params.id
		}

		request
			.get(config.baseUrl + '/api/v1/user' + postUrl)
			.set('Authorization', storage.getItem('api_token'))
			.then((success) => {
				if (success.body.success) {
					this.userInfo = success.body.data
				} else {
					this.error = success.body.error
				}
			})
			.catch((error) => {
				if (error.response.body.error) {
					this.error = error.response.body.error
				} else {
					this.error = error.response
				}
		})
	}
}
</script>

<style scoped>
	.alert {
		width: 450px;
		margin: 0 auto;
		margin-bottom: 10px;
	}
</style>
