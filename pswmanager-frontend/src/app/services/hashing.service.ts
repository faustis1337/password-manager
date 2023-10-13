import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class HashingService {
   getVaultKey(password: string, emailSalt: string) {
    const hashed = CryptoJS.PBKDF2(password, emailSalt, {
      keySize: 4,
      iterations: 600000,
      hasher: CryptoJS.algo.SHA256,
    });

    return hashed.toString(CryptoJS.enc.Hex);
  }

  getAuthkey(password: string, vaultKeySalt: string) {
    const hashed = CryptoJS.PBKDF2(password, vaultKeySalt, {
      keySize: 4,
      iterations: 100000,
      hasher: CryptoJS.algo.SHA256,
    });

    return hashed.toString(CryptoJS.enc.Hex);
  }

}
