
exports.up = function(knex, Promise) {
	return knex.schema.createTable('age_groups', (table) => {
		table.increments()
		table.string('group')
	})
	.then(() => {
		return knex.schema.createTable('invitees', (table) => {
			table.increments()
			table.string('name')
			table.string('email')
			table.string('position')
			table.string('skill_level')
			table.string('field')
			table.integer('age_group').unsigned()
			table.foreign('age_group').references('id').inTable('age_groups')
			table.timestamps()
		})
	})
}

exports.down = function(knex, Promise) {
	return Promise.all([
		knex.schema.dropTableIfExists('invitees'),
		knex.schema.dropTableIfExists('age_groups')
	])
}
