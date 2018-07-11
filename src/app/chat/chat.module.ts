import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { RoomComponent } from './room/room.component';
import { PrivateComponent } from './private/private.component';
import {ChatComponent} from './chat.component';
import { UserComponent } from './user/user.component';

@NgModule({
  imports: [
    CommonModule,
    ChatRoutingModule
  ],
  declarations: [
    RoomComponent,
    PrivateComponent,
    ChatComponent,
    UserComponent
  ]
})
export class ChatModule { }
