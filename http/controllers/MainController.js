'use strict'

import path from 'path'
import superagent from 'superagent'

const slackToken = 'xoxp-23422193668-23575903587-136212730436-f533622e507f0bcf43feda8398b0c1a3'
const slackHost = 'learn-programming'

class MainController {
	static index(request, response) {
		return response.sendFile(path.join(__dirname, '../../dist/index.html'))
	}

	static showInvitee(request, response) {
		req.knex.select('*').from('invitees')
			.then(data => response.json(data))
	}

	static createInvitee(request, response) {
		const invitee = request.body.invitee

		superagent
			.get(`https://slack.com/api/users.admin.invite?token=${ slackToken }&email=${ invitee.email }`)
			.end((err, res) => {
				if (err) {
					console.log(err)
					return response.status(400).json({
						success: false,
						error: err.message
					})
				}

				const slackRes = JSON.parse(res.text)

				if (!slackRes.ok) {
					return response.status(400).json({
						success: false,
						error: (slackRes.error) ? slackRes.error : 'Unknown error'
					})
				}

				request.knex('invitees').insert({
					name: invitee.name,
					email: invitee.email,
					position: invitee.position,
					skill_level: invitee.skill_level,
					field: invitee.field
				})
				.then(dbRes => {
					console.log(dbRes)
				})
				.catch(error => {
					console.log(error)
				})

				return response.status(200).json({
					success: true,
					error: 'Successfully sent invite'
				})
			})
	}
}

export default MainController
