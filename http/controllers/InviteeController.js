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
		this.status = 400
		let invitee = this.request.body.invitee

		// Validate invitee object
		const valid = Validator.validateInvitee(invitee)
		if (!valid.success) {
			return this.body = valid
		}

		// TODO: Check if max invited for today

		// Send Invite Request to Slack API
		const slackRes = yield Api.sendSlackInvite(invitee.email.trim())
		if (slackRes.success) {
			this.status = 200
			yield Invitee.create(this.app.context.db, invitee)
		}

		// Return response
		this.body = slackRes
	}

	static * showInvitee(next) {
		this.status = 400

		// Make sure user is logged in
		const user = this.state.user
		if (user == null) {
			this.status = 403
			return this.body = JRes.failure('You must be logged in to view this')
		}

		// Make sure user is an admin
		if (!user.is_admin) {
			this.status = 401
			return this.body = JRes.failure('You are unauthorized to view this')
		}

		const id = this.params.id
		let output = null

		if (id == 'all') {
			const result = yield Invitee.findAll(this.app.context.db)
			if (result.success) {
				let arr = []

				// Sanitize data
				for (let i = 0; i < result.data.length; i++) {
					arr.push({
						id: result.data[i].id,
						name: result.data[i].name,
						email: result.data[i].email,
						position: result.data[i].position,
						field: result.data[i].field,
						skillLevel: result.data[i].skill_level,
						createdAt: result.data[i].created_at
					})
				}

				output = JRes.success(result.message, arr)
			} else {
				output = result
			}
		} else {
			const result = yield Invitee.findById(this.app.context.db, id)
			if (result.success) {
				// Sanitize data
				output = JRes.success(result.message, {
					id: result.data.id,
					name: result.data.name,
					email: result.data.email,
					position: result.data.position,
					field: result.data.field,
					skillLevel: result.data.skill_level,
					createdAt: result.data.created_at
				})
			} else {
				output = result
			}
		}

		if (output.success) {
			this.status = 200
		}

		this.body = output
	}

	static * deleteInvitee(next) {
		this.status = 400
		const userId = this.params.id

		// Make sure the user is logged in
		const user = this.state.user
		if (user == null) {
			this.status = 403
			return this.body = JRes.failure('You must be logged in to do this')
		}

		// If user isn't an admin return unauthorized
		if (!user.is_admin) {
			this.status = 401
			return this.body = Jres.failure('You are not authorized to do this')
		}

		const result = yield Invitee.delete(this.app.context.db, userId)
		if (result.success) {
			this.status = 200
		}

		this.body = result
	}
}

module.exports = InviteeController
