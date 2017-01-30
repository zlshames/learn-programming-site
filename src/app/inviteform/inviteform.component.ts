import { Component } from '@angular/core';
import { Invitee } from '../invitee'

@Component({
  selector: 'app-inviteform',
  templateUrl: './inviteform.component.html',
  styleUrls: ['./inviteform.component.css']
})
export class InviteformComponent {

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

  formStep: number

  constructor() { 
    this.formStep = 0
  }

  formSubmit(): void {
    this.model.toString()
  }

  nextStep(): void {
    this.formStep += 1
  }

  prevStep(): void {
    this.formStep -= 1
  }

}
