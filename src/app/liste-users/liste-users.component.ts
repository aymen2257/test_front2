import { Component } from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-liste-users',
  templateUrl: './liste-users.component.html',
  styleUrl: './liste-users.component.css'
})
export class ListeUsersComponent {

  users: any
  id: any


  constructor(private userService: UserService) { }


  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe(
      data => {
        console.log("this is users :" + data);
        console.log(data);
        this.users = data;
        console.log("user :" + this.users);

      },
      err => {
        console.log(err);
        console.log("there is error here");

      }
    );
  }


}
