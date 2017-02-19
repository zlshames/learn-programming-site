'use strict'

// Import models
const Auth = require('../models/Auth')

class AuthController {

	/**
	 * Handles a request to sign in
	 * @param next - The next state
	 * @return JSON response
	 */
	static * signin(next) {
		this.status = 400

		// Get user data from request
		const email = this.request.body.email.trim()
		const password = this.request.body.password

		// TODO: DO SOME VALIDATION HERE

		// Return success response
		const result = yield Auth.login(this.app.context.db, email, password)
		if (result.success) {
			this.status = 200
		}

		this.body = result
	}
}

module.exports = AuthController
