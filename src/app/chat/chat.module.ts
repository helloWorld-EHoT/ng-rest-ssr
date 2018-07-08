import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { RoomComponent } from './room/room.component';
import { PrivateComponent } from './private/private.component';
import {ChatComponent} from './chat.component';

@NgModule({
  imports: [
    CommonModule,
    ChatRoutingModule
  ],
  declarations: [RoomComponent, PrivateComponent, ChatComponent]
})
export class ChatModule { }
