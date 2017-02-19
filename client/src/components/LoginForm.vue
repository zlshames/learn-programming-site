<template>
	<div class="container">
		<div class="panel panel-default">
			<div class="panel-heading">Login</div>
			<div class="panel-body">
				<div v-if="errors.main !== null" class="alert alert-danger">
					<strong>Error!</strong> {{ errors.main }}
				</div>

				<form class="form-horizontal" novalidate v-on:submit.prevent="submitForm">
					<div v-bind:class="['form-group', (errors.email !== null) ? 'has-error' : '']">
						<label for="email" class="col-md-4 control-label">Email</label>

						<div class="col-md-6">
							<input id="email" type="email" class="form-control" v-model="email" required>

							<span v-if="errors.email !== null" class="help-block">
								<strong>{{ errors.email }}</strong>
							 </span>
						</div>
					</div>

					<div v-bind:class="['form-group', (errors.password !== null) ? 'has-error' : '']">
						<label for="password" class="col-md-4 control-label">Password</label>

						<div class="col-md-6">
							<input id="password" type="password" class="form-control" v-model="password" required>

							<span v-if="errors.password !== null" class="help-block">
								<strong>{{ errors.password }}</strong>
							</span>
						</div>
					</div>

					<div class="form-group">
						<div class="col-md-6 col-md-offset-4">
							<button type="submit" class="btn btn-primary">
								Login
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
	import request from 'superagent'
	import storage from '../utils/Storage'

	export default {
		data: function () {
			return {
				errors: {
					main: null,
					email: null,
					password: null
				},
				email: '',
				password: ''
			}
		},
		mounted() {
			let user

			try {
				user = JSON.parse(storage.getItem('user'))
				this.email = user.email
			} catch (ex) {
				// Do nothing
			}
		},
		methods: {
			submitForm() {
				let hasError = false;

				// Clear errors
				this.errors.main = null
				this.errors.email = null
				this.errors.password = null

				// Validation
				if (this.email == '' || this.email.length < 6 || this.email.indexOf('@') < 0) {
					this.errors.email = 'Please enter a valid email'
					hasError = true
				}

				if (this.password == '' || this.password.length < 6) {
					this.errors.password = 'Password must be at least 6 characters.'
					hasError = true
				}

				// Check hasError so all errors are shown
				if (hasError) {
					return;
				}

				// Send HTTP request
				request
					.post('/auth/signin')
					.send({
						email: this.email,
						password: this.password
					})
					.then((success) => {
						// save user info
						storage.setItem('api_token', success.body.data.token)
						storage.setItem('user', JSON.stringify(success.body.data.user))

						this.$router.push({ name: 'profile' })
					})
					.catch((error) => {
						this.handleErrors(error)
				})
			},
			handleErrors(error) {
				// Handle status errors
				if (!error.response.body.success) {
					if (error.status == 403) {
						this.errors.main = 'You are forbidden to do this.'
					}
				}

				// Handle form errors
				if (error.response.body.error) {
					this.errors.main = error.response.body.error
				} else {
					this.errors.main = 'An unknown error occured.'
				}
			}
		}
	}
</script>

<style scoped>
	.flex-row {
		display: flex;
		justify-content: space-between;
		flex-direction: row;
		flex-wrap: wrap;
	}

	.flex-row > .form-group {
		padding: 5px;
		width: 215px;
	}

	.panel-default {
		max-width: 600px;
		margin: 0 auto;
	}

	.panel-heading {
		text-align: center;
		font-size: 20px;
		font-weight: bold;
	}
</style>
