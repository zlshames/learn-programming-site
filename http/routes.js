'use stict'

const MainController = require('./controllers/MainController')
const UserController = require('./controllers/UserController')
const AuthController = require('./controllers/AuthController')
const InviteeController = require('./controllers/InviteeController')

module.exports = (router) => {

	// Invitee routes
	router
		.post('/api/v1/invitee', InviteeController.createInvitee)
		.get('/api/v1/invitee/:id', InviteeController.showInvitee)
		.delete('/api/v1/invitee/:id', InviteeController.deleteInvitee)

	// User routes
	router
		.post('/api/v1/user', UserController.createUser)
		.get('/api/v1/user', UserController.showSelf)
		.get('/api/v1/user/:id', UserController.showUser)
		.delete('/api/v1/user/:id', UserController.deleteUser)

	// Auth routes
	router
		.post('/auth/signin', AuthController.signin)


	// Front-end route
	router.get('*', MainController.index)
}
