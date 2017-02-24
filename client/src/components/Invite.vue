<template>
	<div>
		<transition name="fade">
			<alert class="error-alert" v-if="hasErrors" :message="responseError"></alert>
		</transition>

		<div class="box-container">
			<h4 class="center-text"><strong>Get Your Invite!</strong></h4>
			<p class="center-text">Fill out this short form and an invite will be sent to your email!</p>
			<br />

			<form v-on:submit.prevent="submit">
				<div class="form-group" :class="[errors.name !== null ? 'has-error' : '']">
					<label for="name">Your name</label>
					<input type="text" v-model="invitee.name" name="name" placeholder="Name" class="form-control" required/>
					<p class="help-block" v-if="errors.name !== null">{{ errors.name }}</p>
				</div>

				<div class="form-group" :class="[errors.email !== null ? 'has-error' : '']">
					<label for="email">Your email</label>
					<input type="email" v-model="invitee.email" name="name" placeholder="E-Mail" class="form-control" required/>
					<p class="help-block" v-if="errors.email !== null">{{ errors.email }}</p>
				</div>
				<div class="row">
					<div class="form-group col-xs-4" :class="[errors.position !== null ? 'has-error' : '']">
						<label for="position">Your position</label>
						<select v-model="invitee.position" name="position" class="form-control" required>
							<option v-for="position in positions" :value="position">{{ position }}</option>
						</select>
					</div>
					<div class="form-group col-xs-4" :class="[errors.field !== null ? 'has-error' : '']">
						<label for="field">Your field</label>
						<select v-model="invitee.field" name="field" class="form-control" required>
							<option v-for="field in fields" :value="field">{{ field }}</option>
						</select>
					</div>
					<div class="form-group col-xs-4" :class="[errors.skillLevel !== null ? 'has-error' : '']">
						<label for="skillLevel">Your skill level</label>
						<select v-model="invitee.skillLevel" name="skillLevel" class="form-control" required>
							<option v-for="level in skillLevels" :value="level">{{ level }}</option>
						</select>
					</div>
				</div>
				<div class="form-group captcha-center">
					<vue-recaptcha
						ref="recaptcha"
						:sitekey="captchaSite"
						@expired="onExpired"
						@verify="onVerify">
					</vue-recaptcha>
				</div>

				<button type="submit" class="btn btn-primary btn-block btn-captcha" v-if="captchaVerified">Get invite!</button>
			</form>
		</div>
	</div>
</template>

<script>
import request from 'superagent'
import VueRecaptcha from 'vue-recaptcha'
import Alert from './Alert'
import Options from '../utils/Options'
import config from '../utils/Config'

export default {
	components: { VueRecaptcha, Alert },
	data() {
		return {
			// Captcha data
			captchaSite: '6Ld1URQUAAAAAImsatt5W8EAI_D9RuaAG3N9NGje',
			captchaVerified: false,
			// Error data
			responseError: '',
			hasErrors: false,
			errors: {
				name: null,
				email: null,
				position: null,
				field: null,
				skillLevel: null
			},
			// Invitee data
			invitee: {
				name: '',
				email: '',
				position: null,
				field: null,
				skillLevel: null
			},
			// Select Option datat
			positions: Options.positions,
			fields: Options.fields,
			skillLevels: Options.skillLevels
		}
	},
	methods: {
		submit() {
			// Reset errors
			this.hasErrors = false
			this.responseError = ''

			if (this.validation()) {
				this.invitee.position = this.invitee.position.toLowerCase()
				this.invitee.field = this.invitee.field.toLowerCase()
				this.invitee.skillLevel = this.invitee.skillLevel.toLowerCase()

				request
					.post(config.baseUrl + '/api/v1/invitee')
					.send({
						invitee: this.invitee
					})
					.then(success => {
						this.$router.push({ name: 'success' })
					})
					.catch(error => {
						this.hasErrors = true

						if (error.response.body.error) {
							this.responseError = error.response.body.error
						} else {
							this.responseError = 'Unknown Error'
						}
				})
			}
		},
		validation() {
			this.errors.name = null
			this.errors.email = null
			this.errors.position = null
			this.errors.field = null
			this.errors.skillLevel = null

			if (this.invitee.name.trim().length == 0) {
				this.errors.name = 'Please input a name!'
				this.hasErrors = true;
			}

			if (this.invitee.email.trim().length == 0) {
				this.errors.email = 'Please input an email!'
				this.hasErrors = true;
			}

			if (this.invitee.positon == null) {
				this.errors.position = 'Please choose a position!'
				this.hasErrors = true;
			}

			if (this.invitee.field == null) {
				this.errors.field = 'Please choose a field!'
				this.hasErrors = true;
			}

			if (this.invitee.skillLevel == null) {
				this.errors.skillLevel = 'Please choose a skill level!'
				this.hasErrors = true;
			}

			return this.hasErrors
		},
		onVerify() {
			this.captchaVerified = true
		},
		onExpired() {
			this.$refs.recaptcha.reset()
		}
	}
}
</script>

<style scoped>
	.fade-enter-active, .fade-leave-active {
		transition: opacity .5s
	}
	.fade-enter, .fade-leave-to {
		opacity: 0
	}

	.error-alert {
		position: absolute;
		top: 33px;
		right: 20px;
	}

	.box-container {
		border-radius: 5px;
		border: 1px solid rgba(0,0,0,0.8);
		padding: 20px;
		background: white;
		box-shadow: 0 3px 5px rgba(0,0,0,0.2);
		width: 450px;
		margin: 0 auto;
	}

	.form-control {
		border: 0;
		border-bottom: 1px solid rgba(0,0,0,0.2);
		border-radius: 0;
		box-shadow: none;
	}

	.center-text {
		text-align: center;
	}

	.captcha-center {
		display: flex;
		justify-content: center;
		margin-bottom: 0 !important;
		margin-top: 5px;
	}

	select.form-control {
		border-radius: 0;
	}

	.form-control:focus {
		border-bottom: 1px solid rgba(0,0,0,0.6);
	}

	.btn-captcha {
		margin-top: 20px;
	}
</style>
