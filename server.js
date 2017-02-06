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
require('./http/middleware')(app, knex)

// App routes
require('./http/routes')(app)

// Start server
const port = process.env.PORT || 3000
app.listen(port, (err) => {
	console.log(`App listening on http://localhost:${ port }`)
})
