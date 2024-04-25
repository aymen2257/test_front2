import { Component } from '@angular/core';
import { AppConstants } from '../common/app.constants';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  currentUser: any;
  googleURL = AppConstants.GOOGLE_AUTH_URL;
  facebookURL = AppConstants.FACEBOOK_AUTH_URL;
  githubURL = AppConstants.GITHUB_AUTH_URL;
  linkedinURL = AppConstants.LINKEDIN_AUTH_URL;
  // Ajoutez une variable pour suivre l'état de visibilité du mot de passe
  passwordVisible: boolean = false;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private route: ActivatedRoute, private userService: UserService, private router: Router) {}

  ngOnInit(): void {
	const token: string = this.route.snapshot.queryParamMap.get('token')!;
	const error: string = this.route.snapshot.queryParamMap.get('error')!;
  	if (this.tokenStorage.getUser()) {
      this.isLoggedIn = true;
      this.currentUser = this.tokenStorage.getUser();
    }
  	else if(token){
  		this.tokenStorage.saveToken(token);
  		this.userService.getCurrentUser().subscribe(
  		      data => {
  		        this.login(data);
  		      },
  		      err => {
              console.log("error here ")
  		        this.errorMessage = err.error.message;
  		        this.isLoginFailed = true;
  		      }
  		  );
  	}
  	else if(error){
  		this.errorMessage = error;
	    this.isLoginFailed = true;
  	}
  }

   

   // Méthode pour basculer la visibilité du mot de passe
   togglePasswordVisibility(): void {
     this.passwordVisible = !this.passwordVisible;
   }

  onSubmit(): void {
    this.authService.login(this.form).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        if(data.authenticated){
          console.log(" login with success")
	        this.login(data.user);
        } else {
          console.log(" login with success 2")
        	this.router.navigate(['/totp']);
        }
      },
      err => {
        console.log("something went wrong here in login")
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        console.log(this.errorMessage)

      }
    );
  }

  login(user:any): void {
	this.tokenStorage.saveUser(user);
	this.isLoginFailed = false;
	this.isLoggedIn = true;
	this.currentUser = this.tokenStorage.getUser();
    window.location.reload();
  }
}
