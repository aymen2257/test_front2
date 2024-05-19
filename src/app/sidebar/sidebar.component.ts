import { Component, OnInit, OnDestroy } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']  // Note the correction here from 'styleUrl' to 'styleUrls'
})
export class SidebarComponent implements OnInit, OnDestroy {
  content!: string;
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  userSubscription!: Subscription;

  constructor(
    private tokenStorageService: TokenStorageService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Subscribe to the currentUser observable
    this.userSubscription = this.tokenStorageService.currentUser.subscribe(user => {
      this.isLoggedIn = !!user;
      if (user) {
        this.showAdminBoard = user.roles.includes('ROLE_ADMIN');
        this.showModeratorBoard = user.roles.includes('ROLE_MODERATOR');
        this.username = user.displayName;
      } else {
        this.showAdminBoard = false;
        this.showModeratorBoard = false;
        this.username = undefined;
      }
    });

    // Fetch admin board or other data
    this.userService.getAdminBoard().subscribe(
      data => this.content = data,
      err => this.content = JSON.parse(err.error).message
    );
  }

  logout(): void {
    this.tokenStorageService.signOut();
    this.router.navigate(['/login']);  // Navigate to login on logout
  }

  ngOnDestroy(): void {
    // Clean up the subscription
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
