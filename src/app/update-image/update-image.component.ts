import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { NgForm } from '@angular/forms';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-update-image',
  templateUrl: './update-image.component.html',
  styleUrl: './update-image.component.css'
})
export class UpdateImageComponent {

  currentFile: File | null = null;
  id:any;
  user:any={};

  constructor(private router: Router, private userService:UserService , private token: TokenStorageService) { }


  ngOnInit(): void {
    this.user = this.token.getUser();
  }

  onFileChange(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      this.currentFile = fileList[0];
    } else {
      this.currentFile = null;
    }
  }

  onSubmit(form: NgForm): void {
    if (!form.valid) {
      alert('Please fill all required fields.');
      return;
    }
    if (this.currentFile) {
      this.userService.changeImage(this.currentFile).subscribe({
        next: response => {
          console.log('Image Changed successfully', response);
          alert('Image changed successfully');
        },
        error: error => {
          console.error('Failed to change Image', error);
          alert('Failed to Change Image: ' + error.message);
        }
      });
    } else {
      alert('Please attach a file.');
    }
  }


}
