'use strict'

// Import node modules
const path = require('path')

// Import utilities
const Validator = require('../utils/Validator')
const JRes = require('../utils/JResponse')
const Api = require('../utils/Api')

// Import models
const User = require('../models/User')

class UserController {

	/**
	 * Handles the user account creation
	 * @param next - The next state
	 * @return JSON response
	 */
	static * createUser(next) {
		this.status = 400

		// If user is logged in, they can't create another account
		if (this.state.user !== null) {
			this.status = 403
			return this.body = JRes.failure('You already have an account')
		}

		// Get user data from request and get Slack team list
		const userData = this.request.body.user
		const userList = yield Api.getUserList()
		if (!userList.success) {
			this.status = 500
			return this.body = JRes.failure('Failed to fetch Slack team')
		}

		let found = false
		for (let i = 0; i < userList.data.length; i++) {
			if (userList.data[i].profile.email == userData.email) {
				found = true
				break
			}
		}

		// If user now found in Slack team, return
		if (!found) {
			this.status = 403
			return this.body = JRes.failure('You must be in the Slack team to join')
		}

		// TODO: DO SOME VALIDATION HERE

		const result = yield User.create(this.app.context.db, userData)
		if (result.success) {
			this.status = 200
		}

		// Create user
		this.body = result
	}

	/**
	 * Shows the info of the logged in user
	 * @param next - The next state
	 * @return JSON response
	 */
	static * showSelf(next) {
		// If no user found, can't show self
		if (this.state.user == null) {
			this.status = 400
			return this.body = JRes.failure('You must be logged in to view this')
		}

		const user = this.state.user

		// Show self
		this.status = 200
		this.body = JRes.success('Successfully fetched user info', {
			id: user.id,
			firstName: user.first_name,
			lastName: user.last_name,
			email: user.email,
			position: user.position,
			field: user.field,
			skillLevel: user.skill_level
		})
	}

	/**
	 * Shows the info of a user
	 * @param next - The next state
	 * @return JSON response
	 */
	static * showUser(next) {
		this.status = 400
		const userId = this.params.id

		if (userId == 'all') {
			const user = this.state.user
			if (user == null) {
				this.status = 403
				return this.body = JRes.failure('You must be logged in to view this')
			}

			// return if user is not an admin (if all)
			if (!user.is_admin) {
				this.status = 401
				return this.body = JRes.failure('You are unauthorized to view this')
			}
		}

		const result = yield User.get(this.app.context.db, userId)
		if (result.success) {
			this.status = 200
		}

		this.body = result
	}

	static * deleteUser(next) {
		this.status = 400
		const userId = this.params.id

		// Make sure the user is logged in
		const user = this.state.user
		if (user == null) {
			this.status = 403
			return this.body = JRes.failure('You must be logged in to do this')
		}

		// If user isn't an admin and doesn't match ID, return unauthorized
		if (!user.is_admin && user.id !== userId) {
			this.status = 401
			return this.body = Jres.failure('You are not authorized to do this')
		}

		const result = yield User.delete(this.app.context.db, userId)
		if (result.success) {
			this.status = 200
		}

		this.body = result
	}
}

module.exports = UserController
