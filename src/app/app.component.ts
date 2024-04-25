import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private roles !: string[] ;
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username !: string;
  User :any
  id:any

  constructor(private router:Router ,private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getUser();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.User=user;
      this.roles = user.roles;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
      this.username = user.displayName;
      this.id=user.id;

    }
    /* navigate(){
      this.router.navigate(["/contrat/"+this.id]);
    } */

  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  
}
