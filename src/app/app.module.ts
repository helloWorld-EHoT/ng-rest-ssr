import {BrowserModule, BrowserTransferStateModule} from '@angular/platform-browser';
import {APP_ID, Inject, NgModule, PLATFORM_ID} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {PlatformService} from './platform.service';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {HomeComponent} from './home/home.component';
import {AuthModule} from './auth/auth.module';
import {ChatModule} from './chat/chat.module';
import {AuthService} from './shared/services/auth.service';
import {AuthGuard} from './shared/guards/auth.guard';
import {RoleGuard} from './shared/guards/role.guard';
import {ApiService} from './shared/services/api.service';
import {RootComponent} from './root/root.component';
import {LoggedGuard} from './shared/guards/logged.guard';
import {SocketService} from './shared/services/socket.service';
import {ChatService} from './shared/services/chat.service';
import {UserModule} from './user/user.module';
import {APP_BASE_HREF, isPlatformBrowser} from '@angular/common';

export function GetBaseUrl() {
        if (isPlatformBrowser(PLATFORM_ID)) {
            return document.getElementsByTagName('base')[0].href;
        } else {
            return 'http://195.110.58.76:3000/';
        }
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    RootComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'universal'}),
    AuthModule,
    ChatModule,
    UserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserTransferStateModule
  ],
  providers: [
    // Services
    PlatformService,
    AuthService,
    ApiService,
    SocketService,
    ChatService,
    // Guards
    AuthGuard,
    LoggedGuard,
    RoleGuard,
      { provide: 'BASE_URL', useFactory: GetBaseUrl },
      {provide: APP_BASE_HREF, useValue : '/' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
