'use stict'

const JRes = require('./utils/JResponse')
const Auth = require('./models/Auth')

module.exports = (app) => {
	app.use(function * (next) {
		this.set('Access-Control-Allow-Origin', '*')
		this.set('Access-Control-Allow-Headers', 'Content-Type,Authorization')
		this.set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
		try {
			this.state.user = yield Auth.getUser(this)

			// Go to next route
			yield next
		} catch (err) {
			this.status = err.status || 500
			console.log(err)
			this.body = JRes.failure(err.message)
		}
	})
}
