import { Component } from '@angular/core';
import { Router } from '@angular/router'
import * as _ from 'lodash'
import { Invitee } from '../invitee'
import { InviteformService } from '../inviteform.service'

@Component({
  selector: 'app-inviteform',
  templateUrl: './inviteform.component.html',
  styleUrls: ['./inviteform.component.css'],
  providers: [InviteformService]
})
export class InviteformComponent {

  formStep: number
  captchaVerified: boolean
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
  skill_levels: Array<string> = [
    'Beginner',
    'Intermediate',
    'Advanced'
  ]

  constructor(private router: Router, private inviteService: InviteformService) { 
    this.formStep = 0
    this.captchaVerified = false
  }

  isValid(): Boolean {
    if(!this.model.position) {
      this.errors.position = 'This field cannot be empty!'
    }
    if(!this.model.field) {
      this.errors.field = 'This field cannot be empty!'
    }
    if(!this.model.skill_level) {
      this.errors.skill_level = 'This field cannot be empty!'
    }
    if(!this.model.name) {
      this.errors.name = 'This field cannot be empty!'
    }
    if(!this.model.email) {
      this.errors.email = 'This field cannot be empty!'
    }

    return _.isEmpty(this.errors)
  }

  resolved(captchaReponse: string) {
    this.captchaVerified = true
  }

  formSubmit(): void {
    if(this.isValid() && this.captchaVerified) {
      this.inviteService.sendSlackInvite(this.model)
        .subscribe(
          res => this.router.navigate(['success']),
          err => this.router.navigate(['error'])
        )
    }
  }

}
