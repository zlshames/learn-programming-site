'use strict'

import path from 'path'
import superagent from 'superagent'
import isEmail from 'validator/lib/isEmail'
import striptags from 'striptags'

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
		let name = request.body.invitee.name.trim()
		const email = request.body.invitee.email.trim()
		const field = request.body.invitee.field.trim()
		const position = request.body.invitee.position.trim()
		const skill_level = request.body.invitee.skill_level.trim()

		// Strip tags
		name = striptags(name)

		// Validate name
		if (Validator.hasInjection(name)) {
			return response.status(400).json(
				JRes.failure('No injections plz')
			)
		}

		// Check email
		if (!isEmail(email)) {
			return response.status(400).json(
				JRes.failure('Invalid Email')
			)
		}

		// Validate Field
		if (!Validator.checkField(field)) {
			return response.status(400).json(
				JRes.failure('Invalid Field')
			)
		}

		// Validate Position
		if (!Validator.checkPosition(position)) {
			return response.status(400).json(
				JRes.failure('Invalid Position')
			)
		}

		// Validate Skill
		if (!Validator.checkSkill(skill_level)) {
			return response.status(400).json(
				JRes.failure('Invalid Skill Level')
			)
		}

		// Send Invite Request to Slack API
		superagent
			.get(`https://slack.com/api/users.admin.invite?token=${ cfg.slackToken }&email=${ email }`)
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
				try {
					request.knex('invitees').insert({
						name: name,
						email: email,
						position: position,
						skill_level: skill_level,
						field: field,
						created_at: new Date(),
						updated_at: new Date()
					})
					.then(dbRes => {
						console.log(`Saved invitee: ${ email }`)
					})
					.catch(error => {
						console.log(`A database error occured: ${ error }`)
					})
				} catch (ex) {
					console.log(`Unknown DB exception: ${ ex.message }`)
				}

				// Return success
				return response.status(200).json(
					JRes.success('Invite successfully sent')
				)
			})
	}
}

export default MainController
