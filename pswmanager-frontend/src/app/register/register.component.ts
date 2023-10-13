import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HashingService } from '../services/hashing.service';
import { EncryptionService } from '../services/encryption.service';
import { AuthService } from '../services/auth.service';
import {MatSnackBar} from "@angular/material/snack-bar";
import {NotificationService} from "../services/notification.service";
import { Router } from '@angular/router';
import {VaultService} from "../services/vault.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor(
    private hashingService: HashingService,
    private encryptionService: EncryptionService,
    private authService: AuthService,
    private notificationService: NotificationService,
    private router:Router,
    private vaultService:VaultService
  ) {}

  formData = {
    email: '',
    password: '',
  };

  async onRegister() {
    const vaultKey = this.hashingService.getVaultKey(this.formData.password, this.formData.email);
    const authKey = this.hashingService.getAuthkey(this.formData.password, vaultKey);

    var encryptedVaultAsBase64String = await this.vaultService.encryptedEmptyVaultAsBase64String(vaultKey);

    this.authService.registerUser(this.formData.email, authKey,encryptedVaultAsBase64String).subscribe(
      (response) => {
        this.router.navigate(['/login']);
        this.notificationService.showSuccess('Registration Success');
      },
      (error) => {
        this.notificationService.showError('Registration Failed');
      }
    );
  }
}
