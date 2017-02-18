'use stict'

const JRes = require('./utils/JResponse')
const Auth = require('./models/Auth')

module.exports = (app) => {
	app.use(function * (next) {
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
