'use strict'

// Import node modules
import path from 'path'
import superagent from 'superagent'
import striptags from 'striptags'

// Import utilities
import Validator from '../utils/Validator'
import Api from '../utils/Api'

// Import repositories
import InviteeRepo from '../repositories/InviteeRepository'

class MainController {
	/**
	 * Handles the request and response for the front-end
	 * @param request - The request object
	 * @param response - The response object
	 * @return HTML contents
	 */
	static index(request, response) {
		return response.sendFile(path.join(__dirname, '../../dist/index.html'))
	}

	/**
	 * Handles the request and response for
	 * sending invites to people
	 * @param request - The request object
	 * @param response - The response object
	 * @return JSON response
	 */
	static * createInvitee(request, response) {
		let invitee = request.body.invitee
		let status = 400

		// Validate invitee object
		const valid = Validator.validateInvitee(invitee)
		if (!valid.success) {
			return response.status(status).json(valid)
		}

		// TODO: Check if max invited for today

		// Send Invite Request to Slack API
		const slackRes = yield Api.sendSlackInvite(invitee.email.trim())
		if (slackRes.success) {
			status = 200
			InviteeRepo.create(request.knex, invitee)
		}

		// Return response
		return response.status(status).json(slackRes)
	}
}

export default MainController
