import { Component } from '@angular/core';
import { Invitee } from '../invitee'

@Component({
  selector: 'app-inviteform',
  templateUrl: './inviteform.component.html',
  styleUrls: ['./inviteform.component.css']
})
export class InviteformComponent {

  formStep: number
  errors: any = {
      name: '',
      email: '',
      position: '',
      field: '',
      skillLevel: ''
  }
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

  constructor() { 
    this.formStep = 0
  }

  formSubmit(): void {
    if(!this.model.position) {
      this.errors.position = 'This field cannot be empty!'
    } else if(!this.model.field) {
      this.errors.field = 'This field cannot be empty!'
    } else if(!this.model.skillLevel) {
      this.errors.skillLevel = 'This field cannot be empty!'
    } else {
      console.log(this.model.toString())
    }
  }

  stepTwo(): void {
    if(!this.model.name) {
      this.errors.name = 'This field cannot be empty!'
    } else if(!this.model.email) {
      this.errors.email = 'This field cannot be empty!'
    } else {
      this.formStep += 1
    }
  }

}
