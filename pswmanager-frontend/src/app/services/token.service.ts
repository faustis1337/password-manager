import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  getToken(){
    return localStorage.getItem('jwtToken');
  }

  getUserId(){
    var token = this.getToken();

    if (token) {
      const tokenData = this.parseJwt(token);

      if (tokenData && tokenData.UserId) {
        return tokenData.UserId;
      }
    }
  }

  private parseJwt(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace('-', '+').replace('_', '/');
      return JSON.parse(atob(base64));
    } catch (e) {
      return null;
    }
  }
}
