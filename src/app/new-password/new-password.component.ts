import { Component } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrl: './new-password.component.css'
})
export class NewPasswordComponent {


  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private router:Router ,private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.authService.changePassword(this.form).subscribe(
      data => {
        console.log("password chnaged with success ");
        console.log(data);
	      this.isSuccessful = true;
          this.isSignUpFailed = false;
          this.router.navigate(['/login']);
          
      },
      err => {
        console.log("change password failed ");
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

	

 

}
