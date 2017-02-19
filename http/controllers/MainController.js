'use strict'

// Import node modules
const path = require('path')
const sendFile = require('koa-sendfile')

class MainController {
	/**
	 * Handles the request and response for the front-end
	 * @param request - The request object
	 * @param response - The response object
	 * @return HTML contents
	 */
	static * index(next) {
		yield sendFile(this, path.join(__dirname, '../../dist/index.html'))
		yield next
	}
}

module.exports = MainController
