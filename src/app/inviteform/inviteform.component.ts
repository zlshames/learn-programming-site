import { Component } from '@angular/core';
import { Router } from '@angular/router'
import * as _ from 'lodash'
import { Invitee } from '../invitee'

@Component({
  selector: 'app-inviteform',
  templateUrl: './inviteform.component.html',
  styleUrls: ['./inviteform.component.css']
})
export class InviteformComponent {

  formStep: number
  errors: any = {}
  model: Invitee = new Invitee('','','','','')
  positions: Array<string> = [
    'Student',
    'Employed',
    'Contracter',
    'Freelancer',
    'Other'
  ]
  fields: Array<string> = [
    'Front-End',
    'Back-End',
    'Full-Stack',
    'Mobile',
    'Other'
  ]
  skillLevels: Array<string> = [
    'Beginner',
    'Intermediate',
    'Advanced'
  ]

  constructor(private router: Router) { 
    this.formStep = 0
  }

  isValid(): Boolean {
    if(!this.model.position) {
      this.errors.position = 'This field cannot be empty!'
    }
    if(!this.model.field) {
      this.errors.field = 'This field cannot be empty!'
    }
    if(!this.model.skillLevel) {
      this.errors.skillLevel = 'This field cannot be empty!'
    }
    if(!this.model.name) {
      this.errors.name = 'This field cannot be empty!'
    }
    if(!this.model.email) {
      this.errors.email = 'This field cannot be empty!'
    }

    return _.isEmpty(this.errors)
  }

  formSubmit(): void {
    if(this.isValid()) {
      console.log(this.model.toString())
      this.router.navigate(['success'])
    }
  }

}
