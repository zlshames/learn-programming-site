import { Routes } from '@angular/router'

import { HomeComponent } from './home/home.component'
import { InviteformComponent } from './inviteform/inviteform.component'
import { SuccessComponent } from './success/success.component'

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'invite', component: InviteformComponent },
  { path: 'success', component: SuccessComponent }
]