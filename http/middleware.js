'use stict'

const middleware = (app, knex) => {
	app.use((error, req, res, next) => {
		if (error instanceof SyntaxError) {
			res.json('Please send only valid JSON')
		} else {
			next()
		}
	})

	// Bootstrap knex
	// TODO: Bootstrap the user object onto the route
	app.use((req, res, next) => {
		try {
			// Bootstrap DB connection to request
			req.knex = knex
			// Go to next route
			next()
		} catch (ex) {
			res.json('An error has occured')
		}
	})
}

module.exports = middleware
