import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppConfigService} from "./appconfig.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private http: HttpClient,private appConfig: AppConfigService) {}

  private backendURL = this.appConfig.getBaseUrl();

  registerUser(email: string, authKey: string, vault:string) {
    const requestBody = {
      email: email,
      authKey: authKey,
      vault:vault
    };

    return this.http.post(`${this.backendURL}/auth/register`, requestBody);
  }

  login(email: string, authKey: string) {
    const requestBody = {
      email: email,
      authKey: authKey,
    };

    return this.http.post(`${this.backendURL}/auth/login`, requestBody);
  }
}
