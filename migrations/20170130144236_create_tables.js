
exports.up = function(knex, Promise) {
	return knex.schema.createTable('invitees', (table) => {
		table.increments()
		table.string('name')
		table.string('email')
		table.string('position')
		table.string('skill_level')
		table.string('field')
		table.timestamps()
	})
}

exports.down = function(knex, Promise) {
	return Promise.all([
		knex.schema.dropTableIfExists('invitees')
	])
}
