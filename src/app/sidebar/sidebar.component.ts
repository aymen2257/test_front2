import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  public chart : any;

  content!: string;

  private roles !: string[] ;
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username !: string;
  User :any
  id:any
  

  constructor(private tokenStorageService: TokenStorageService,private userService: UserService, @Inject(PLATFORM_ID) private platformId: Object) { }

 
 
 
  ngOnInit(): void {
    this.userService.getAdminBoard().subscribe(
      (data: any) => {
        this.content = data;
      },
      (err: any) => {
        this.content = JSON.parse(err.error).message;
      }
    );




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
