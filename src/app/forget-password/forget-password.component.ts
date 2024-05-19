import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import Swal from 'sweetalert2';  // Import SweetAlert2

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  form!: FormGroup;  // Using FormGroup to manage the form data
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      cin: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(8)])
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.authService.findUserByEmailAndCin(this.form.value).subscribe(
        data => {
          Swal.fire({
            icon: 'success',
            title: 'Succès',
            text: 'L’utilisateur a été trouvé avec succès.',
            confirmButtonColor: '#3085d6'
          });
          console.log("user found with success");
          console.log(data);
          this.isSuccessful = true;
          this.isSignUpFailed = false;
        },
        err => {
          Swal.fire({
            icon: 'error',
            title: 'Échec',
            text: err.error.message || 'Impossible de trouver l’utilisateur.',
            confirmButtonColor: '#d33'
          });
          console.log("user not found");
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
        }
      );
    } else {
      this.form.markAllAsTouched();
      Swal.fire({
        icon: 'error',
        title: 'Formulaire invalide',
        text: 'Veuillez vérifier les erreurs dans le formulaire.',
        confirmButtonColor: '#d33'
      });
    }
  }
}
