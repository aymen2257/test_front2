import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TokenStorageService } from '../_services/token-storage.service';
import { ReclamtionService } from '../_services/reclamtion.service';

@Component({
  selector: 'app-reclamations',
  templateUrl: './reclamations.component.html',
  styleUrls: ['./reclamations.component.css']
})
export class ReclamationsComponent {
  reclamation: any = {};
  currentFile: File | null = null;
  id:any;

  constructor(private tokenStorageService: TokenStorageService, private reclamationService: ReclamtionService) { }

  ngOnInit(): void {
    // Initialization logic can be placed here
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
      this.reclamationService.saveReclamation(this.reclamation, this.currentFile).subscribe({
        next: response => {
          console.log('Reclamation submitted successfully', response);
          alert('Reclamation submitted successfully');
        },
        error: error => {
          console.error('Failed to submit reclamation', error);
          alert('Failed to submit reclamation: ' + error.message);
        }
      });
    } else {
      alert('Please attach a file.');
    }
  }
}
