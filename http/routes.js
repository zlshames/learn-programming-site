'use stict'

const MainController = require('./controllers/MainController')
const UserController = require('./controllers/UserController')
const AuthController = require('./controllers/AuthController')

module.exports = (router) => {

	// Invite route
	router.post('/api/v1/invite', MainController.createInvitee)

	// User routes
	router
		.post('/api/v1/user', UserController.createUser)
		.get('/api/v1/user', UserController.showSelf)
		.get('/api/v1/user/:id', UserController.showUser)

	// Auth routes
	router
		.post('/auth/signin', AuthController.signin)


	// Front-end route
	router.get('*', MainController.index)
}
