'use strict'

const request = require('superagent')
const cfg = require('./Config')
const JRes = require('./JResponse')

class Api {
	static * sendSlackInvite(email) {
		const res = yield request
			.get(`https://slack.com/api/users.admin.invite?token=${ cfg.slackToken }&email=${ email }`)
			.then(success => {
				const jsonRes = JSON.parse(success.text)

				if (!jsonRes.ok) {
					return JRes.failure((jsonRes.error) ? jsonRes.error : 'Unknown error')
				}

				return JRes.success('Invite Successfully Sent!')
			})
			.catch(error => {
				return JRes.failure('Slack error')
		})

		return res
	}

	static * getUserList() {
		const res = yield request
			.get(`https://slack.com/api/users.list?token=${ cfg.slackToken }`)
			.then(success => {
				const jsonRes = JSON.parse(success.text)

				if (!jsonRes.ok) {
					return JRes.failure((jsonRes.error) ? jsonRes.error : 'Unknown error')
				}

				return JRes.success('Successfully fetched user list', jsonRes.members)
			})
			.catch(error => {
				return JRes.failure('Slack error')
		})

		return res
	}
}

module.exports = Api
