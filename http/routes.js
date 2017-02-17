'use stict'

import MainController from './controllers/MainController'
import wrap from 'co-express'

const routes = (router) => {
	// API routes
	router.post('/api/v1/invite', MainController.createInvitee)

	// Front-end route
	router.get('*', MainController.index)
}

module.exports = routes
