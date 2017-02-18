'use strict'

const bcrypt = require('bcrypt')

const JRes = require('../utils/JResponse')

class Auth {
	static * login(db, email, password) {
		let user = yield db('users')
			.select()
			.where('email', email)
			.first(['password', 'api_token'])
			.then(row => { return row })
			.catch(error => { return null })

		if (user == undefined || user == null) {
			return JRes.failure('No account associated with the email')
		}

		const match = bcrypt.compareSync(password, user.password)
		if (!match) {
			return JRes.failure('Invalid password')
		}

		return JRes.success('Successfully logged in', { token: user.api_token })
	}

	static * getUser(ctx) {
		const token = ctx.request.get('Authorization')
		if (token == undefined || token == null) {
			return null
		}

		const user = yield ctx.app.context.db('users')
			.select()
			.where('api_token', token.trim())
			.first()
			.then(row => { return row })
			.catch(error => { return null })

		if (user == undefined || user == null) {
			return null
		}

		// Make sure the api token has not expired
		const expiration = new Date(user.token_expiration)
		const cDate = new Date()
		if (cDate > expiration) {
			return null
		}

		return user
	}
}

module.exports = Auth
