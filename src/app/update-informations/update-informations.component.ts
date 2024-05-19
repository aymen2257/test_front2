import { Component } from '@angular/core';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-update-informations',
  templateUrl: './update-informations.component.html',
  styleUrl: './update-informations.component.css'
})
export class UpdateInformationsComponent {


  constructor(private router: Router, private userService:UserService, private token: TokenStorageService ) { }
  nom: any;
  email: any;
  address: any;
  date: any;
  sexe:any;
  userStorage:any={};
  user:any={};

  ngOnInit(): void {
    this.userStorage = this.token.getUser();
    this.getUserById();
  }


  onSubmit(form: NgForm): void {
    if (!form.valid) {
      alert('Please fill all required fields.');
      return;
    }
    if (this.user) {
      this.userService.changeData(this.user.displayName,this.user.email,this.user.address,this.user.sex,this.user.birth_date).subscribe({
        next: response => {
          console.log('Data Changed successfully', response);
          alert('Data changed successfully');
        },
        error: error => {
          console.error('Failed to change Data', error);
          alert('Failed to Change Data: ' + error.message);
        }
      });
    }
  }

  getUserById() {
    this.userService.getUserById(this.userStorage.id).subscribe(
      (response) => {
        console.log("here user by id", response);
        this.user = response
      }
    )
  }

}
