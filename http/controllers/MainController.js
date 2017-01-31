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
    const invitee = req.body.invitee
    req.knex('invitees').insert({ 
      name: invitee.name,
      email: invitee.email,
      position: invitee.position,
      skill_level: invitee.skill_level,
      field: invitee.field
    })
    .then(response => {
      res.status(200).json({ message: 'Invite added successfully!' })
    })
  }
}

export default MainController