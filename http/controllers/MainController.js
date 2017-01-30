'use strict'

import path from 'path'

class MainController {
  static index(req, res) {
    return res.sendFile(path.join(__dirname, '../../dist/index.html'))
  }

  static createInvitee(req, res) {
    console.log(req.knex)
    return res.json("hey")
  }
}

module.exports = MainController