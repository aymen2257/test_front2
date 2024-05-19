import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReclamtionService } from '../_services/reclamtion.service';
import Swal from 'sweetalert2';  // Import SweetAlert2

@Component({
  selector: 'app-reclamations',
  templateUrl: './reclamations.component.html',
  styleUrls: ['./reclamations.component.css']
})
export class ReclamationsComponent implements OnInit {
  reclamationForm!: FormGroup;
  currentFile: File | null = null;

  constructor(private fb: FormBuilder, private reclamationService: ReclamtionService) { }

  ngOnInit(): void {
    this.reclamationForm = this.fb.group({
      nomprenom: ['', Validators.required],
      telephone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      categorie: ['', Validators.required],
      sujet: ['', Validators.required],
      description: ['', Validators.required],
      fichier: [null]
    });
  }

  onFileChange(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      this.currentFile = fileList[0];
      this.reclamationForm.patchValue({ fichier: fileList[0] });
    } else {
      this.currentFile = null;
    }
  }

  onSubmit(): void {
    if (!this.reclamationForm.valid) {
      Swal.fire('Error', 'Please fill all required fields.', 'error');
      return;
    }
    if (!this.currentFile) {
      Swal.fire('Attention', 'Please attach a file.', 'warning');
      return;
    }
    this.reclamationService.saveReclamation(this.reclamationForm.value, this.currentFile).subscribe({
      next: (response) => {
        Swal.fire('Success', 'Reclamation submitted successfully', 'success')
          .then((result) => {
            if (result.isConfirmed) {
              this.reclamationForm.reset();  // Reset form after successful submission
              this.currentFile = null;      // Also clear the file variable
            }
          });
      },
      error: (error) => {
        Swal.fire('Error', 'Failed to submit reclamation: ' + error.message, 'error');
      }
    });
  }
}
