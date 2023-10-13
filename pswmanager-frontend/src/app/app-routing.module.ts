import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {MainComponent} from "./main/main.component";
import {AuthGuard} from "./guards/auth.guard";
import {AccountsComponent} from "./accounts/accounts.component";
import {PasswordgeneratorComponent} from "./passwordgenerator/passwordgenerator.component";

const routes: Routes = [{ path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'accounts', component:AccountsComponent,canActivate: [AuthGuard]},
  { path: 'passwordgenerator', component:PasswordgeneratorComponent,canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
