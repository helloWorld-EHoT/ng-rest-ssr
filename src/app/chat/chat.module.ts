import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { RoomComponent } from './room/room.component';
import { PrivateComponent } from './private/private.component';
import {ChatComponent} from './chat.component';
import { UserComponent } from './user/user.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ChatRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    RoomComponent,
    PrivateComponent,
    ChatComponent,
    UserComponent
  ]
})
export class ChatModule { }
