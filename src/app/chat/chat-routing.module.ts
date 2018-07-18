import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {ChatComponent} from './chat.component';
import {AuthGuard} from '../shared/guards/auth.guard';
// import {RoomComponent} from './room/room.component';
// import {PrivateComponent} from './private/private.component';
// import {RoleGuard} from '../shared/guards/role.guard';

const routes: Routes = [
  {
    path: 'chat', component: ChatComponent, canActivate: [AuthGuard]
    // , children: [
      // {
      //   path: 'room/:roomName', component: RoomComponent, canActivate: [RoleGuard]
      // },
      // {
      //   path: 'room', component: PrivateComponent, canActivate: [RoleGuard]
      // }
    // ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
