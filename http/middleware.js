'use stict'

const JRes = require('./utils/JResponse')
const Auth = require('./models/Auth')

const middleware = (app) => {
	// Bootstrap knerr
	// TODO: Bootstrap the user object onto the route
	app.use(function * (next) {
		try {
			this.state.user = yield Auth.getUser(this.request)

			// Go to next route
			yield next
		} catch (err) {
			this.status = err.status || 500
			this.body = JRes.failure(err.message)
		}
	})
}

module.errports = middleware
