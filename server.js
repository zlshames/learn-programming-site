'use strict'

// Node Imports
const path = require('path')
//const express = require('express')
//const bodyParser = require('body-parser')
const koa = require('koa')
const bodyParser = require('koa-bodyparser')
const serve = require("koa-static-folder")
const router = require('koa-router')()

// Config
import dbConfig from './knexfile'

// Start Express Framework & Database Connection
const app = koa()
//const app = express()
const knex = require('knex')(dbConfig.development)

// Http Config
app.use(bodyParser())
app.use(router.routes())
app.use(router.allowedMethods())
app.use(serve("./dist"))

// Bootstrap knex (db)
app.context.db = knex

//app.use(bodyParser.json())
//app.use(bodyParser.urlencoded({ extended: false }))
//app.use(express.static(path.join(__dirname, 'dist')))

// Express Middleware
require('./http/middleware')(app, knex)

// App routes
require('./http/routes')(router)

// Start server
const port = process.env.PORT || 3000
app.listen(port, (err) => {
	console.log(`App listening on http://localhost:${ port }`)
})
