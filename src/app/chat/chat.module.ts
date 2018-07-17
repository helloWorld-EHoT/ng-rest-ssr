import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { RoomComponent } from './room/room.component';
import { PrivateComponent } from './private/private.component';
import { ChatComponent } from './chat.component';
import { UserComponent } from './user/user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrettyPrintPipe } from '../shared/pipes/pretty-print.pipe';
import { OnlineDirective } from '../shared/directives/online.directive';

@NgModule({
  imports: [
    CommonModule,
    ChatRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    // PickerModule
  ],
  declarations: [
    RoomComponent,
    PrivateComponent,
    ChatComponent,
    UserComponent,
    // PIPES
    PrettyPrintPipe,
    // DIRECTIVES
    OnlineDirective
  ]
})
export class ChatModule {
}
