'use strict'

// Import node modules
import path from 'path'

// Import utilities
import Validator from '../utils/Validator'
import JRes from '../utils/JResponse'

// Import models
import User from '../models/User'
import Auth from '../models/Auth'

class UserController {

	/**
	 * Handles the request and response for
	 * sending invites to people
	 * @param request - The request object
	 * @param response - The response object
	 * @return JSON response
	 */
	static * createUser(request, response) {
		// If user is logged in, they can't create another account
		const user = yield Auth.getUser(request)
		if (user !== null) {
			return response.status(403).json(JRes.failure('You already have an account'))
		}

		// Get user data from request
		const userData = request.body.user

		// TODO: DO SOME VALIDATION HERE

		// Create user
		const result = yield User.create(request.knex, userData)
		if (!result) {
			return response.status(400).json(JRes.failure('Failed to create user'))
		}

		// Return success response
		return response.status(200).json(JRes.success('Successfully created user'))
	}
}

export default UserController
