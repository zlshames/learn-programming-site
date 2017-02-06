'use strict'

class InviteeRepository {
	static create(knex, invitee) {
		try {
			knex('invitees').insert({
				name: invitee.name.trim(),
				email: invitee.email.trim(),
				position: invitee.position.trim(),
				skill_level: invitee.skill_level.trim(),
				field: invitee.field.trim(),
				created_at: new Date(),
				updated_at: new Date()
			})
			.then(dbRes => {
				console.log(`Saved invitee: ${ invitee.email }`)
			})
			.catch(error => {
				console.log(`A database error occured: ${ error }`)
			})
		} catch (ex) {
			console.log(`Unknown DB exception: ${ ex.message }`)
		}
	}
}

export default InviteeRepository
