import { Component } from '@angular/core';
import { ReclamtionService } from '../_services/reclamtion.service';

@Component({
  selector: 'app-liste-reclamations',
  templateUrl: './liste-reclamations.component.html',
  styleUrl: './liste-reclamations.component.css'
})
export class ListeReclamationsComponent {
  reclamations: any[] = [];
 

  constructor(private reclamationService: ReclamtionService) {}

  ngOnInit(): void {
    this.loadReclamations();
  }

  loadReclamations(): void {
    this.reclamationService.getAllReclamations().subscribe(
      data=> {
        this.reclamations = data;
      
      },
      error => {
        console.error('Error fetching reclamations', error);
      
      }
    );
  }
  updateStatus(id: number, status: any): void {
    this.reclamationService.updateReclamationStatus(id, status).subscribe(
      response => {
        console.log('Status updated', response);
        this.loadReclamations(); // Reload data to see the updated status
      },
      error => {
        console.error('Failed to update status', error);
      }
    );
  }
  downloadFile(id: number): void {
    this.reclamationService.downloadFile(id).subscribe(
      response => {
        const blob = new Blob([response], { type: response.type });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `file_${id}`;
        link.click();
        window.URL.revokeObjectURL(url);
      },
      error => console.error('Error downloading file:', error)
    );
  }
}
