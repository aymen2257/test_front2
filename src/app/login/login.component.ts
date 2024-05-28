import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import Swal from 'sweetalert2';
import { environment } from '../../environments/environment';

declare var grecaptcha: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  currentUser: any;
  passwordVisible: boolean = false;
  recaptchaKey = environment.recaptchaKey || '';
  recaptchaToken: string | undefined;

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {
    this.loginForm = new FormGroup({
      num: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  ngOnInit(): void {
    const token: string = this.route.snapshot.queryParamMap.get('token')!;
    const error: string = this.route.snapshot.queryParamMap.get('error')!;
    if (token) {
      this.tokenStorage.saveToken(token);
      this.userService.getCurrentUser().subscribe(
        data => {
          this.login(data);
        },
        err => {
          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
        }
      );
    } else if (error) {
      this.errorMessage = error;
      this.isLoginFailed = true;
    } else if (this.tokenStorage.getUser()) {
      this.isLoggedIn = true;
      this.currentUser = this.tokenStorage.getUser();
    }
  }

  onSubmit(): void {
    const recaptchaResponse = grecaptcha.getResponse();
console.log(recaptchaResponse);
    if (!recaptchaResponse) {
      Swal.fire({
        icon: 'warning',
        title: 'Attention',
        text: 'Veuillez compléter le CAPTCHA.',
        confirmButtonColor: '#ffc107'
      });
      return;
    }

    if (this.loginForm.valid) {
      const loginData = {
        num: this.loginForm.value.num,
        password: this.loginForm.value.password,
        recaptchaResponse: recaptchaResponse
      };
      this.authService.login(loginData).subscribe(
        data => {
          this.tokenStorage.saveToken(data.accessToken);
          if (data.authenticated) {
            this.login(data.user);
          } else {
            this.router.navigate(['/totp']);
          }
        },
        err => {
          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
          if (err.status === 403 && err.error.message === "ReCAPTCHA validation failed.") {
            Swal.fire({
              icon: 'error',
              title: 'Erreur de reCAPTCHA',
              text: 'ReCAPTCHA validation failed. Please try again.',
              confirmButtonColor: '#dc3545'
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Erreur de connexion',
              text: 'Numéro adhérent ou mot de passe incorrect.',
              confirmButtonColor: '#dc3545'
            });
          }
        }
      );
    } else {
      this.loginForm.markAllAsTouched();
      Swal.fire({
        icon: 'warning',
        title: 'Attention',
        text: 'Veuillez vérifier les erreurs dans le formulaire.',
        confirmButtonColor: '#ffc107'
      });
    }
  }

  login(user: any): void {
    this.tokenStorage.saveUser(user);
    this.isLoginFailed = false;
    this.isLoggedIn = true;
    this.currentUser = this.tokenStorage.getUser();

    if (this.currentUser.roles.includes("ROLE_ADMIN")) {
      this.router.navigate(['/admin']).then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Connexion réussie',
          text: `Bienvenue Admin ${this.currentUser.displayName}`,
          confirmButtonColor: '#28a745'
        });
      });
    } else {
      this.router.navigate(['/home']).then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Connexion réussie',
          text: `Bienvenue ${this.currentUser.displayName}`,
          confirmButtonColor: '#28a745'
        });
      });
    }
  }
}
