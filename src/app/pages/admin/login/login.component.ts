import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginCredentials } from '../../../models/LoginCredentials';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginCredentials: LoginCredentials = {
    email: 'test@gmail.com',
    password: '12345678'
  };

  errors: any = {};

  constructor(private router: Router, private authService: AuthService) { }


  /********** PUBLIC **********/
  public onSubmit() {
    this.resetErrors();
    this.validateForm();

    if (Object.keys(this.errors).length == 0) {
      this.authService.login(this.loginCredentials).subscribe({
        next: (res) => {
          this.storeTokens(res);
          this.router.navigate(['/admin']);
        },
        error: err => console.error(err)
      });
    }
  }


  /********** PRIVATE **********/
  private resetErrors() {
    this.errors = {};
  }

  private validateForm() {
    if (!this.loginCredentials.email) this.errors.email = 'Email is required';
    if (!this.loginCredentials.password) this.errors.password = 'Password is required';
  }

  private storeTokens(res: any) {
    sessionStorage.setItem('accessToken', res.accessToken);
    sessionStorage.setItem('refreshToken', res.refreshToken);
  }
}