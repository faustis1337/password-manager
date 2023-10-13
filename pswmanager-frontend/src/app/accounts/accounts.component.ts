import {Component, OnInit} from '@angular/core';
import {Account} from '../model/Account';
import {VaultService} from "../services/vault.service";
import {TokenService} from "../services/token.service";
import {EncryptionService} from "../services/encryption.service";
import {from} from "rxjs";
import {NotificationService} from "../services/notification.service";

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit{
  newAccount = {
    url: '',
    username: '',
    password: '',
  };

  constructor(private vaultService:VaultService,private tokenService:TokenService,private encryptionService:EncryptionService,private notificationService:NotificationService) {
  }

  vault = this.vaultService.getEmptyVault();


  getAccounts(){
    return this.vault.vault.accounts;
  }

  ngOnInit(): void {
    this.vaultService.getVault(this.tokenService.getUserId()).subscribe(
      (response:any) => {
        var bufferArray = this.encryptionService.Base64StringToArrayBuffer(response.vault);
        var vaultKey = localStorage.getItem("vaultKey");
        if(vaultKey) {
          const observable = from(this.encryptionService.decrypt(bufferArray, vaultKey));

          observable.subscribe(
            (result: string) => {
              console.log(result);
              var s = this.stringToJsonObject(result);
              console.log(s);
              console.log("AFTER CONVERTED TO JSON OBJECT");
              this.vault = this.stringToJsonObject(result);
            },
            (error: any) => {
              console.error(error);
            }
          );

        }
      },
      (error) => {
console.log(error);
      });

    console.log(this.vault);
  }


  async addAccount() {
    const account = new Account(this.newAccount.url,this.newAccount.username,this.newAccount.password);
    this.vault.vault.accounts.push(account);


    var vaultKey = localStorage.getItem("vaultKey");
    if(vaultKey){
      var encryptedVault = await this.vaultService.encryptedVaultAsBase64String(this.vault,vaultKey);
      this.vaultService.saveVault(this.tokenService.getUserId(),encryptedVault).subscribe();
    }
  }

  async removeAccount(account: any) {

    const accounts = this.vault.vault.accounts;
    for (let i = 0; i < accounts.length; i++) {
      if (accounts[i].id === account.id) {
        accounts.splice(i, 1);
        break;
      }
    }
    this.vault.vault.accounts = accounts;

    var vaultKey = localStorage.getItem("vaultKey");
    if(vaultKey){
      var encryptedVault = await this.vaultService.encryptedVaultAsBase64String(this.vault,vaultKey);
      this.vaultService.saveVault(this.tokenService.getUserId(),encryptedVault).subscribe();
    }
  }

  copyToClipboard(text: string) {
    // Create a temporary input element to copy the text
    const input = document.createElement('input');
    input.style.position = 'fixed';
    input.style.opacity = '0';
    input.value = text;

    // Append the input element to the DOM
    document.body.appendChild(input);

    // Select and copy the text
    input.select();
    document.execCommand('copy');

    // Remove the temporary input element
    document.body.removeChild(input);

    this.notificationService.showSuccess('Copied to clipboard');
  }

  stringToJsonObject(jsonString:string){
    try {
      return JSON.parse(jsonString);
    } catch (error) {
      console.error('Invalid JSON string:', error);
    }
  }
}
