import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';  // Import SweetAlert2

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit {
  form!: FormGroup;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      num: new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required])
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator: ValidatorFn = (control: AbstractControl): { [key: string]: any } | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { mismatch: true };
    }
    return null;
  };

  onSubmit(): void {
    if (this.form.valid) {
      this.authService.changePassword(this.form.value).subscribe(
        data => {
          Swal.fire('Succès', 'Mot de passe changé avec succès', 'success');
          this.isSuccessful = true;
          this.router.navigate(['/login']);
        },
        err => {
          Swal.fire('Erreur', err.error.message || 'Échec de la modification du mot de passe', 'error');
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
        }
      );
    } else {
      this.form.markAllAsTouched();
      Swal.fire('Attention', 'Veuillez vérifier les erreurs dans le formulaire.', 'warning');
    }
  }
}
