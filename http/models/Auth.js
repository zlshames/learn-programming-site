'use strict'

const bcrypt = require('bcrypt')
const random = require('randomstring')

const JRes = require('../utils/JResponse')

class Auth {
	static * login(db, email, password) {
		let user = yield db('users')
			.select()
			.where('email', email)
			.first([
				'id',
				'first_name',
				'last_name',
				'email',
				'position',
				'field',
				'skill_level',
				'password',
				'api_token',
				'token_expiration'
			])
			.then(row => { return row })
			.catch(error => { return null })

		if (user == undefined || user == null) {
			return JRes.failure('No account associated with the email')
		}

		const match = bcrypt.compareSync(password, user.password)
		if (!match) {
			return JRes.failure('Invalid password')
		}

		// If token expired, generate new one
		const expiration = new Date(user.token_expiration)
		const cDate = new Date()
		if (cDate > expiration) {
			user.api_token = random.generate(60)
			cDate.setDate(cDate.getDate() + 31)

			yield db('users')
				.update({
					api_token: user.api_token,
					token_expiration: cDate
				})
				.where('email', email)
				.then(row => { return row })
				.catch(error => { return error })
		}

		return JRes.success('Successfully logged in', {
			token: user.api_token,
			user: {
				id: user.id,
				firstName: user.first_name,
				lastName: user.last_name,
				email: user.email,
				position: user.position,
				field: user.field,
				skillLevel: user.skillLevel
			}
		})
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
