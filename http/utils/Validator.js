'use strict'

class Validator {
	static checkSkill(skill) {
		const fields = [
			'Beginner',
			'Intermediate',
			'Advanced'
		]

		if (skill == null) {
			return false
		}

		return fields.includes(skill)
	}

	static checkField(field) {
		const fields = [
			'Front-End',
			'Back-End',
			'Full-Stack',
			'Mobile',
			'Other'
		]

		if (field == null) {
			return false
		}

		return fields.includes(field)
	}

	static checkPosition(position) {
		const fields = [
			'Student',
			'Employed',
			'Contractor',
			'Freelancer',
			'Other'
		]

		if (position == null) {
			return false
		}

		return fields.includes(position)
	}
}

export default Validator
