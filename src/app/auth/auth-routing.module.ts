import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RestoreComponent} from './restore/restore.component';
import {RegistrationComponent} from './registration/registration.component';
import {AuthComponent} from './auth.component';
import {LoggedGuard} from '../shared/guards/logged.guard';

const routes: Routes = [
    {
        path: 'auth', redirectTo: 'auth/login', pathMatch: 'full'
    },
    {
        path: 'auth', component: AuthComponent, canActivate: [LoggedGuard], children: [
            {
                path: 'login', component: LoginComponent
            },
            {
                path: 'restore', component: RestoreComponent
            },
            {
                path: 'registration', component: RegistrationComponent
            }
        ]
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule {
}
