import { Component } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { ActivatedRoute } from '@angular/router';


export enum TokenStatus {
  VALID,
  INVALID,
  EXPIRED,
  SENDING,
  SENT
}

@Component({
  selector: 'app-verifiy-token',
  templateUrl: './verifiy-token.component.html',
  styleUrl: './verifiy-token.component.css'
})
export class VerifiyTokenComponent {

//   token = '';
// 	tokenStatus = TokenStatus;
// 	status !: TokenStatus ;
// 	errorMessage = '';
// 	constructor(private authService: AuthService, private route: ActivatedRoute) {
// 	}

// 	ngOnInit(): void {
// 		this.token = this.route.snapshot.queryParamMap.get('token')!;
// 		if(this.token){
// 			this.authService.verifyToken(this.token).subscribe(
// 			data => {
// 				//this.status = TokenStatus[data.message as keyof typeof TokenStatus];
//         this.status = data.message;
//         console.log("token :"+this.token)
//         console.log("status data:"+data.message);
//         console.log("data:"+data);
// 				console.log("status :"+ this.status);
// 			}
// 			,
// 			err => {
// 				this.errorMessage = err.error.message;
// 			}
// 			);
// 		}
// 	}

// 	resendToken(): void {
// 		this.status = TokenStatus.SENDING;
// 		this.authService.resendToken(this.token).subscribe(
// 		data => {
// 			this.status = TokenStatus.SENT;
// 		}
// 		,
// 		err => {
// 			this.errorMessage = err.error.message;
// 		}
// 		);
// 	}

    token = '';
	tokenStatus = TokenStatus;
	status !: TokenStatus ;
	errorMessage = '';
	constructor(private authService: AuthService, private route: ActivatedRoute) {
	}

	ngOnInit(): void {
		this.token = this.route.snapshot.queryParamMap.get('token')!;
		if(this.token){
			this.authService.verifyToken(this.token).subscribe(
			data => {
				this.status = TokenStatus[data.message as keyof typeof TokenStatus];
				console.log("status :"+ this.status);
				console.log("data message :"+data.message);

				console.log("data :"+ data);
			}
			,
			err => {
				this.errorMessage = err.error.message;
			}
			);


		}
	}

	resendToken(): void {
		this.status = TokenStatus.SENDING;
		this.authService.resendToken(this.token).subscribe(
		data => {
			this.status = TokenStatus.SENT;
		}
		,
		err => {
			this.errorMessage = err.error.message;
		}
		);
	}

}
