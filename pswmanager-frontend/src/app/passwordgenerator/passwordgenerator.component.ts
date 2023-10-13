import { Component } from '@angular/core';
import {NotificationService} from "../services/notification.service";

@Component({
  selector: 'app-passwordgenerator',
  templateUrl: './passwordgenerator.component.html',
  styleUrls: ['./passwordgenerator.component.scss'],
})
export class PasswordgeneratorComponent {
  constructor(private notificationService:NotificationService) {
  }

  passwordLength: number = 12;
  generatedPassword: string = '';

  generatePassword() {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < this.passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    this.generatedPassword = password;
  }

  copyPasswordToClipboard() {
    const textarea = document.createElement('textarea');
    textarea.value = this.generatedPassword;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    this.notificationService.showSuccess('Copied to clipboard');
  }
}
