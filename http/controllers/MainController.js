'use strict'

import path from 'path'
import superagent from 'superagent'

import JRes from '../utils/JResponse'
import cfg from '../utils/config'

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

		superagent
			.get(`https://slack.com/api/users.admin.invite?token=${ cfg.slackToken }&email=${ invitee.email }`)
			.end((err, res) => {
				if (err) {
					console.log(err)
					return response.status(400).json(
						JRes.failure(err.message)
					)
				}

				const slackRes = JSON.parse(res.text)

				if (!slackRes.ok) {
					return response.status(400).json(
						JRes.failure((slackRes.error) ? slackRes.error : 'Unknown error')
					)
				}

				request.knex('invitees').insert({
					name: invitee.name,
					email: invitee.email,
					position: invitee.position,
					skill_level: invitee.skill_level,
					field: invitee.field
				})
				.then(dbRes => {
					console.log(`Saves invitee: ${ invitee.email }`)
				})
				.catch(error => {
					console.log(`A database error occured: ${ error }`)
				})

				return response.status(200).json(
					JRes.success('Invite successfully sent')
				)
			})
	}
}

export default MainController
