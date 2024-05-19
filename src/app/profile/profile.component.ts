import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser: any;
  image: any
  safeImage: SafeUrl | null = null;
  email: any | null = null;
  name: any | null = null;
  address: any | null = null;
  birthdate: any | null = null;
  sex: any | null = null;
  num: any | null = null;
  cin: any | null = null;
  User: any ={};


  constructor(private token: TokenStorageService, private sanitizer: DomSanitizer , private userService : UserService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    console.log("user : ", this.currentUser);
    this.getUserById();


  }

  getSafeImage(image: string | null): SafeUrl | null {
    if (image) {
      const imageUrl = 'data:image/png;base64,' + image;
      return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
    }
    return null;
  }

  getUserById() {
    this.userService.getUserById(this.currentUser.id).subscribe(
      (response) => {
        console.log("here user by id", response);
        this.User = response
        this.image = this.User.image;
        this.safeImage = this.getSafeImage(this.image)

      }
    )
  }

}
