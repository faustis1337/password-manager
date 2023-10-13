import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppConfigService {
  private baseUrl = 'http://localhost:4201';

  getBaseUrl() {
    return this.baseUrl;
  }
}
