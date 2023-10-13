import { Component } from '@angular/core';
import {HashingService} from "../services/hashing.service";
import {AuthService} from "../services/auth.service";
import {NotificationService} from "../services/notification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private hashingService: HashingService, private authService:AuthService,private notificationService:NotificationService,private router:Router){}

  formData = {
    email: '',
    password: '',
  };

  onLogin() {
    const vaultKey = this.hashingService.getVaultKey(this.formData.password, this.formData.email);
    const authKey = this.hashingService.getAuthkey(this.formData.password, vaultKey);


    this.authService.login(this.formData.email, authKey).subscribe(
      (response:any) => {
        this.notificationService.showSuccess('Login Success');
        localStorage.setItem('jwtToken', response.token);
        localStorage.setItem('vaultKey', vaultKey);
        this.router.navigate(['/accounts']);
      },
      (error) => {
        this.notificationService.showError('Login Failed');
      }
    )


  }
}
