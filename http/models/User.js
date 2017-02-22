'use strict'

const bcrypt = require('bcrypt')
const random = require('randomstring')

const JRes = require('../utils/JResponse')

class User {

	static * create(db, user) {
		const saltRounds = 12
		const token = random.generate(60)
		let eDate = new Date()

		// Get expiration date (add 31 days)
		eDate.setDate(eDate.getDate() + 31)

		const result = yield db('users')
			.insert({
				first_name: user.firstName.trim(),
				last_name: user.lastName.trim(),
				email: user.email.trim(),
				password: bcrypt.hashSync(user.password, saltRounds),
				position: user.position.trim(),
				skill_level: user.skillLevel.trim(),
				field: user.field.trim(),
				api_token: token,
				token_expiration: eDate,
				created_at: new Date(),
				updated_at: new Date()
		})
		.then(dbRes => {
			return JRes.success('Successfully created user')
		})
		.catch(error => {
			return JRes.failure(`Failed to create user: ${ error.code }`)
		})

		return result
	}

	static * findAll(db) {
		let result = yield db('users')
			.select()
			.then(dbRes => {
				return JRes.success('Successfully fetched all users', dbRes)
			})
			.catch(error => {
				return JRes.failure(`Failed to fetch all users: ${ error.code }`)
		})

		return result
	}

	static * findById(db, id) {
		let result = yield db('users')
			.select()
			.where('id', id)
			.first()
			.then(dbRes => {
				if (dbRes == undefined || dbRes == null) {
					return JRes.failure('Could not find user by ID')
				} else {
					return JRes.success('Successfully fetched user', dbRes)
				}
			})
			.catch(error => {
				return JRes.failure(`Failed to fetch user: ${ error.code }`)
		})

		return result
	}

	static * update(db, user) {
		let data = {}

		if (user.firstName) {
			data.first_name = user.firstName
		}

		if (user.lastName) {
			data.last_name = user.lastName
		}

		if (user.email) {
			data.email = user.email
		}

		if (user.position) {
			data.position = user.position
		}

		if (user.field) {
			data.field = user.field
		}

		if (user.skill_level) {
			data.skill_level = user.skill_level
		}

		let result = yield db('users').insert(data)
		.then(dbRes => {
			return true
		})
		.catch(error => {
			return false
		})

		return result
	}

	static * delete(db, id) {
		let result = yield db('users')
			.where('id', id)
			.del()
			.then(dbRes => {
				return JRes.success('Successfully deleted user')
			})
			.catch(error => {
				return JRes.failure('Failed to delete user')
			})

		return result
	}
}

module.exports = User
