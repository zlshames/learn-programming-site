'use strict'

const bodyParser = require('koa-bodyparser')
const dbConfig = require('./knexfile')
const knex = require('knex')(dbConfig.development)
const koa = require('koa')
const path = require('path')
const router = require('koa-router')()
const serve = require('koa-static')

const app = koa()

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
