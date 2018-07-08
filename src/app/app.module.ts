import {BrowserModule, BrowserTransferStateModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {PlatformService} from './platform.service';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {HomeComponent} from './home/home.component';
import {AuthModule} from './auth/auth.module';
import { ChatComponent } from './chat/chat.component';
import {ChatModule} from './chat/chat.module';
import {AuthService} from './shared/services/auth.service';
import {AuthGuard} from './shared/guards/auth.guard';
import {RoleGuard} from './shared/guards/role.guard';
import {ApiService} from './shared/services/api.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'universal'}),
    AuthModule,
    ChatModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserTransferStateModule
  ],
  providers: [
    PlatformService,
    AuthService,
    AuthGuard,
    ApiService,
    RoleGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
