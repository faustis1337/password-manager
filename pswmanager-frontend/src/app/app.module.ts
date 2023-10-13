import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { MainComponent } from './main/main.component';
import {HttpClientModule} from "@angular/common/http";
import {MatDialogModule} from "@angular/material/dialog";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AuthGuard} from "./guards/auth.guard";
import {JwtHelperService} from "@auth0/angular-jwt";
import {jwtOptionsProvider} from "./jwt-config/jwt-options";
import { SharedMenuComponent } from './shared-menu/shared-menu.component';
import { AccountsComponent } from './accounts/accounts.component';
import { PasswordgeneratorComponent } from './passwordgenerator/passwordgenerator.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MainComponent,
    SharedMenuComponent,
    AccountsComponent,
    PasswordgeneratorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    MatSnackBarModule,
    BrowserAnimationsModule
  ],
  providers: [AuthGuard,JwtHelperService,jwtOptionsProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
