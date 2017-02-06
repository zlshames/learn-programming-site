'use strict'

class Validator {
	static hasInjection(str) {
		// Check for drop table
		if (str.toLowerCase().indexOf('drop table') > -1) {
			return true
		}

		// Check for --
		if (str.toLowerCase().indexOf('--') > -1) {
			return true
		}

		// Check for ending sql statement
		if (str.toLowerCase().indexOf(';') > -1) {
			return true
		}

		// Check for single quote
		if (str.toLowerCase().indexOf("'") > -1) {
			return true
		}

		return false
	}

	static checkSkill(skill) {
		const fields = [
			'beginner',
			'intermediate',
			'advanced'
		]

		if (skill == null) {
			return false
		}

		return fields.includes(skill)
	}

	static checkField(field) {
		const fields = [
			'front-end',
			'back-end',
			'full-stack',
			'mobile',
			'other'
		]

		if (field == null) {
			return false
		}

		return fields.includes(field)
	}

	static checkPosition(position) {
		const fields = [
			'student',
			'employed',
			'contractor',
			'freelancer',
			'other'
		]

		if (position == null) {
			return false
		}

		return fields.includes(position)
	}
}

export default Validator
