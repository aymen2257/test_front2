import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';
import { MustMatch } from '../confirmPwd/confirmPwd';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrl: './update-password.component.css'
})
export class UpdatePasswordComponent {

  user:any={};
  password:any;
  form !: FormGroup;
  //form: any = {};
  isSuccessful = false;
  errorMessage = '';
  passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  // Ajoutez une variable pour suivre l'état de visibilité du mot de passe
 passwordVisible: boolean = false;


  constructor(private router: Router, private userService: UserService , private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required] // Ajout de confirmPassword avec Validators.required
    }, {
      validator: MustMatch('password', 'confirmPassword') // Utilisation de MustMatch
    });
  }

   // Méthode pour basculer la visibilité du mot de passe
   togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  onSubmit(): void {
    if (!this.form.valid) {
      alert('Please fill all required fields.');
      return;
    }
    if (this.password) {
      this.userService.changePwd(this.password).subscribe({
        next: response => {
          console.log('Pwd Changed successfully', response);
          alert('Pwd changed successfully');
        },
        error: error => {
          console.error('Failed to change Pwd', error);
          alert('Failed to Change Pwd: ' + error.message);
        }
      });
    }
  }



}
