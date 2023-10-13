import {Injectable} from '@angular/core';
import {EncryptionService} from "./encryption.service";
import {AppConfigService} from "./appconfig.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class VaultService {
  constructor(private http: HttpClient,private encryptionService:EncryptionService,private appConfig:AppConfigService) { }

  private backendURL = this.appConfig.getBaseUrl();

  getEmptyVault(){
    const emptyVault: any = {
      vault: {
        accounts:[]
      }};

    return emptyVault;
  }

  async encryptedEmptyVaultAsBase64String(vaultKey:string){
    const emptyVault = this.getEmptyVault();

    const jsonStr = JSON.stringify(emptyVault);

    const encryptedVault = await this.encryptionService.encrypt(jsonStr,vaultKey);
    return this.encryptionService.arrayBufferToBase64String(encryptedVault);
  }

  async encryptedVaultAsBase64String(vault:any,vaultKey:string){
    const emptyVault = this.getEmptyVault();

    const jsonStr = JSON.stringify(vault);

    const encryptedVault = await this.encryptionService.encrypt(jsonStr,vaultKey);
    return this.encryptionService.arrayBufferToBase64String(encryptedVault);
  }

  getVault(userId:number){
    return this.http.get(`${this.backendURL}/User/${userId}/vault`);
  }
  saveVault(userId:number,vault:string){
    const requestBody = {
      userId: userId,
      vault: vault,
    };
    return this.http.put(`${this.backendURL}/User/vault`,requestBody);
  }
}
