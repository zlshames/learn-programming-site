'use strict'

import path from 'path'
import superagent from 'superagent'

import JRes from '../utils/JResponse'
import cfg from '../utils/config'
import Validator from '../utils/Validator'

class MainController {
	static index(request, response) {
		return response.sendFile(path.join(__dirname, '../../dist/index.html'))
	}

	static showInvitee(request, response) {
		request.knex.select('*').from('invitees')
			.then(data => response.json(data))
	}

	static createInvitee(request, response) {
		const invitee = request.body.invitee

		// Validate Field
		if (!Validator.checkField(invitee.field)) {
			return response.status(400).json(
				JRes.failure('Invalid Field')
			)
		}

		// Validate Position
		if (!Validator.checkPosition(invitee.position)) {
			return response.status(400).json(
				JRes.failure('Invalid Position')
			)
		}

		// Validate Skill
		if (!Validator.checkSkill(invitee.skill_level)) {
			return response.status(400).json(
				JRes.failure('Invalid Skill Level')
			)
		}

		// Send Invite Request to Slack API
		superagent
			.get(`https://slack.com/api/users.admin.invite?token=${ cfg.slackToken }&email=${ invitee.email }`)
			.end((err, res) => {
				// Return error from Slack
				if (err) {
					return response.status(400).json(
						JRes.failure(err.message)
					)
				}

				const slackRes = JSON.parse(res.text)

				// If bad request, return
				if (!slackRes.ok) {
					return response.status(400).json(
						JRes.failure((slackRes.error) ? slackRes.error : 'Unknown error')
					)
				}

				// If success, add user to database
				request.knex('invitees').insert({
					name: invitee.name,
					email: invitee.email,
					position: invitee.position,
					skill_level: invitee.skill_level,
					field: invitee.field,
					created_at: new Date(),
					updated_at: new Date()
				})
				.then(dbRes => {
					console.log(`Saved invitee: ${ invitee.email }`)
				})
				.catch(error => {
					console.log(`A database error occured: ${ error }`)
				})

				// Return success
				return response.status(200).json(
					JRes.success('Invite successfully sent')
				)
			})
	}
}

export default MainController
