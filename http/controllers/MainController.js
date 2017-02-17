'use strict'

// Import node modules
const path = require('path')
const sendfile = require('koa-sendfile')

// Import utilities
const Validator = require('../utils/Validator')
const Api = require('../utils/Api')

// Import models
const Invitee = require('../models/Invitee')

class MainController {
	/**
	 * Handles the request and response for the front-end
	 * @param request - The request object
	 * @param response - The response object
	 * @return HTML contents
	 */
	static * index(next) {
		yield sendFile(this, path.join(__dirname, '../../dist/index.html'))
		yield next
	}

	/**
	 * Handles the request and response for
	 * sending invites to people
	 * @param request - The request object
	 * @param response - The response object
	 * @return JSON response
	 */
	static * createInvitee(next) {
		let invitee = this.request.body.invitee
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
			Invitee.create(this.context.db, invitee)
		}

		// Return response
		this.status = status
		this.body = slackRes
	}
}

export default MainController
