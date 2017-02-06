'use strict'

import request from 'superagent'
import cfg from './Config'
import JRes from './JResponse'

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
}

export default Api
