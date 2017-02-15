'use strict'

const bcrypt = require('bcrypt')

class Auth {
	static * login(knex, email, password) {
		let user = yield knex('users')
			.first('email', email.trim())
			.then(row => { return row })
			.catch(error => { return null })

		if (user == null) {
			return JRes.failure('No account associated with the email')
		}

		const match = bcrypt.compareSync(password, user.password)
		if (!match) {
			return JRes.failure('Invalid password')
		}

		return JRes.success('Successfully logged in', { token: user.api_token })
	}

	static * getUser(request) {
		const token = request.get('Auhtorization')
		if (token == undefined || token == null) {
			return null
		}

		let user = yield request.knex('users')
			.first('api_token', token.trim())
			.then(row => { return row })
			.catch(error => { return null })

		// Make sure the api token has not expired
		const expiration = new Date(user.token_expiration)
		const cDate = new Date()
		if (cDate > expiration) {
			return null
		}

		return user
	}
}

export default Auth
