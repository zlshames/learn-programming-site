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
		// If user is logged in, they can't create another account
		if (this.state.user !== null) {
			return this.body = JRes.failure('You already have an account')
		}

		// Get user data from request and get Slack team list
		const userData = this.request.body.user
		const userList = yield Api.getUserList()
		if (!userList.success) {
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
			return this.body = JRes.failure('You must be in the Slack team to join')
		}

		// TODO: DO SOME VALIDATION HERE

		// Create user
		this.body = yield User.create(this.app.context.db, userData)
	}

	/**
	 * Shows the info of the logged in user
	 * @param next - The next state
	 * @return JSON response
	 */
	static * showSelf(next) {
		// If no user found, can't show self
		if (this.state.user == null) {
			return this.body = JRes.failure('You must be logged in to view this')
		}

		const user = this.state.user

		// Show self
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
		const userId = this.params.id
		this.body = yield User.get(this.app.context.db, userId)
	}
}

module.exports = UserController
