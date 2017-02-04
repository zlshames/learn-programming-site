'use strict'

class Validator {
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

		console.log(field)
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
