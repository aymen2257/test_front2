import { Component } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent {

  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  isUsing2FA = false;
  errorMessage = '';
  qrCodeImage = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.authService.findUserByEmailAndCin(this.form).subscribe(
      data => {
        console.log("user found with success ");
        console.log(data);
	      this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      err => {
        console.log("user not found ");
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
}
