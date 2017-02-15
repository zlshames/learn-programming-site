
exports.up = function(knex, Promise) {
	return knex.schema.createTable('users', (table) => {
		table.increments()
		table.string('first_name', 25)
		table.string('last_name', 25)
		table.string('email', 80).unique()
		table.string('password', 60)
		table.string('position')
		table.string('skill_level')
		table.string('field')
		table.string('api_token', 60)
		table.timestamp('token_expiration')
		table.integer('is_admin').defaultTo(0)
		table.timestamps()
	})
}

exports.down = function(knex, Promise) {
	return Promise.all([
		knex.schema.dropTableIfExists('users')
	])
}
