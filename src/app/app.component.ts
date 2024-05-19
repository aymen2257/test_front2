import { Component, OnInit, OnDestroy } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  User: any;
  id: any;
  private userSubscription!: Subscription;

  constructor(private router: Router, private tokenStorageService: TokenStorageService) {}

  ngOnInit(): void {
    // Subscribe to the currentUser observable to reactively update on user changes
    this.userSubscription = this.tokenStorageService.currentUser.subscribe(user => {
      this.isLoggedIn = !!user;
      this.User = user;
      if (user) {
        this.roles = user.roles;
        this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
        this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
        this.username = user.displayName;
        this.id = user.id;
      } else {
        // Reset view state when logged out
        this.roles = [];
        this.showAdminBoard = false;
        this.showModeratorBoard = false;
        this.username = undefined;
        this.id = undefined;
      }
    });
  }

  logout(): void {
    this.tokenStorageService.signOut();
    // No longer need to reload the window; UI will reactively adjust due to the subscription
    
  }

  ngOnDestroy(): void {
    // Clean up the subscription
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
