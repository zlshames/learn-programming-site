'use strict'

// Import models
import Auth from '../models/Auth'

class AuthController {

	/**
	 * Handles the request and response for
	 * sending invites to people
	 * @param request - The request object
	 * @param response - The response object
	 * @return JSON response
	 */
	static * signin(request, response) {
		// Get user data from request
		const email = request.body.email.trim()
		const password = request.body.password

		// TODO: DO SOME VALIDATION HERE

		// Attempt to login user
		const result = yield Auth.login(request.knex, email, password)
		if (!result.success) {
			return response.status(400).json(result)
		}

		// Return success response
		return response.status(200).json(result)
	}
}

export default AuthController
