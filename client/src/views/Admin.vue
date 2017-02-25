<template>
	<div>
		<navigation></navigation>

		<div class="page-container">
			<div v-if="error.length > 0" class="alert alert-danger">
				<strong>Error!</strong> {{ error }}
			</div>
			<div v-if="success.length > 0" class="alert alert-success">
				<strong>Success!</strong> {{ success }}
			</div>

			<div class="box-container">
				<h2>Users</h2>
				<br />
				<user-table
					:users="users.all"
					:deleteUser="deleteUser"
					:perPage="users.itemsPerPage">
				</user-table>
				<hr />
				<h2>User Statistics</h2>
				<br />
				<user-statistics :users="users.all"></user-statistics>
			</div>

			<div class="box-container">
				<h2>Invitees</h2>
				<br />
				<invitee-table
					:invitees="invitees.all"
					:deleteInvitee="deleteInvitee"
					:perPage="invitees.itemsPerPage">
				</invitee-table>
				<hr />
				<h2>Invitee Statistics</h2>
				<br />
				<invitee-statistics :invitees="invitees.all"></invitee-statistics>
			</div>
		</div>

		<footer-template></footer-template>
	</div>
</template>

<script>
import FooterTemplate from '../components/Footer.vue'
import Navigation from '../components/Navigation.vue'
import InviteeTable from '../components/admin/InviteeTable.vue'
import UserTable from '../components/admin/UserTable.vue'
import UserStatistics from '../components/admin/UserStatistics.vue'
import InviteeStatistics from '../components/admin/InviteeStatistics.vue'

import request from 'superagent'
import storage from '../utils/Storage'
import config from '../utils/Config'

export default {
	components: {
		Navigation,
		InviteeTable,
		InviteeStatistics,
		UserTable,
		UserStatistics,
		FooterTemplate
	},
	data() {
		return {
			invitees: {
				all: [],
				itemsPerPage: 5
			},
			users: {
				all: [],
				itemsPerPage: 5
			},
			error: '',
			success: ''
		}
	},
	created() {
		// Get users
		request
			.get(config.baseUrl + '/api/v1/user/all')
			.set('Authorization', storage.getItem('api_token'))
			.then((success) => {
				if (success.body.success) {
					this.users.all = success.body.data
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

		// Get invitees
		request
			.get(config.baseUrl + '/api/v1/invitee/all')
			.set('Authorization', storage.getItem('api_token'))
			.then((success) => {
				if (success.body.success) {
					this.invitees.all = success.body.data
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
	},
	methods: {
		deleteUser(id) {
			// TODO: IMPLEMENT THIS
		},
		deleteInvitee(id) {
			request
				.del(config.baseUrl + '/api/v1/invitee/' + id)
				.set('Authorization', storage.getItem('api_token'))
				.then((success) => {
					if (success.body.success) {
						this.success = success.body.message

						for (let i = 0; i < this.invitees.all.length; i++) {
							if (this.invitees.all[i].id == id) {
								this.invitees.all.splice(i, 1)
							}
						}
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
}
</script>

<style scoped>
	.alert {
		width: 90%;
		margin: 0 auto;
		margin-bottom: 10px;
	}

	h2, p {
		text-align: center;
	}

	.box-container {
		border-radius: 5px;
		border: 1px solid rgba(0,0,0,0.8);
		padding: 20px;
		background: white;
		box-shadow: 0 3px 5px rgba(0,0,0,0.2);
		width: 90%;
		margin: 0 auto;
		margin-bottom: 10px;
	}
</style>
