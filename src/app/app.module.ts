import {BrowserModule, BrowserTransferStateModule} from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {PlatformService} from './platform.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'universal' }),
    AppRoutingModule,
    HttpClientModule,
    BrowserTransferStateModule
  ],
  providers: [PlatformService],
  bootstrap: [AppComponent]
})
export class AppModule { }
