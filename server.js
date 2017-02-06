'use strict'

// Node Imports
import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'

// Config
import dbConfig from './knexfile'

// Start Express Framework & Database Connection
const app = express()
const knex = require('knex')(dbConfig.development)

// Http Config
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'dist')))

// Express Middleware
app.use((error, req, res, next) => {
	try {
		// Bootstrap DB connection to request
		req.knex = knex
		// Go to next route
		if (error instanceof SyntaxError) {
			res.json('Please send only valid JSON')
		} else {
			next()
		}
	} catch (ex) {
		res.json('An error has occured')
	}
})

// // Allow CORS for development
// app.use((req, res, next)  => {
//   res.header("Access-Control-Allow-Origin", "*")
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
//   next()
// })

// App routes
// Pass knex so the controller can use database
require('./http/routes')(app)

// Start server
const port = process.env.PORT || 3000
app.listen(port, (err) => {
	console.log(`App listening on http://localhost:${ port }`)
})
