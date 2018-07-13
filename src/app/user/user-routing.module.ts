import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import {UserComponent} from './user.component';
import {SettingsComponent} from './settings/settings.component';
import {ProfileComponent} from './profile/profile.component';
import {AuthGuard} from '../shared/guards/auth.guard';

const routes: Routes = [
  {
    path: 'user', redirectTo: 'user/profile', pathMatch: 'full'
  },
  {
    path: 'user', component: UserComponent, canActivate: [AuthGuard], children: [
      {
        path: 'settings', component: SettingsComponent
      },
      {
        path: 'profile', component: ProfileComponent
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
