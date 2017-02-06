'use stict'

import MainController from './controllers/MainController'
import wrap from 'co-express'

const routes = (app) => {
	// API routes
	//app.get('/api/v1/invite', MainController.showInvitee)

	app.post('/api/v1/invite', wrap(MainController.createInvitee))

	// Front-end route
	app.get('*', MainController.index)
}

module.exports = routes
