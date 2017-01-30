import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inviteform',
  templateUrl: './inviteform.component.html',
  styleUrls: ['./inviteform.component.css']
})
export class InviteformComponent implements OnInit {

  name: string = ''
  email: string = ''

  constructor() { }

  ngOnInit() {
  }

  formSubmit(): void {
    console.log(`email: ${this.email}, name: ${this.name}`)
  }

}
