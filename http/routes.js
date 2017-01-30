'use stict'

import MainController from './controllers/MainController'

const routes = (app) => {
  // API routes
  app.get('/api/v1/invitee', MainController.createInvitee)

  // Front-end route
  app.get('*', MainController.index)
}

module.exports = routes