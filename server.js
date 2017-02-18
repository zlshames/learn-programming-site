'use strict'

// Node Imports
const path = require('path')
//const express = require('express')
//const bodyParser = require('body-parser')
const koa = require('koa')
const bodyParser = require('koa-bodyparser')
const serve = require('koa-static')
const router = require('koa-router')()

// Config
const dbConfig = require('./knexfile')

// Start Express Framework & Database Connection
const app = koa()
//const app = express()
const knex = require('knex')(dbConfig.development)

// Bootstrap knex (db)
app.context.db = knex

// Koa Middleware
require('./http/middleware')(app)

// Koa options
app.use(serve('./dist'))
app.use(bodyParser())
app.use(router.routes())
app.use(router.allowedMethods())

require('./http/routes')(router)

// Start server
const port = process.env.PORT || 3000
app.listen(port, (err) => {
	console.log(`App listening on http://localhost:${ port }`)
})
