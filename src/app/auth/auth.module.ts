import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthRoutingModule} from './auth-routing.module';
import {AuthComponent} from './auth.component';
import {LoginComponent} from './login/login.component';
import {RestoreComponent} from './restore/restore.component';
import {RegistrationComponent} from './registration/registration.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        AuthRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        AuthComponent,
        LoginComponent,
        RestoreComponent,
        RegistrationComponent
    ]
})
export class AuthModule {
}
