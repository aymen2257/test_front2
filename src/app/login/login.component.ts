import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { AppConstants } from '../common/app.constants';
import Swal from 'sweetalert2';  // Import SweetAlert2
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

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        data => {
          this.tokenStorage.saveToken(data.accessToken);
          if (data.authenticated) {
            console.log("Connexion réussie");
            
            this.login(data.user);
          } else {
            console.log("Connexion réussie, étape 2");
            this.router.navigate(['/totp']);
          }
        },
        err => {
          console.log("Un problème est survenu lors de la connexion");
          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
          console.log(this.errorMessage);
          Swal.fire({
            icon: 'error',
            title: 'Erreur de connexion',
            text: 'Numéro adhérent ou mot de passe incorrect.',
            confirmButtonColor: '#dc3545'
          });
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

    // Role-based redirection
    if (this.currentUser.roles.includes("ROLE_ADMIN")) {
      this.router.navigate(['/admin']).then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Connexion réussie',
          text: `Bienvenue Admin ${this.currentUser.displayName}`,
          confirmButtonColor: '#28a745'
        });
      });
    } else   {
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
