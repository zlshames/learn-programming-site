<template>
	<div class="container">
		<div class="panel panel-default">
			<div class="panel-heading">Register</div>
			<div class="panel-body">
				<div v-if="errors.main !== null" class="alert alert-danger">
					<strong>Error!</strong> {{ errors.main }}
				</div>

				<form class="form-horizontal" novalidate v-on:submit.prevent="submitForm">
					<div v-bind:class="['form-group', (errors.firstName !== null) ? 'has-error' : '']">
						<label for="firstName" class="col-md-4 control-label">First Name</label>

						<div class="col-md-6">
							<input id="firstName" type="text" class="form-control" v-model="user.firstName" required autofocus>

							<span v-if="errors.firstName !== null" class="help-block">
								<strong>{{ errors.firstName }}</strong>
							 </span>
						</div>
					</div>

					<div v-bind:class="['form-group', (errors.lastName !== null) ? 'has-error' : '']">
						<label for="lastName" class="col-md-4 control-label">Last Name</label>

						<div class="col-md-6">
							<input id="lastName" type="text" class="form-control" v-model="user.lastName" required autofocus>

							<span v-if="errors.lastName !== null" class="help-block">
								<strong>{{ errors.lastName }}</strong>
							 </span>
						</div>
					</div>

					<div v-bind:class="['form-group', (errors.email !== null) ? 'has-error' : '']">
						<label for="email" class="col-md-4 control-label">Email</label>

						<div class="col-md-6">
							<input id="email" type="email" class="form-control" v-model="user.email" required>

							<span v-if="errors.email !== null" class="help-block">
								<strong>{{ errors.email }}</strong>
							 </span>
						</div>
					</div>

					<div v-bind:class="['form-group', (errors.password !== null) ? 'has-error' : '']">
						<label for="password" class="col-md-4 control-label">Password</label>

						<div class="col-md-6">
							<input id="password" type="password" class="form-control" v-model="user.password" required>

							<span v-if="errors.password !== null" class="help-block">
								<strong>{{ errors.password }}</strong>
							</span>
						</div>
					</div>

					<div v-bind:class="['form-group', (errors.confirmation !== null) ? 'has-error' : '']">
						<label for="password-confirm" class="col-md-4 control-label">Confirm Password</label>

						<div class="col-md-6">
							<input id="password-confirm" type="password" class="form-control" v-model="user.confirmation" required>

							<span v-if="errors.confirmation !== null" class="help-block">
								<strong>{{ errors.confirmation }}</strong>
							 </span>
						</div>
					</div>

					<div class="flex-row">
						<div v-bind:class="['form-group', (errors.field !== null) ? 'has-error' : '']">
							<label for="field" class="col-md-4 control-label">Field</label>
							<div class="col-md-6">
								<v-select
									:options="fields"
									:show-labels="false"
									v-model="user.field"
									placeholder="Select a Field">
								</v-select>

								<span v-if="errors.field !== null" class="help-block">
									<strong>{{ errors.field }}</strong>
								</span>
							</div>
						</div>

						<div v-bind:class="['form-group', (errors.position !== null) ? 'has-error' : '']">
							<label for="position" class="col-md-4 control-label">Position</label>
							<div class="col-md-6">
								<v-select
									:options="positions"
									:show-labels="false"
									v-model="user.position"
									placeholder="Select a Position">
								</v-select>

								<span v-if="errors.position !== null" class="help-block">
									<strong>{{ errors.position }}</strong>
								</span>
							</div>
						</div>

						<div v-bind:class="['form-group', (errors.skillLevel !== null) ? 'has-error' : '']">
							<label for="skillLevel" class="col-md-4 control-label">Skill Level</label>
							<div class="col-md-6">
								<v-select
									:options="skillLevels"
									:show-labels="false"
									v-model="user.skillLevel"
									placeholder="Select a Skill Level">
								</v-select>

								<span v-if="errors.skillLevel !== null" class="help-block">
									<strong>{{ errors.skillLevel }}</strong>
								</span>
							</div>
						</div>
					</div>

					<div class="form-group">
						<div class="col-md-6 col-md-offset-4">
							<button type="submit" class="btn btn-primary">
								Register
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
	import vSelect from 'vue-multiselect'
	import Options from '../utils/Options'

	export default {
		components: {
			vSelect
		},
		data: function () {
			return {
				errors: {
					main: null,
					firstName: null,
					lastName: null,
					email: null,
					password: null,
					confirmation: null,
					position: null,
					field: null,
					skillLevel: null,
				},
				user: {
					firstName: '',
					lastName: '',
					email: '',
					password: '',
					confirmation: '',
					position: null,
					field: null,
					skillLevel: null
				},
				positions: Options.positions,
				fields: Options.fields,
				skillLevels: Options.skillLevels
			}
		},
		mounted() {
			console.log('Register component mounted.')
		},
		methods: {
			submitForm() {
				let hasError = false;

				// Clear errors
				this.errors.main = null
				this.errors.firstName = null
				this.errors.lastName = null
				this.errors.email = null
				this.errors.password = null
				this.errors.confirmation = null
				this.errors.position = null
				this.errors.field = null
				this.errors.skillLevel = null

				// Validation
				if (this.email == '' || this.email.length < 6 || this.email.indexOf('@') < 0) {
					this.errors.email = 'Please enter a valid email'
					hasError = true
				}

				if (this.username == '' || this.username.length < 3) {
					this.errors.username = 'Username must be at least 3 characters.'
					hasError = true
				}

				if (this.password == '' || this.password.length < 6) {
					this.errors.password = 'Password must be at least 6 characters.'
					hasError = true
				}

				if (this.confirmation !== this.password) {
					this.errors.confirmation = 'Confirmation does not match password.'
					hasError = true
				}

				// Check hasError so all errors are shown
				if (hasError) {
					return;
				}

				// Send HTTP request
				request
					.post('/auth/signup')
					.send({
						username: this.username,
						email: this.email,
						password: this.password,
						password_confirmation: this.confirmation
					})
					.then((success) => {
						location.href = '/login'
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
				if (error.response.body.errors) {
					const errors = error.response.body.errors

					this.errors.username = (errors.username) ? errors.username[0] : null
					this.errors.email = (errors.email) ? errors.email[0] : null
					this.errors.password = (errors.password) ? errors.password[0] : null
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
