import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import Swal from 'sweetalert2';  // Import SweetAlert2

function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null;  // Ignore validation if value is empty
    const hasUpperCase = /[A-Z]/.test(value);
    const hasNumber = /\d/.test(value);
    const minLength = value.length >= 6;
    return !hasUpperCase || !hasNumber || !minLength ? { passwordStrength: 'Password must be at least 6 characters long, include an uppercase letter and a number.' } : null;
  };
}

function alphabeticValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    return value && !/^[a-zA-Z]+$/.test(value) ? { nonAlphabetic: 'Only alphabetic characters are allowed.' } : null;
  };
}

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
    // Initialize the form group with custom validators
    this.registerForm = new FormGroup({
      num: new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      cin: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
      password: new FormControl('', [Validators.required, passwordValidator()]),
      matchingPassword: new FormControl('', [Validators.required, passwordValidator()]),
      using2FA: new FormControl(false)
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe(
        data => {
          console.log("sign up success");
          this.isSuccessful = true;
          this.isSignUpFailed = false;
          if (data.using2FA) {
            this.isUsing2FA = true;
            this.qrCodeImage = data.qrCodeImage;
          }
          Swal.fire({
            icon: 'success',
            title: 'Registered!',
            text: 'Votre inscription a été réalisée avec succès ! Un mail de vérification a été envoyé',
            confirmButtonColor: '#3085d6'
          });
        },
        err => {
          console.log("sign up failed");
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.error.message || 'Une erreur est survenue !',
            confirmButtonColor: '#d33'
          });
        }
      );
    } else {
      this.registerForm.markAllAsTouched();
      Swal.fire({
        icon: 'error',
        title: 'Invalid Form',
        text: 'Informations Incorrects .',
        confirmButtonColor: '#d33'
      });
    }
  }
}
