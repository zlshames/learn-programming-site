'use strict'

import path from 'path'

class MainController {
  static index(req, res) {
    return res.sendFile(path.join(__dirname, '../../dist/index.html'))
  }

  static getInvitees(req, res) {
    req.knex.select('*').from('invitees')
      .then(data => res.json(data))
  }

  static newInvite(req, res) {
    const invitee = req.body
    req.knex('invitees').insert({ 
      name: invitee.name,
      email: invitee.email,
      position: invitee.position,
      skill_level: invitee.skillLevel,
      field: invitee.field
    })
    .then(response => {
      console.log(response)
    })
  }
}

export default MainController