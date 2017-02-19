'use strict'

// Import utilities
const Validator = require('../utils/Validator')
const Api = require('../utils/Api')
const JRes = require('../utils/JResponse')

// Import models
const Invitee = require('../models/Invitee')

class InviteeController {

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
			return this.body = valid
		}

		// TODO: Check if max invited for today

		// Send Invite Request to Slack API
		const slackRes = yield Api.sendSlackInvite(invitee.email.trim())
		if (slackRes.success) {
			status = 200
			yield Invitee.create(this.app.context.db, invitee)
		}

		// Return response
		this.status = status
		this.body = slackRes
	}

  static * showInvitee(next) {
    const user = this.state.user
    if (user == null) {
      return this.body = JRes.failure('You must be logged in to view this')
    }

    if (!user.is_admin) {
      return this.body = JRes.failure('You are unauthorized to view this')
    }

    const id = this.params.id
    this.body = yield Invitee.get(this.app.context.db, id)
  }

  static * deleteInvitee(next) {
		const userId = this.params.id

		// Make sure the user is logged in
		const user = this.state.user
		if (user == null) {
			return this.body = JRes.failure('You must be logged in to do this')
		}

		// If user isn't an admin return unauthorized
		if (!user.is_admin) {
			return this.body = Jres.failure('You are not authorized to do this')
		}

		this.body = yield Invitee.delete(this.app.context.db, userId)
	}
}

module.exports = InviteeController
