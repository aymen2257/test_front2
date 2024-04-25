import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  isSuccessful = false;
  isSignUpFailed = false;
  isUsing2FA = false;
  errorMessage = '';
  qrCodeImage = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // Initialize the form group
    this.registerForm = new FormGroup({
      num: new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      cin: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      matchingPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
      using2FA: new FormControl(false)
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe(
        data => {
          console.log("sign up success");
          console.log(data);
          this.isSuccessful = true;
          this.isSignUpFailed = false;
          if (data.using2FA) {
            this.isUsing2FA = true;
            this.qrCodeImage = data.qrCodeImage;
            console.log("sign up success with 2fa");
          }
        },
        err => {
          console.log("sign up failed");
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
          if (err.error.message.includes('num adherent non existant')) {
            alert("Num adhérent non existant"); // Show an alert dialog
          }
        }
      );
    } else {
      this.registerForm.markAllAsTouched(); // Ensure all fields are touched to show errors
    }
  }
}
